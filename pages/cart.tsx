import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import CartTable from "../components/cart-table/CartTable";
import Navbar from "../components/Navbar/Navbar";

function Cart() {
  return (
    <>
      <Head>
        <title>Braoduct - Cart</title>
      </Head>

      <Navbar />

      <div className="w-screen px-2 h-screen flex flex-col md:flex-row justify-between overflow-x-auto">
        {/* cart table */}
        <CartTable />

        {/* checkout card */}
        <div className="bg-white w-[90%] md:w-1/3 px-4 md:px-0 md:w-1/5 h-1/3 md:h-[40%] mx-auto mr-6 flex flex-col rounded-lg shadow-lg">
          <h3 className="text-2xl p-2 text-left mr-auto">Total</h3>
          <h1 className="text-6xl text-bold text-center mt-4">$285</h1>

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
