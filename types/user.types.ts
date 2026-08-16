import { Image } from "./image.types";

 export type IUser={
        _id:string,
        createdAt:string,
        updatedAt:string,
        full_name:string,
        profile_image:Image,
        email:string;
    }