import * as yup from "yup";

export const updateUserSchema = yup.object({
  full_name: yup
    .string()
    .min(3, "Full name must be at least 3 characters")
    .required("Full name is required"),

  email: yup.string().email("Invalid email").required("Email is required"),

  profile_image: yup
    .mixed<FileList>()
    .optional()
    .test("fileType", "Only image files are allowed", (value) => {
      if (!value || value.length === 0) {
        return true;
      }

      return Array.from(value).every((file) => file.type.startsWith("image/"));
    }),
});
