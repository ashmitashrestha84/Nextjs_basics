import { Image } from "./image.types"

export interface IBrand{
        _id:string,
        name:string,
        logo:Image,
        description?:string
}
