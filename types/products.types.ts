import { IBrand } from "./brand.types";
import { ICategories } from "./categories.types";
import { Image } from "./image.types";

export interface IProducts {
  _id:string;
  name: string;
  price: number;
  description: string;
  product_image: Image;
  category: ICategories;
  brand: IBrand;
  images: Image[];
  new_arrival: boolean;
  is_featured: boolean;
}