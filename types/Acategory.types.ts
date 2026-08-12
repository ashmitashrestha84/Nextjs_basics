import * as yup from "yup";
import { categorySchema } from "@/schemas/category.schemas";


export type TCategory= yup.InferType<typeof categorySchema>