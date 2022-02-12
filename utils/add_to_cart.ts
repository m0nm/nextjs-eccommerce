import { IProduct } from "../interface/Index";

// this is used in ProductCard component and the product page
export const add_to_cart = async (
  email: string | undefined | null,
  product: IProduct
) => {
  const res = await fetch(`/api/cart/${email}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ newCartItem: product }),
  });

  return res.status;
};
