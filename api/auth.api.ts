import { TLogin } from "@/types/auth.types";
import { TSignup } from "@/types/register.types";
import api from ".";


export const login = async (data: TLogin) => {
  try {
    const response = await api.post("auth/login", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const signup = async (data: TSignup) => {
  try {
    const response = await api.post("auth/register", data);
    console.log(response);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};
