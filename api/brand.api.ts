import { IBrand } from "@/types/brand.types";
import api from ".";

//* get all
export const getAllBrands = async () => {
  try {
    const response = await api.get("/brands");
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

export const brand = async (data: FormData) => {
  try {
    const response = await api.post("brands", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};


export const updateBrand = async (data: IBrand) => {
  try {
    const response = await api.put(`/brands/${data._id}`, data);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const deleteBrand = async (data: IBrand) => {
  try {
    const response = await api.delete(`/brands/${data._id}`);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
