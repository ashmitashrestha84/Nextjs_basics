import { signupSchema } from "@/schemas/register.schemas";
import * as yup from "yup";

export type TSignup=yup.InferType<typeof signupSchema>