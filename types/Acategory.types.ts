import * as yup from "yup";
import { categorySchema, UpdateCategorySchema } from "@/schemas/category.schemas";


export type TCategory= yup.InferType<typeof categorySchema>
export type TUpdateCategory=yup.InferType<typeof UpdateCategorySchema>