import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import coloredCart from "../public/svg/colored-cart.svg";
function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col justify-center items-center">
      <Head>
        <title>404 - Not Found</title>
      </Head>

      <div className="opacity-60 relative -right-56 w-[400px] h-[400px] before:w-52 before:h-52 before:bg-cyan-200 before:absolute before:-left-24 before:rounded-full">
        <Image
          src={coloredCart}
          alt="go back"
          layout="fill"
          objectFit="contain"
        />
      </div>

      <div className="absolute top-1/3 left-1/3 md:left-1/2 md:-translate-x-1/2 grid place-items-center z-10 w-full md:w-4/5">
        <h1 className="font-bold text-5xl mb-10">Page Not Found!</h1>

        <Link passHref href="/">
          <button className="bg-slate-200 flex items-center justify-center p-6 w-full lg:w-1/3 h-12 text-2xl font-medium rounded-md">
            Go back shopping
          </button>
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
