import { productSchema, updateProductSchema } from "@/schemas/product.schemas"
import * as yup from "yup"

export type TProduct=yup.InferType<typeof productSchema>;
export type TUpdateProduct=yup.InferType<typeof updateProductSchema>