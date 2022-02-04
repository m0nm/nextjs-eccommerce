import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ICart } from "../../interface/Index";
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
  const deleteItem = async (item: ICart[0]) => {
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
  const [cart, setCart] = useState<ICart>();

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
  return (
    <table className="bg-white w-full md:w-4/6 h-1/2 px-2 ml-4 rounded-md divide-y">
      {/* table head */}
      <thead>
        <tr className="divide-x">
          {/* image */}
          <th scope="col" className="p-2 w-32 text-left">
            Image
          </th>
          {/* name */}
          <th scope="col" className="p-2 text-left w-1/2">
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
      <tbody className="relative text-lg font-medium divide-y">
        {cart?.map((cartItem) => {
          console.log(cartItem);

          return (
            <>
              <tr key={cartItem._id}>
                {/* item image */}
                <td>
                  <div className="relative pr-4 w-24 h-32">
                    <Image
                      alt={cartItem.title}
                      src={`${cartItem.image}` || spinner}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </td>

                {/* item name */}
                <td>{cartItem.title}</td>

                {/* item price */}
                <td className="text-center">{cartItem.price}</td>

                {/* item quantity */}
                <td className="text-center">{cartItem.quantity}</td>

                {/* remove item from cart */}
                <td
                  onClick={() => {
                    deleteItem(cartItem);
                  }}
                  className="text-center"
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
