import { IProducts } from "./products.types";
import { IUser } from "./user.types";

export type TWishlist = {
  _id: string;
  user: IUser;
  products: IProducts[];
};
