type Product = {
  id: number;
  title: string;
  price: number;
};

type CartItem = {
  product: Product;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  productsIdWithoutStock: number[];
};

type State = {
  cart: CartState;
};
