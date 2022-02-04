export type IProduct = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
};

export type IProducts = {
  products: IProduct[];
};

export type IFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type ICartItem = {
  _id: string;
  title: string;
  image: string;
  quantity: number | null;
  price: number | null;
};

export type ICart = [ICartItem];
