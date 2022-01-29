import type { GetStaticProps } from "next";
import Head from "next/head";
import Navbar from "../components/Navbar/Navbar";
import Products from "../components/Products/Products";
import { IProducts } from "../interface/Index";

const Home = ({ products }: IProducts) => {
  return (
    <>
      <Head>
        <title>Broaduct - Shopping Website</title>
      </Head>

      {/* Navbar */}
      <Navbar />

      {/* display products */}
      <Products products={products} />
    </>
  );
};

export default Home;

// fetch store api
export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  return {
    props: {
      products,
    },
  };
};
