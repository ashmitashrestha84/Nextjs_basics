import { productSchema } from "@/schemas/product.schemas"
import * as yup from "yup"

export type TProduct=yup.InferType<typeof productSchema>;