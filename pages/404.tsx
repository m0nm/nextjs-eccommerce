import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import coloredCart from "../public/svg/colored-cart.svg";
function NotFound() {
  return (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <Head>
        <title>404 - Not Found</title>
      </Head>

      <div className="absolute ">
        <div className="opacity-70 relative -right-56 w-[400px] h-[400px] before:w-52 before:h-52 before:bg-cyan-200 before:absolute before:-left-24 before:rounded-full">
          <Image
            src={coloredCart}
            alt="go back"
            layout="fill"
            objectFit="contain"
          />
        </div>
      </div>

      <h1 className="mb-6 z-10 font-bold text-5xl text-neutral-900 drop-shadow-2xl">
        Page not found!
      </h1>

      <Link passHref href="/">
        <button className="bg-slate-200 flex z-10 items-center justify-center p-6 w-1/3 h-12 text-2xl rounded-md">
          Go back shopping
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
