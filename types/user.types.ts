import { Role } from "./enum.types";
import { Image } from "./image.types";

/**
 * User data returned from the API
 */
export type IUser = {
  _id: string;
  createdAt: string;
  updatedAt: string;

  full_name: string;
  email: string;
  role: Role;

  profile_image: Image;
};


export type TUpdateUser = {
  full_name: string;
  email: string;
  profile_image?: FileList;
};
