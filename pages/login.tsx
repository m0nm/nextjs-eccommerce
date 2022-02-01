import { yupResolver } from "@hookform/resolvers/yup";
import { signIn } from "next-auth/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
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
  const handleSignIn = async () => {
    const user = {
      email: getValues("email"),
      password: getValues("password"),
    };

    signIn("credentials", {
      callbackUrl: `${window.location.origin}`,

      ...user,
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
      <div className="absolute top-2 md:top-4 md:right-4">
        <div className="relative w-10 cursor-pointer h-10 p-4">
          <DarkMode />
        </div>
      </div>

      <div className="w-screen h-screen grid place-items-center">
        {/* form */}
        <form
          onSubmit={handleSubmit(handleSignIn)}
          className="bg-white dark:bg-zinc-800 px-4 h-[90%] w-[90%] md:w-1/3 flex flex-col items-center justify-between md:justify-evenly rounded-lg shadow-lg"
        >
          <h1 className="font-bold text-4xl mb-8">Login</h1>

          {/* input fields */}
          <div className="h-1/4 md:h-1/5 w-full flex flex-col justify-between items-center">
            {/* email */}
            <div className="relative w-[90%] h-8">
              <p className="text-red-500 text-md">{errors.email?.message}</p>
              <input
                className={`${
                  errors.email
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-md duration-150`}
                {...register("email")}
              />

              <label
                className="absolute top-0 -translate-y-full left-0 italic text-sm"
                htmlFor="email"
              >
                Email
              </label>
            </div>

            {/* <----- -----> */}
            {/* password */}
            <div className="relative w-[90%] h-8">
              <p className="text-red-500 text-md">{errors.password?.message}</p>
              <input
                className={`${
                  errors.password
                    ? "border-red-500"
                    : "border-slate-600 focus:border-blue-800"
                } w-full h-full px-4 border dark:border-0 rounded-md duration-150`}
                type="password"
                {...register("password")}
              />

              <label
                className="absolute top-0 -translate-y-full left-0 italic text-sm"
                htmlFor="password"
              >
                Password
              </label>
            </div>
          </div>
          {/* <----- -----> */}
          {/* google sign-in */}
          <div
            onClick={handleGoogle}
            className="cursor-pointer p-4 mt-4 h-8 flex items-center border dark:border-0 rounded-2xl"
          >
            <Image
              alt="sign in with google"
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
            <h1 className="text-xl font-medium">Login</h1>
          </button>
          {/* <----- -----> */}
          {/* register */}
          <Link passHref href="/register">
            <div className="mb-20">
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
