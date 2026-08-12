import { Image } from "./image.types"

export interface ICategories{
        _id:string,
        name:string,
        image:Image,
        description?:string
}
