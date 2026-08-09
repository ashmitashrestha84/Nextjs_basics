import { MdDescription } from "react-icons/md";
import * as yup from "yup";

export const BrandSchema = yup.object({
  brand_name: yup
    .string()
    .min(4, "brand name must be 4 character long")
    .required("brand name is required"),
  description: yup
    .string()
    .min(10, "brand description must be 10 character long")
    .required("description is required"),
});
