import { TLogin } from "@/types/auth.types";
import { TSignup } from "@/types/register.types";
import axios from "axios";
import api from ".";
import { TBrand } from "@/types/brand.types";
import { TCategory } from "@/types/category.types";

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

export const brand = async (data: TBrand) => {
  try {
    const response = await api.post("brands", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const category = async (data: TCategory) => {
  try {
    const response = await api.post("categories", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
}

// export const product = async (data: TBrand) => {
//   try {
//     const response = await api.post("brands", data);
//     console.log(response);
//     return response.data;
//   } catch (error: any) {
//     console.log(error);
//     throw error.response.data;
//   }
// }
