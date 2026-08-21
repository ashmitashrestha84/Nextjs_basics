import * as yup from "yup";

export const BrandSchema = yup.object({
  name: yup
    .string()
    .min(4, "Brand name must be at least 4 characters long")
    .required("Brand name is required"),

  description: yup
    .string()
    .min(10, "Brand description must be at least 10 characters long")
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

export const UpdateBrandSchema=yup.object({
  name:yup.string().optional(),
  description:yup.string().optional(),
  logo: yup.mixed<FileList>().optional(),
})
