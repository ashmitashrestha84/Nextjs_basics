import { TLogin, TSignup } from "@/types/auth.types";

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

//login
export const getProfile = async () => {
  try {
    const response = await api.get("/auth/me");
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const logoutUser = async () => {
  try {
    const response = await api.post("/auth/logout");
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};