import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import { useState } from "react";
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
      return;
    }

    setUserExist(false);

    await signIn("credentials", {
      email: user.email,
      password: user.password,

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
      <div className="absolute top-4 right-4">
        <DarkMode />
      </div>

      {/* register form */}
      <div className="h-screen w-full grid place-items-center mt-4 md:mt-0">
        {/* form */}
        <form
          onSubmit={handleSubmit(createUser)}
          className="bg-white dark:bg-zinc-800 h-[85%] w-4/5 md:w-1/3 py-6 flex flex-col justify-between items-center rounded-xl shadow-lg"
        >
          <h1 className="text-3xl font-bold">Sign Up</h1>

          {/* <----- -----> */}
          {userExist && (
            <p className="text-red-500 text-xl font-medium">
              User Already Exist!
            </p>
          )}

          {/* <----- -----> */}
          {/* input fields */}
          <div className="min-h-[38%] w-full flex flex-col justify-between items-center">
            {/* email */}
            <div className="w-4/5">
              <label htmlFor="email" className="ml-1 text-sm italic block">
                Email
              </label>

              <p className="text-red-500 text-md ml-1 mr-auto">
                {errors.email?.message}
              </p>
              <input
                {...register("email")}
                className={`${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full py-1 px-3 font-medium border dark:border-0 rounded-2xl duration-150`}
              />
            </div>

            {/* password */}
            <div className="w-4/5">
              <label htmlFor="password" className="ml-1 text-sm italic block">
                Password
              </label>

              <p className="text-red-500 text-md ml-1 mr-auto">
                {errors.password?.message}
              </p>

              <input
                type="password"
                {...register("password")}
                className={`${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full py-1 px-3 font-medium border dark:border-0 rounded-2xl duration-150`}
              />
            </div>

            {/* confirm password */}
            <div className="w-4/5">
              <label
                htmlFor="confirmPassword"
                className="ml-1 text-sm italic block"
              >
                Confirm Password
              </label>
              <p className="text-red-500 text-md ml-1 mr-auto">
                {errors.confirmPassword?.message}
              </p>
              <input
                type="password"
                {...register("confirmPassword")}
                className={`${
                  errors.confirmPassword
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full py-1 px-3 font-medium border dark:border-0 rounded-2xl duration-150`}
              />
            </div>
          </div>

          {/* <----- -----> */}
          {/* google sign in */}
          <div
            onClick={handleGoogle}
            className="flex items-center border border-slate-300 dark:border-slate-500 rounded-2xl py-1 px-4 text-center cursor-pointer"
          >
            <Image
              src={googleSvg}
              alt="continue with google"
              width="17"
              height="17"
            />
            <p className="ml-2">Continue with Google</p>
          </div>

          {/* <----- -----> */}
          {/* sign up button */}
          <button className="py-2 w-56 rounded-lg grid place-items-center bg-blue-900 hover:bg-blue-800 text-white">
            <h1 className="text-xl font-medium">Sign Up</h1>
          </button>

          {/* <----- -----> */}
          {/* already have an account */}
          <Link href="/login">
            <a className="my-4 underline">Already have an account ? Login</a>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Register;
