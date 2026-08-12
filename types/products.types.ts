import { Image } from "./image.types";

export interface IProducts {
  _id:string;
  name: string;
  price: number;
  description: string;
  product_image: Image;
  category: string;
  brand: string;
  images?: Image[];
  new_arrival: boolean;
  is_featured: boolean;
}