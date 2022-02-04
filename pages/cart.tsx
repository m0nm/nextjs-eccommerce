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

      <div className="w-screen h-screen flex flex-col md:flex-row justify-between">
        {/* cart table */}
        <CartTable />
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
