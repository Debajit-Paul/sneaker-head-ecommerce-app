import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import { signToken } from "../../../../lib/auth";

/**
 * Create a router for handling requests.
 */
const handler = createRouter();

/**
 * Handles the POST request to create a new user.
 * @param {Object} req - The request object.
 * @param {Object} res - The response object.
 */
handler.post(async (req, res) => {
  try {
    /** @type {string} The project ID. Replace with the appropriate value. */
    const projectId = "SOMETHING";
    /** @type {string} The dataset name. Replace with the appropriate value. */
    const dataset = "SOMETHING";
    /** @type {string} The API version. Replace with the appropriate value. */
    const apiVersion = "SOMETHING";
    /** @type {string} The token with write access. */
    const tokenWithWriteAccess = process.env.NEXT_PUBLIC_SANITY_TOKEN;

    const createMutations = [
      {
        create: {
          _type: "user",
          name: req.body.name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password),
          isAdmin: false,
        },
      },
    ];

    const { data } = await axios.post(
      /**
       * The URL for the Sanity API request.
       * @type {string}
       */
      `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`,
      { mutations: createMutations },
      {
        headers: {
          "Content-type": "application/json",
          /** @type {string} The authorization header with the token. */
          Authorization: `Bearer ${tokenWithWriteAccess}`,
        },
      }
    );

    const userId = data.results[0].id;
    const user = {
      _id: userId,
      name: req.body.name,
      email: req.body.email,
      isAdmin: false,
    };
    const token = signToken(user);
    res.send({ ...user, token });
  } catch (error) {
    console.error("User creation error:", error);
    res.status(500).send({ error: "Failed to create user." });
  }
});

export default handler;
