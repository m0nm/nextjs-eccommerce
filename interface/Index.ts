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

export type IFormInputs = {
  email: string;
  password: string;
  confirmPassword?: string;
};

export type ICartItem = {
  _id: string;
  title: string;
  image: string;
  quantity: number;
  price: number;
};

export type IUser = {
  _id: string;
  email: string;
  password: string;

  cart: ICartItem[];
};
