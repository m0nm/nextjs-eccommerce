import Image from "next/image";
import Link from "next/link";
import { useMediaQuery } from "react-responsive";
import { useSession } from "next-auth/react";
import logo from "../../public/logo1.png";
import DarkMode from "../dark-mode/DarkMode";
import Sidebar from "./Sidebar/Sidebar";
import UserCart from "./User_Cart/UserCart";

function Navbar() {
  // check if on mobile
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });

  // check for session
  const { data: session } = useSession();

  // return ---
  return (
    <nav className="w-full h-20 mb-28 bg-white dark:bg-zinc-800 sticky shadow-md z-10 flex justify-center md:justify-between items-center">
      {/* logo */}
      <Link passHref href="/">
        <div className="relative w-40 h-10 mx-4 cursor-pointer dark:invert">
          <Image alt="logo" src={logo} layout="fill" />
        </div>
      </Link>

      {/* navbar items */}
      <div className="flex items-center h-full">
        {!isMobile && (
          <>
            {/* dark mode  */}
            <div className="relative w-7 cursor-pointer h-full p-4">
              <DarkMode />
            </div>
            {/* login or user/cart */}
            {session ? (
              <UserCart />
            ) : (
              <Link href="/login" passHref>
                <div className="ml-6 px-4 h-full grid place-items-center text-2xl tracking-wide border-l-2 dark:border-r-zinc-900 cursor-pointer">
                  <a>Login</a>
                </div>
              </Link>
            )}
          </>
        )}
      </div>

      {/* Sidebar */}
      {isMobile && <Sidebar />}
    </nav>
  );
}

export default Navbar;
