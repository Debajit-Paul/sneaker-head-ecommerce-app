import { createRouter } from "next-connect";
import bcrypt from "bcryptjs";
import axios from "axios";
import { signToken } from "../../../../lib/auth";
import { client } from "../../../../lib/client";

const router = createRouter();

router.post(async (req, res) => {
  const projectId = "d8zwf6vf";
  const dataset = "production";
  const apiVersion = "2023-04-26";
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
  const existUser = await client.fetch(
    `*[_type == "user" && email == $email][0]`,
    {
      email: req.body.email,
    }
  );
  if (existUser) {
    return res.status(401).send({ message: "Email aleardy exists" });
  }
  const { data } = await axios.post(
    `https://${projectId}.api.sanity.io/v${apiVersion}/data/mutate/${dataset}?returnIds=true`,
    { mutations: createMutations },
    {
      headers: {
        "Content-type": "application/json",
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
});

export default router.handler();
