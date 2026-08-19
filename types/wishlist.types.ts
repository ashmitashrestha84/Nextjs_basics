import { TProduct } from "./Aproduct.types";
import { IProducts } from "./products.types";

export interface TWishlistItem {
  product_id: string;
}

export interface TWishlist {
  _id: string;
  user_id: string;
  products: IProducts[];
}
