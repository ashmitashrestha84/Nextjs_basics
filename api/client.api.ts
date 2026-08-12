import { TBrand } from "@/types/Abrand.types";
import { TCategory } from "@/types/Acategory.types";
import api from ".";
import { TProduct } from "@/types/Aproduct.types";

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
};

export const product = async (data: TProduct) => {
  try {
    const response = await api.post("products", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
}
