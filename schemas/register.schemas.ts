import * as yup from "yup";

export const signupSchema = yup.object({
  full_name: yup.string().required("full name is required"),
  email: yup.string().required("email is required"),
  phone: yup.string().required("Phone number is required"),
  password: yup.string().required("password is required"),
  confirmPassword: yup.string().required("password is required"),
});