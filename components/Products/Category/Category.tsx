import Image from "next/image";
import menuSvg from "../../../public/svg/category.svg";

function Category() {
  return (
    <div className="bg-gray-200 px-4 py-2 rounded-xl flex items-center justify-center cursor-pointer">
      <p className="text-xl font-medium mr-2 cursor-pointer">Categories</p>
      <Image
        src={menuSvg}
        alt="categories"
        width="34"
        height="34"
        className="dark:invert"
      />

      {/* popup */}
      {/* <div className="w-60 h-44 rounded-sm text-left divide-y dark:divide-slate-200 bg-white dark:bg-[#1b1b1f] drop-shadow-lg  z-20  flex flex-col justify-between"> */}
      {/* <p className="h-10 text-lg w-full px-3 flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900">
        All
      </p> */}

      {/* <p className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"> */}
      {/* Men&apos;s Clothing */}
      {/* </p> */}

      {/* <p className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900"> */}
      {/* Women&apos;s Clothing */}
      {/* </p> */}
      {/* <p className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900">
      Jewelery
      </p>
      
      <p className="h-10 text-lg w-full  px-3  flex items-center hover:bg-slate-100 dark:hover:bg-zinc-900">
      Electronics
    </p> */}
      {/* </div> */}
    </div>
  );
}

export default Category;
