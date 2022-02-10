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
        <form className="bg-white dark:bg-slate-900 h-[90%] w-4/5 md:w-1/3 py-6 flex flex-col justify-between items-center rounded-xl shadow-lg">
          <h1 className="text-4xl font-semibold">Sign Up</h1>

          {/* input fields */}
          <div className="min-h-[33%] w-full flex flex-col justify-between items-center">
            {/* email */}
            <div className="w-4/5">
              <label htmlFor="email" className="text-sm italic block">
                Email
              </label>
              <input
                type="email"
                className="dark:bg-zinc-800 w-full border rounded-2xl font-medium py-1 px-3"
              />
            </div>

            {/* password */}
            <div className="w-4/5">
              <label htmlFor="password" className="ml-1 text-sm italic block">
                Password
              </label>
              <input
                type="password"
                className="w-full border-2 rounded-2xl font-medium py-1 px-3"
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
              <input
                type="password"
                className="w-full border-2 rounded-2xl font-medium py-1 px-3"
              />
            </div>
          </div>

          {/* google sign in */}
          <div
            onClick={handleGoogle}
            className="flex items-center border rounded-2xl py-1 px-4 text-center cursor-pointer"
          >
            <p className="mr-2">Continue with Google</p>
            <Image
              src={googleSvg}
              alt="continue with google"
              width="17"
              height="17"
            />
          </div>

          <button className="w-4/5 bg-blue-600 py-1 font-medium text-lg text-white rounded-md">
            Sign Up
          </button>

          {/* already have an account */}
          <a href="#" className="underline">
            Already have an account ? Login
          </a>
        </form>
      </div>
    </>
  );
}

export default Register;
