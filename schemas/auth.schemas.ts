import * as yup from "yup";
export const loginSchema = yup.object({
  email: yup.string().required("email is required"),
  password: yup.string().required("password is required"),
});