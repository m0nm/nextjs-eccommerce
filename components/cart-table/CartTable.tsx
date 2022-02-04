import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useStore } from "../../store/store";
import React, { useEffect, useState } from "react";
import { ICartItem } from "../../interface/Index";
import closeSvg from "../../public/svg/close.svg";
import spinner from "../../public/svg/spinner.gif";
function CartTable() {
  // < ------ * ------ >
  // get user email
  const { data: session } = useSession();

  // < ------ * ------ >
  // update cart when an item is deleted
  const [update, setUpdate] = useState(false);
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
  // fetch user cart
  const [cart, setCart] = useState<ICartItem[]>([]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`/api/cart/${session?.user?.email}`);

      const data = await res.json();

      setCart(data);
    };

    if (session) {
      fetchCart();
    }
  }, [update, session]);

  // < ------ * ------ >
  const setTotalPrice = useStore((state) => state.setTotalPrice);
  // calculate cart total price
  const totalPrice: number = cart.reduce((total, cartItem) => {
    total += cartItem.price * cartItem.quantity;

    return total;
  }, 0);

  console.log("totalPrice: ", totalPrice);
  setTotalPrice(parseFloat(totalPrice.toFixed(2)));
  // < ------ * ------ >
  return (
    <table className="bg-white dark:bg-zinc-800 w-full md:w-4/6 h-1/3 md:px-2 md:ml-4 rounded-md divide-y">
      {/* table head */}
      <thead>
        <tr className="divide-x">
          {/* image */}
          <th scope="col" className="p-2 md:w-32 text-left">
            Image
          </th>
          {/* name */}
          <th scope="col" className="p-2 text-left w-1/3 md:w-1/2">
            Name
          </th>
          {/* price */}
          <th scope="col" className="p-2 text-center">
            Price
          </th>
          {/* quantity */}
          <th scope="col" className="p-2 text-center w-1/6">
            Quantity
          </th>

          {/* remove item */}
          <th scope="col" className="p-2"></th>
        </tr>
      </thead>

      {/* table body */}

      <tbody className="relative md:text-lg font-medium divide-y">
        {/* check if cart is empty */}
        {cart.length === 0 && (
          <Link href="/">
            <a className="absolute underline left-1/4 top-1/3 text-3xl">
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
                <td className="p-2 md:p-0">{cartItem.title}</td>

                {/* item price */}
                <td className="text-center">${cartItem.price}</td>

                {/* item quantity */}
                <td className="text-center">{cartItem.quantity}</td>

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
