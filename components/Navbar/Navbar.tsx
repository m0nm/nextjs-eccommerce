import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";

import logo from "../../public/logo1.png";
import DarkMode from "../dark-mode/DarkMode";
import Sidebar from "./Sidebar/Sidebar";

function Navbar() {
  // check for mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // return ---
  return (
    <nav className="w-full h-20 mb-28 bg-white dark:bg-zinc-800 sticky shadow-md z-10 flex justify-center md:justify-between items-center">
      {/* logo */}
      <Link passHref href="/">
        <div className="relative w-40 h-10 mx-4 cursor-pointer dark:invert">
          <Image alt="logo" src={logo} layout="fill" />
        </div>
      </Link>

      {/* user and cart */}
      <div className="flex items-center h-full">
        {!isMobile && (
          <>
            {/* dark mode  */}
            <div className="relative w-7 cursor-pointer h-full p-4">
              <DarkMode />
            </div>
            {/* login */}
            <div className="ml-6 px-4 h-full grid place-items-center text-2xl tracking-wide border-l-2 dark:border-r-zinc-900">
              <a href="#">Login</a>
            </div>
          </>
        )}
      </div>

      {/* Sidebar */}
      {isMobile && <Sidebar />}
    </nav>
  );
}

export default Navbar;
