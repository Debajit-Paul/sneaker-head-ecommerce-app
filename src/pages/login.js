import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const LoginPage = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const submitHandler = async ({ email, password }) => {};

  return (
    <div className="flex justify-center items-center h-screen">
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