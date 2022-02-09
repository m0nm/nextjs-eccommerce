import Image from "next/image";
import { useState } from "react";
import { useDetectClickOutside } from "react-detect-click-outside";
import { useSession, signOut } from "next-auth/react";

import menuSvg from "../../../public/svg/menu.svg";
import userSvg from "../../../public/svg/user.svg";
import cartSvg from "../../../public/svg/cart.svg";
import DarkMode from "../../dark-mode/DarkMode";
import Link from "next/link";

function Sidebar() {
  // toggle popup
  const [popup, setPopup] = useState(false);

  // check for user session
  const { data: session } = useSession();

  //  < ------ -------- >

  //  detect if user clicked outside the popup
  const clickedOutside = useDetectClickOutside({
    onTriggered: () => setPopup(false),
  });

  //  < ------ -------- >
  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };
  //  < ------ -------- >
  return (
    <>
      {/* sidebar */}

      <div className="absolute right-0 mx-4">
        <div ref={clickedOutside} className="relative ">
          {/* menu svg */}
          <div
            onClick={() => setPopup(!popup)}
            className=" relative h-7 w-7 dark:invert"
          >
            <Image alt="menu" layout="fill" src={menuSvg} />
          </div>

          {/* menu popup */}
          {popup && (
            <div className="bg-white dark:bg-zinc-800 absolute top-9 right-6 px-4 h-52 w-56 shadow-lg border rounded-sm grid place-items-center">
              {/* login/logout  */}
              {!session ? (
                <Link href="/login" passHref>
                  <div className="w-full mt-4 h-4 text-center cursor-pointer flex items-center">
                    {/* user svg */}
                    <div className="relative w-7 h-7 mr-6 dark:invert">
                      <Image alt="user" layout="fill" src={userSvg} />
                    </div>
                    <p className="text-2xl">Login</p>
                  </div>
                </Link>
              ) : (
                <>
                  {/* logout */}
                  <div
                    onClick={handleSignOut}
                    className="w-full mt-4 h-4 text-center cursor-pointer flex items-center"
                  >
                    {/* user svg */}
                    <div className="relative w-7 h-7 mr-6 dark:invert">
                      <Image alt="user" layout="fill" src={userSvg} />
                    </div>
                    <p className="text-2xl">Logout</p>
                  </div>

                  {/* cart */}
                  <Link href="/cart" passHref>
                    <div className="w-full h-4 text-center cursor-pointer flex items-center">
                      {/* cart svg */}
                      <div className="relative w-7 h-7 mr-6 dark:invert">
                        <Image alt="user" layout="fill" src={cartSvg} />
                      </div>
                      <p className="text-2xl">Cart</p>
                    </div>
                  </Link>
                </>
              )}

              {/* dark mode */}
              <div className="flex justify-between items-center w-full h-6 cursor-pointer">
                <div className="mt-2">
                  <DarkMode />
                </div>

                <p className="text-2xl">Switch Theme</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default Sidebar;
