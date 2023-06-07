import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { userLogIn } from "../../redux/feature/userSlice";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getError } from "../../lib/error";

const LoginPage = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { userInfo } = useSelector((state) => state.user);
  const notify = (message) => {
    toast.error(message, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
  };
  useEffect(() => {
    if (userInfo) {
      router.push("/");
    }
  }, [router, userInfo]);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {
    try {
      const { data } = await axios.post("/api/users/login", {
        email,
        password,
      });
      dispatch(userLogIn(data));
      router.push("/");
    } catch (err) {
      notify(getError(err));
    }
  };

  const handleGuestLogin = () => {
    const guestEmail = "guest@example.com";
    const guestPassword = "123456";
    submitHandler({ email: guestEmail, password: guestPassword });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <ToastContainer />
      <div className=" p-8 rounded flex flex-col items-center w-[450px] h-[600px]">
        <img src="./logo.svg" width={120} height={120} />
        <h3 className="text-2xl font-bold text-center mb-4 w-[250px]">
          YOUR ACCOUNT FOR SNEAKER HEAD
        </h3>

        <form
          className="space-y-4 flex flex-col justify-center"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            className="w-full border border-gray-300 px-4 py-2 rounded-full"
          />
          {errors.email
            ? errors.email.type === "pattern"
              ? "Email is not valid"
              : "Email is required"
            : ""}
          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: true, minLength: 6 })}
            className="w-full border border-gray-300 px-4 py-2 rounded-full"
          />
          {errors.password
            ? errors.password.type === "minLength"
              ? "Password length is more than 5"
              : "Password is required"
            : ""}
          <p className=" text-gray-500 text-[13px] items-center w-[280px]">
            By logging in, you agree to Sneaker Head's{" "}
            <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
            <span className="underline cursor-pointer">Terms of Use.</span>
          </p>

          <button
            type="submit"
            className="w-full bg-[#F02D34] text-white font-bold py-2 rounded-full"
          >
            Log In
          </button>
          <button
            onClick={handleGuestLogin}
            className="w-full border border-[#F02D34] text-[#F02D34] bg-white font-bold py-2 rounded-full"
          >
            Guest Login
          </button>
          <p className=" text-gray-500 text-[13px]">
            Not a Member?{" "}
            <Link href="/register">
              <span className="underline cursor-pointer text-black">
                Join Us
              </span>
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
