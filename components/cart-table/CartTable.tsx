import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ICart } from "../../interface/Index";
import closeSvg from "../../public/svg/close.svg";
function CartTable() {
  // < ------ * ------ >
  // get user email
  const { data: session } = useSession();

  // < ------ * ------ >
  // delete an item from cart
  const deleteItem = async (item: ICart[0]) => {
    const res = await fetch(`/api/cart/${session?.user?.email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ item }),
    });
  };
  // < ------ * ------ >
  // fetch user cart
  const [cart, setCart] = useState<ICart>([
    { _id: "", title: "", price: 0, quantity: 1 },
  ]);

  useEffect(() => {
    const fetchCart = async () => {
      const res = await fetch(`/api/cart/${session?.user?.email}`);

      const data = await res.json();

      setCart(data);
    };

    if (session) {
      fetchCart();
    }
  }, [cart, session]);

  // < ------ * ------ >
  return (
    <table className="bg-white w-full md:w-4/6 h-1/2 px-2 ml-4 rounded-md divide-y">
      {/* table head */}
      <thead>
        <tr className="divide-x">
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
      <tbody className="text-lg font-medium divide-y">
        {cart.map((cartItem) => {
          return (
            <tr className="mb-1" key={cartItem._id}>
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
          );
        })}
      </tbody>
    </table>
  );
}

export default CartTable;
