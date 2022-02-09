import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/image";
import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import { IProduct } from "../../interface/Index";
import cartSvg from "../../public/svg/cart.svg";
import fullStarSvg from "../../public/svg/full-star.svg";
import emptyStarSvg from "../../public/svg/empty-star.svg";
import Rating from "react-rating";
import { useSession } from "next-auth/react";
import { add_to_cart } from "../../utils/add_to_cart";
import { useRouter } from "next/router";

function Product({ product }: { product: IProduct }) {
  // < ---- * ---- >
  // rating stars
  const fullStar = (
    <Image alt="full-star" src={fullStarSvg} width="22" height="22" />
  );
  const emptyStar = (
    <Image alt="empty-star" src={emptyStarSvg} width="22" height="22" />
  );

  // < ---- * ---- >
  const router = useRouter();

  // < ---- * ---- >
  // get user email
  const { data: session } = useSession();

  // < ---- * ---- >
  // add to cart
  const addToCartHandler = async () => {
    // redirect the user if not logged in
    if (!session) {
      router.push("/login");
    }

    const resStatus = await add_to_cart(session?.user?.email, product);

    if (resStatus === 200) {
      router.push("/cart");
    }
  };

  // < ---- * ---- >
  return (
    <>
      <Head>
        <title>Broaduct - Product</title>
      </Head>

      {/* navbar */}
      <Navbar />

      <div className="bg-white dark:bg-[#232325] w-[90%] mb-20 flex flex-col md:flex-row justify-between p-6 pt-8 rounded-md shadow-md mx-auto">
        {/* product image */}
        <div className="bg-white relative h-[420px] w-full mb-10 md:w-1/3">
          <Image
            src={product.image}
            alt="product"
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* product information */}
        <div className="flex flex-col w-full md:w-3/5 h-full text-center md:text-left">
          {/* product name */}
          <h1 className="text-2xl md:text-4xl font-bold tracking-wide w-full">
            {product.title}
          </h1>

          {/* product rate */}
          <div className="mt-6 mx-auto md:mx-0 text-left flex items-center">
            <Rating
              readonly
              quiet
              initialRating={product.rating.rate}
              fractions={1}
              emptySymbol={emptyStar}
              fullSymbol={fullStar}
            />

            <span className="ml-2">- {product.rating.count} rating</span>
          </div>

          {/* product desc */}
          <p className="text-xl md:text-2xl my-8">{product.description}</p>

          {/* product price */}
          <h3 className="text-6xl font-medium mx-auto">$253</h3>

          {/* add to cart button */}
          <button
            onClick={addToCartHandler}
            className="h-10 w-full md:w-4/5 px-5 mx-auto my-6 flex items-center justify-center text-white font-medium transition-colors duration-150 bg-blue-900 rounded-lg focus:shadow-outline hover:bg-blue-800"
          >
            <span className="mr-2">ADD TO CART</span>
            <Image
              alt="add to cart"
              className="invert"
              src={cartSvg}
              width="22"
              height="22"
            />
          </button>
        </div>
      </div>
    </>
  );
}

export default Product;

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const res = await fetch(`https://fakestoreapi.com/products/${params?.id}`);
  const product = await res.json();

  return { props: { product } };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://fakestoreapi.com/products");
  const products = await res.json();

  const paths = products.map((product: IProduct) => ({
    params: { id: `${product.id}` },
  }));

  return { paths, fallback: false };
};
