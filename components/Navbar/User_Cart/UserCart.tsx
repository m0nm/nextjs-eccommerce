import Image from "next/image";
import userSvg from "../../../public/svg/user.svg";
import cartSvg from "../../../public/svg/cart.svg";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { useDetectClickOutside } from "react-detect-click-outside";
import Link from "next/link";
function UserCart() {
  // toggle popup
  const [popup, setPopup] = useState(false);
  // < ------ ------- >

  const handleSignOut = () => {
    signOut({ callbackUrl: `${window.location.origin}` });
  };

  // < ------ ------- >
  //  detect if user clicked outside the popup
  const clickedOutside = useDetectClickOutside({
    onTriggered: () => setPopup(false),
  });

  return (
    <>
      {/* user and cart   */}
      <div className="flex items-center ml-4 border-l-2 h-full pl-2">
        {/* cart  */}
        <Link href="/cart" passHref>
          <div className="relative w-8 h-8 cursor-pointer  dark:invert">
            <Image alt="cart" layout="fill" src={cartSvg} />
          </div>
        </Link>

        {/* user  */}
        <div
          onClick={() => setPopup(!popup)}
          ref={clickedOutside}
          className="relative w-8 h-8 cursor-pointer mx-3 dark:invert"
        >
          <Image alt="user" layout="fill" src={userSvg} />

          {popup && (
            <div
              onClick={handleSignOut}
              className="bg-white dark:bg-zinc-800 absolute top-full right-1/2 translate-x-1/2 mr-4 shadow-md rounded-md p-4"
            >
              <p className="text-xl font-medium">Logout</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default UserCart;
