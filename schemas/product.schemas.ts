import * as yup from "yup";

export const productSchema = yup.object({
  name: yup
    .string()
    .min(4, "Product name must be at least 4 characters long")
    .required("Product name is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  description: yup
    .string()
    .min(10, "Product description must be at least 10 characters long")
    .required("Description is required"),

  product_image: yup
    .mixed<FileList>()
    .required("Product image is required")
    .test(
      "fileRequired",
      "Product image is required",
      (value) => !!value && value.length > 0,
    )
    .test("fileType", "Invalid image", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return Array.from(value).every((file) => file.type.startsWith("image/"));
    }),

  category: yup.string().required("Category is required"),

  brand: yup.string().required("Brand is required"),

  images: yup
    .mixed<FileList>()
    .required("Product images are required")
    .test(
      "fileRequired",
      "Product images are required",
      (value) => !!value && value.length > 0,
    )
    .test("fileType", "Invalid image", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return Array.from(value).every((file) => file.type.startsWith("image/"));
    }),

  new_arrival: yup.boolean().required().default(false),

  is_featured: yup.boolean().required().default(false),
});


export const updateProductSchema = yup.object({
  name: yup
    .string()
    .min(4, "Product name must be at least 4 characters long")
    .required("Product name is required"),

  price: yup
    .number()
    .typeError("Price must be a number")
    .required("Price is required"),

  description: yup
    .string()
    .min(10, "Product description must be at least 10 characters long")
    .required("Description is required"),

  category: yup.string().required("Category is required"),

  brand: yup.string().required("Brand is required"),

  product_image: yup
    .mixed<FileList>()
    .optional()
    .test("fileType", "Invalid image", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return Array.from(value).every((file) => file.type.startsWith("image/"));
    }),

  images: yup
    .mixed<FileList>()
    .optional()
    .test("fileType", "Invalid image", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return Array.from(value).every((file) => file.type.startsWith("image/"));
    }),

  new_arrival: yup.boolean().required().default(false),

  is_featured: yup.boolean().required().default(false),
});
