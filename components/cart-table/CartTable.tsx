import Image from "next/image";
import Link from "next/link";

import { useSession } from "next-auth/react";
import { useStore } from "../../store/store";
import { useEffect, useState } from "react";

import { ICartItem } from "../../interface/Index";

import closeSvg from "../../public/svg/close.svg";
import spinner from "../../public/svg/spinner.gif";
function CartTable() {
  // < ------ * ------ >
  // get user email
  const { data: session } = useSession();

  // < ------ * ------ >
  // delete an item from cart
  const deleteItem = async (item: ICartItem) => {
    const res = await fetch(`/api/cart/${session?.user?.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    });

    setUpdate(!update);
  };
  // < ------ * ------ >
  // re-fetch cart when a CRUD operation occures
  const [update, setUpdate] = useState(false);
  // fetch user cart
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`/api/cart/${session?.user?.email}`);

      const data = await res.json();

      setCart(data);
    };

    session && fetchCart();
  }, [update, session]);

  // < ------ * ------ >
  const setTotalPrice = useStore((state) => state.setTotalPrice);
  // calculate cart total price
  const totalPrice: number = cart.reduce((total, cartItem) => {
    total += cartItem.price * cartItem.quantity;

    return total;
  }, 0);

  setTotalPrice(parseFloat(totalPrice.toFixed(2)));

  // < ------ * ------ >
  // increment/decrement quantity
  const updateQuantity = async (targetItem: string, value: number) => {
    const res = await fetch(`/api/cart/${session?.user?.email}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value, targetItem }),
    });
    res.status === 200 && setUpdate(!update);
  };
  // < ------ * ------ >
  return (
    <table className="bg-white dark:bg-zinc-800 w-full md:w-4/6 h-1/3 md:px-2 md:ml-4 mb-20 rounded-md shadow-md divide-y dark:divide-zinc-500">
      {/* table head */}
      <thead>
        <tr className="divide-x dark:divide-zinc-500">
          {/* image */}
          <th scope="col" className="pl-0 md:pl-2 md:w-32 text-left">
            Image
          </th>
          {/* name */}
          <th scope="col" className="px-2 md:p-0 text-left w-1/4 md:w-1/2">
            Name
          </th>
          {/* price */}
          <th scope="col" className="text-center">
            Price
          </th>
          {/* quantity */}
          <th scope="col" className="text-center w-1/6">
            Quantity
          </th>

          {/* remove item */}
          <th scope="col" className=""></th>
        </tr>
      </thead>

      {/* table body */}

      <tbody className="relative md:text-lg font-medium divide-y dark:divide-zinc-500">
        {/* check if cart is empty */}
        {cart.length === 0 && (
          <Link href="/">
            <a className="absolute mt-10 md:mt-20 text-center underline w-full text-lg md:text-3xl">
              Your cart is empty, Go shopping
            </a>
          </Link>
        )}

        {cart?.map((cartItem: ICartItem) => {
          return (
            <>
              <tr key={cartItem._id}>
                {/* item image */}
                <td>
                  <div className="relative my-4 pr-4 w-18 h-24 md:w-24 md:h-32">
                    <Image
                      alt={cartItem.title}
                      src={`${cartItem.image}` || spinner}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </td>

                {/* item name */}
                <td className="px-2 md:p-0">{cartItem.title}</td>

                {/* item price */}
                <td className="text-center">${cartItem.price}</td>

                {/* item quantity */}
                <td className="h-full text-center text-xl flex flex-col items-center justify-center">
                  <div
                    onClick={() => updateQuantity(cartItem.title, 1)}
                    className="w-0 scale-125 border-b-4 border-b-black border-x-4 border-x-transparent mb-1 dark:invert cursor-pointer"
                  ></div>
                  {cartItem.quantity}
                  <div
                    onClick={() => updateQuantity(cartItem.title, -1)}
                    className="w-0 scale-125 border-t-4 border-t-black border-x-4 border-x-transparent mt-1 dark:invert cursor-pointer"
                  ></div>
                </td>

                {/* remove item from cart */}
                <td
                  onClick={() => {
                    deleteItem(cartItem);
                  }}
                  className="text-center dark:invert"
                >
                  <Image
                    className="cursor-pointer"
                    src={closeSvg}
                    alt="delete"
                    width="18"
                    height="18"
                  />
                </td>
              </tr>
            </>
          );
        })}
      </tbody>
    </table>
  );
}

export default CartTable;
