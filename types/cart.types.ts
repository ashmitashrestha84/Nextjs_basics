import { IProducts } from "./products.types";

export type TCartItem = {
  product_id: IProducts;
  quantity: number;
};

export type TCart = {
  _id: string;
  user_id: string;
  items: TCartItem[];
};
