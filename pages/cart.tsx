import { GetServerSideProps } from "next";
import Head from "next/head";

import CartTable from "../components/cart-table/CartTable";
import Navbar from "../components/Navbar/Navbar";

import { getSession } from "next-auth/react";
import { useStore } from "../store/store";

function Cart() {
  // get cart total price
  const totalPrice = useStore((state) => state.totalPrice);
  return (
    <>
      <Head>
        <title>Braoduct - Cart</title>
      </Head>
      {/* --- Navbar --- */}
      <Navbar />

      {/* --- Cart --- */}
      <div className="w-full md:px-2 min-h-screen flex flex-col md:flex-row md:justify-between">
        {/* cart table */}
        <CartTable />

        {/* checkout card */}
        <div className="bg-white dark:bg-zinc-800 min-w-[90%] md:min-w-[20%] md:h-[280px] px-2 mx-auto mt-8 md:mt-0 mb-24 md:mr-6 flex flex-col rounded-lg shadow-md">
          <h3 className="text-2xl p-2 text-left mr-auto">Total</h3>
          <h1 className="text-5xl text-bold text-center mx-2 mb-8 md:mb-0 mt-4">
            ${totalPrice}
          </h1>

          <button className="h-12 w-full md:w-[90%] mb-8 mt-auto mx-auto flex items-center justify-center text-2xl text-white transition-colors duration-150 bg-blue-900 rounded-lg focus:shadow-outline hover:bg-blue-800">
            Buy
          </button>
        </div>
      </div>
    </>
  );
}

export default Cart;

export const getServerSideProps: GetServerSideProps = async (context) => {
  // redirect the user if not logged in
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  return { props: {} };
};
