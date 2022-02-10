import Image from "next/image";
import React from "react";
import searchSvg from "../../../public/svg/search.svg";

type IProps = {
  setSearch: React.Dispatch<React.SetStateAction<string>>;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
};

function Searchbar({ setSearch, setCategory }: IProps) {
  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    // reset categories when user type in
    setCategory("");

    setSearch(e.currentTarget.value);
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      className="w-full lg:w-1/4 md:w-1/5 h-10 flex justify-between items-center border px-2 py-2 mb-4 shadow-sm rounded-2xl dark:focus-within:bg-[#222227] dark:bg-[#1b1b1f]"
    >
      {/* input */}
      <input
        onChange={handleChange}
        type="text"
        placeholder="search for product"
        className="px-2 w-full h-full border-0 bg-transparent"
      />

      {/* search svg */}
      <div className="relative w-5 h-5 mr-2 dark:invert">
        <Image src={searchSvg} layout="fill" alt="search" />
      </div>
    </form>
  );
}

export default Searchbar;
