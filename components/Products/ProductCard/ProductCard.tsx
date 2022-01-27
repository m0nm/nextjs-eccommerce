import Image from "next/image";
import Link from "next/link";
import React from "react";
import Rating from "react-rating";
import { IProduct } from "../../../interface/Index";
import cartSvg from "../../../public/svg/cart.svg";
import fullStarSvg from "../../../public/svg/full-star.svg";
import emptyStarSvg from "../../../public/svg/empty-star.svg";
function ProductCard({ product }: { product: IProduct }) {
  // rating stars
  const fullStar = (
    <Image alt="full-star" src={fullStarSvg} width="22" height="22" />
  );
  const emptyStar = (
    <Image alt="empty-star" src={emptyStarSvg} width="22" height="22" />
  );

  return (
    <div className="dark:bg-[#1b1b1d] flex flex-col w-full md:w-[30%] items-center mx-2 mt-12 border dark:border-0 rounded-lg shadow-xl text-center">
      {/* product image */}
      <Link href={`/products/${product.id}`} passHref>
        <div className="bg-white relative w-full h-80 mb-6 cursor-pointer">
          <Image
            src={product.image}
            layout="fill"
            objectFit="contain"
            alt="image"
          />
        </div>
      </Link>

      {/* product information */}

      <div className="h-24 w-full flex flex-col items-center">
        {/* product title */}
        <Link href={`/products/${product.id}`}>
          <a className="text-lg font-semibold h-20">{product.title}</a>
        </Link>

        {/* product rate */}
        <div>
          <Rating
            readonly
            quiet
            initialRating={product.rating.rate}
            fractions={1}
            emptySymbol={emptyStar}
            fullSymbol={fullStar}
          />
        </div>
      </div>

      {/* product price */}
      <h1 className="text-4xl font-bold mt-4">${product.price}</h1>

      {/* add to cart button */}
      <button className="h-10 w-full md:w-4/5 px-5 mt-4 mb-8 flex items-center justify-center text-white font-medium transition-colors duration-150 bg-blue-900 rounded-lg focus:shadow-outline hover:bg-blue-800">
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
  );
}

export default ProductCard;
