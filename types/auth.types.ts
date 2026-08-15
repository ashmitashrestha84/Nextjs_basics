import * as yup from "yup";
import { loginSchema } from "@/schemas/auth.schemas";
import { signupSchema } from "@/schemas/register.schemas";

// export type TLogin = {
//   email: string;
//   password: string;
// };

export type TLogin= yup.InferType<typeof loginSchema>
export type TSignup=yup.InferType<typeof signupSchema>