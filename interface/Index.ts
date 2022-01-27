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
