import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import DarkMode from "../components/dark-mode/DarkMode";
import googleSvg from "../public/svg/google.svg";
import { registerSchema } from "../schema/Schema";
import { IFormInputs } from "../interface/Index";
import { signIn } from "next-auth/react";
function Register() {
  // react-hook-form
  const {
    register,
    getValues,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormInputs>({ resolver: yupResolver(registerSchema) });
  // < ---- ---- >
  const [userExist, setUserExist] = useState(false);
  // < ---- ---- >

  // create a new user
  const createUser = async () => {
    const user = {
      email: getValues("email"),
      password: getValues("password"),
    };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    // check if user already exists
    if (res.status === 422) {
      setUserExist(true);
    }

    setUserExist(false);

    signIn("credentials", {
      user,

      callbackUrl: `${window.location.origin}`,
    });
  };
  // < ---- ---- >
  const handleGoogle = async () => {
    await signIn("google", {
      callbackUrl: `${window.location.origin}`,
    });
  };

  // < ---- ---- >
  return (
    <>
      <Head>
        <title>Broaduct - Sign Up</title>
      </Head>

      {/* dark mode */}
      <div className="absolute top-6 md:top-4 md:right-4">
        <div className="relative w-10 cursor-pointer h-10">
          <DarkMode />
        </div>
      </div>

      {/* form */}
      <div className="w-screen h-screen grid place-items-center">
        {/* form */}
        <form
          onSubmit={handleSubmit(createUser)}
          className="bg-white dark:bg-zinc-800 px-4 h-[90%] w-4/5 md:w-1/3 flex flex-col items-center justify-between md:justify-evenly rounded-lg shadow-lg"
        >
          <h1 className="font-bold text-4xl mb-10 mt-8">Sign Up</h1>

          {userExist && (
            <p className="text-red-500 text-lg mb-4">User Already Exist!</p>
          )}
          {/* input fields */}
          <div className="h-1/3 w-full flex flex-col justify-between items-center">
            {/* email */}
            <div className="relative w-[90%] h-8">
              <p className="text-red-500 text-md mr-auto">
                {errors.email?.message}
              </p>
              <input
                {...register("email")}
                className={`${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-md duration-150`}
              />

              <label
                className="absolute top-0 -translate-y-full left-0 ml-1 italic text-sm"
                htmlFor="email"
              >
                Email
              </label>
            </div>

            {/* <----- -----> */}
            {/* password */}
            <div className="relative w-[90%] h-8">
              <p className="text-red-500 text-md mr-auto w-full">
                {errors.password?.message}
              </p>
              <input
                {...register("password")}
                className={`${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-md duration-150`}
                type="password"
              />

              <label
                className="absolute top-0 -translate-y-full left-0 ml-1 italic text-sm"
                htmlFor="password"
              >
                Password
              </label>
            </div>
            {/* <----- -----> */}
            {/* confirm password */}
            <div className="relative w-[90%] h-8">
              <p className="text-red-500 text-md mr-auto">
                {errors.confirmPassword?.message}
              </p>
              <input
                {...register("confirmPassword")}
                className={`${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-md duration-150`}
                type="password"
              />

              <label
                className="absolute top-0 -translate-y-full left-0 ml-1 italic text-sm"
                htmlFor="confirmPassword"
              >
                Confirm Password
              </label>
            </div>
          </div>
          {/* <----- -----> */}
          {/* google sign-in */}
          <div
            onClick={handleGoogle}
            className="cursor-pointer p-4 mt-10 mb-4 h-8 flex items-center border dark:border-0 rounded-2xl"
          >
            <Image
              alt="sign up with google"
              src={googleSvg}
              width="20"
              height="20"
            />
            <a className="ml-3" href="#">
              Continue with google
            </a>
          </div>
          {/* <----- -----> */}
          {/* Login button */}
          <button className="h-12 w-56 rounded-lg grid place-items-center bg-blue-900 hover:bg-blue-800 text-white">
            <h1 className="text-xl font-medium">Sign Up</h1>
          </button>
          {/* <----- -----> */}
          {/* register */}
          <Link passHref href="/login">
            <div className="mb-20 mt-4">
              <a href="#" className=" dark:text-slate-200 underline">
                Already have an account ? Login
              </a>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
