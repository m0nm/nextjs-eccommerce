import Image from "next/image";
import userSvg from "../../public/svg/user.svg";
import cartSvg from "../../public/svg/cart.svg";
function UserCart() {
  return (
    <>
      {/* user and cart   */}
      <div className="flex items-center">
        {/* cart  */}
        <div className="relative w-8 h-8 cursor-pointer  dark:invert">
          <Image alt="cart" layout="fill" src={cartSvg} />
        </div>

        {/* user  */}
        <div className="relative w-8 h-8 cursor-pointer mx-5 dark:invert">
          <Image alt="user" layout="fill" src={userSvg} />
        </div>
      </div>
    </>
  );
}

export default UserCart;
