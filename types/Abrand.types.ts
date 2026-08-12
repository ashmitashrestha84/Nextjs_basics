import * as yup from "yup";
import { BrandSchema } from "@/schemas/brand.schemas";

export type TBrand= yup.InferType<typeof BrandSchema>