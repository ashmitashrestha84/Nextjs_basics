import * as yup from "yup";

export const signupSchema = yup.object({
  full_name: yup.string().required("full name is required"),
  email: yup
    .string()
    .email("Enter a valid email")
    .required("email is required"),
  phone: yup.string().optional(),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("password is required"),
});
