import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DarkMode from "../components/dark-mode/DarkMode";
import { IFormInputs } from "../interface/Index";
import googleSvg from "../public/svg/google.svg";
import { loginSchema } from "../schema/Schema";

function Login() {
  // react hook form
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<IFormInputs>({
    resolver: yupResolver(loginSchema),
  });
  // < ------ ------ >
  // display error message if login failed
  const { error } = useRouter().query;
  const handleSignIn = async () => {
    const user = {
      email: getValues("email"),
      password: getValues("password"),
    };

    signIn("credentials", {
      email: user.email,
      password: user.password,

      callbackUrl: `${window.location.origin}`,
    });
  };
  // < ------ ------ >
  const handleGoogle = async () => {
    await signIn("google", {
      callbackUrl: `${window.location.origin}`,
    });
  };
  // < ------ ------ >
  return (
    <>
      <Head>
        <title>Broaduct - Login</title>
      </Head>

      {/* dark mode */}
      <div className="absolute top-4 right-4">
        <DarkMode />
      </div>

      <div className="w-full h-screen grid place-items-center">
        {/* form */}
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="bg-white dark:bg-zinc-800 px-4 h-3/4 md:h-[90%] w-[90%] md:w-1/3 flex flex-col items-center justify-between md:justify-evenly rounded-lg shadow-lg"
        >
          <h1 className="font-bold text-3xl mt-4 md:mt-0 mb-8">Login</h1>
          {error && (
            <p className="text-xl font-medium text-red-500">
              Please verify your email or password
            </p>
          )}
          {/* input fields */}
          <div className="h-1/4 md:h-1/5 w-full flex flex-col justify-between items-center">
            {/* email */}
            <div className="w-[90%] h-8">
              <label htmlFor="email" className="ml-1 text-sm italic block">
                Email
              </label>

              <p className="text-red-500 text-md">{errors.email?.message}</p>

              <input
                className={`${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-2xl duration-150`}
                {...register("email")}
              />
            </div>

            {/* <----- -----> */}
            {/* password */}
            <div className="w-[90%] h-8">
              <label htmlFor="password" className="ml-1 text-sm italic block">
                Password
              </label>

              <p className="text-red-500 text-md">{errors.password?.message}</p>

              <input
                className={`${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-2xl duration-150`}
                type="password"
                {...register("password")}
              />
            </div>
          </div>
          {/* <----- -----> */}
          {/* google sign-in */}
          <div
            onClick={handleGoogle}
            className="cursor-pointer p-4 my-4 h-8 flex items-center border border-slate-300 dark:border-slate-500 rounded-2xl"
          >
            <Image
              alt="sign in with google"
              src={googleSvg}
              width="17"
              height="17"
            />
            <p className="ml-2">Continue with google</p>
          </div>
          {/* <----- -----> */}
          {/* Login button */}
          <button className="py-2 w-56 rounded-lg grid place-items-center bg-blue-900 hover:bg-blue-800 text-white">
            <h1 className="text-xl font-medium">Login</h1>
          </button>

          {/* <----- -----> */}
          {/* register */}
          <Link passHref href="/register">
            <div className="mb-16 mt-21">
              <a href="#" className=" dark:text-slate-200 underline">
                Don&apos;t have an account ? Sign up
              </a>
            </div>
          </Link>
        </form>
      </div>
    </>
  );
}

export default Login;
