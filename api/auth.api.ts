import { TLogin } from "@/types/auth.types";
import { TSignup } from "@/types/register.types";
import axios from "axios";

export const login = async (data: TLogin) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/login",
      data,
    );
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const signup = async (data: TSignup) => {
  try {
    const response = await axios.post(
      "http://localhost:8080/api/v1/auth/register",
      data,
    );
    console.log(response);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};
