import * as yup from "yup";

export const categorySchema = yup.object({
  brand_name: yup
    .string()
    .min(4, "Category name must be at least 4 characters long")
    .required("Category name is required"),

  description: yup
    .string()
    .min(10, "Category description must be at least 10 characters long")
    .required("Description is required"),

  logo: yup
    .mixed<FileList>()
    .required("Logo is required")
    .test(
      "fileRequired",
      "Logo is required",
      (value) => value instanceof FileList && value.length > 0,
    ),
});
