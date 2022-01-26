import Image from "next/image";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import menuSvg from "../../../public/svg/category.svg";

type IProps = {
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

function Category({ setCategory }: IProps) {
  // toggle categories
  const [toggle, setToggle] = useState(false);
  // < ---------- --------- >

  //  detect if user clicked outside the popup
  const clickedOutside = useDetectClickOutside({
    onTriggered: () => setToggle(false),
  });

  // < ---------- --------- >
  return (
    <div
      ref={clickedOutside}
      onClick={() => setToggle(!toggle)}
      className="bg-gray-200 dark:bg-zinc-700 relative px-4 py-2 rounded-xl flex items-center justify-center cursor-pointer"
    >
      <p className="text-xl font-medium mr-2 cursor-pointer">Categories</p>
      <Image
        src={menuSvg}
        alt="categories"
        width="34"
        height="34"
        className="dark:invert"
      />

      {/* popup */}
      {toggle && (
        <div className="absolute left-56 top-14 md:left-full md:-translate-x-6 md:top-8 w-60 h-44 rounded-sm text-left divide-y dark:divide-slate-200 bg-white dark:bg-[#1b1b1f] shadow-lg z-20 flex flex-col justify-between">
          <p
            onClick={() => setCategory("")}
            className="h-10 text-lg w-full px-3 flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"
          >
            All
          </p>

          <p
            onClick={() => setCategory("men's clothing")}
            className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"
          >
            Men&apos;s Clothing
          </p>

          <p
            onClick={() => setCategory("women's clothing")}
            className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"
          >
            Women&apos;s Clothing
          </p>
          <p
            onClick={() => setCategory("jewelery")}
            className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"
          >
            Jewelery
          </p>

          <p
            onClick={() => setCategory("electronics")}
            className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"
          >
            Electronics
          </p>
        </div>
      )}
    </div>
  );
}

export default Category;
