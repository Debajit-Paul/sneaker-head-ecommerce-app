import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useRouter } from "next/router";

const RegistrationPage = () => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const router = useRouter();
  const notify = (message) => {
    toast(message, {
      position: "top-center",
      autoClose: 5000,
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

  const submitHandler = async ({ name, email, password, confirmPassword }) => {
    if (password !== confirmPassword) {
      notify("Passwords don't match");
      return;
    }
    try {
      const { data } = await axios.post("/api/users/register", {
        name,
        email,
        password,
      });
      dispatch(userLogIn(data));
      router.push("/");
    } catch (err) {
      notify(err.message);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen mb-[100px]">
      <ToastContainer />
      <div className="p-8 rounded flex flex-col items-center w-[450px] h-[600px]">
        <img src="./logo.svg" width={120} height={120} />
        <h1 className="text-2xl font-bold text-center mb-4 w-[250px]">
          BECOME A SNEAKER HEAD MEMBER
        </h1>
        <p className="m-2 mb-5 text-gray-500 text-center text-[15px]">
          Create your Sneaker Head Member profile and get first access to the
          very best of Nike products, inspiration and community.
        </p>
        <form
          className="space-y-4 flex flex-col justify-center"
          onSubmit={handleSubmit(submitHandler)}
        >
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: true, min: 2 })}
            className="border border-gray-300 rounded-full px-4 py-2"
          />
          {errors.name
            ? errors.name.type === "minLength"
              ? "Name length is more than 1"
              : "Name is required"
            : ""}

          <input
            type="email"
            placeholder="Email"
            {...register("email", {
              required: true,
              pattern: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/,
            })}
            className="w-full border border-gray-300 rounded-full px-4 py-2"
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
            className="w-full border border-gray-300 rounded-full px-4 py-2"
          />
          {errors.password
            ? errors.password.type === "minLength"
              ? "Password length is more than 5"
              : "Password is required"
            : ""}

          <input
            type="password"
            placeholder="Confirm Password"
            {...register("confirmPassword", { required: true, minLength: 6 })}
            className="w-full border border-gray-300 rounded-full px-4 py-2"
          />
          {errors.confirmPassword
            ? errors.confirmPassword.type === "minLength"
              ? "Confirm Password length is more than 5"
              : "Confirm Password is required"
            : ""}

          <p className=" text-gray-500 text-[13px] text-center w-[280px]">
            By logging in, you agree to Sneaker Head's{" "}
            <span className="underline cursor-pointer">Privacy Policy</span> and{" "}
            <span className="underline cursor-pointer">Terms of Use.</span>
          </p>
          <button
            type="submit"
            className="w-full bg-[#F02D34] text-white font-bold py-2 rounded-full"
          >
            Join Now
          </button>
          <p className=" text-gray-500 text-[13px]">
            Already a Member?{" "}
            <Link href="/login">
              <span className="underline cursor-pointer text-black">
                Sign In
              </span>
            </Link>
            .
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegistrationPage;
