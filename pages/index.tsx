import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Navbar from "../components/Navbar/Navbar";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Broaduct - Shopping Website</title>
      </Head>

      {/* Navbar */}
      <Navbar />
    </>
  );
};

export default Home;
