import { IProducts } from "./products.types";
import { TUser } from "./user.types";

export type TWishlist = {
  _id: string;
  user: TUser;
  products: IProducts[];
};
