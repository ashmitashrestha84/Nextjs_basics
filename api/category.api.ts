import { ICategories } from "@/types/categories.types";
import api from ".";

//* get all
export const getAllCategories = async () => {
  try {
    const response = await api.get("/categories");
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
export const category = async (data: FormData) => {
  try {
    const response = await api.post("/categories", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
};

export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get(`/categories/${id}`);

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};


export const updateCategories = async (id:string,formData:FormData) => {
  try {
    const response = await api.put(`/categories/${id}`, formData);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const deleteCategories = async (data: ICategories) => {
  try {
    const response = await api.delete(`/categories/${data._id}`);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
