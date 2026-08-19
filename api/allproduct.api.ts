import { IProducts } from "@/types/products.types";
import api from ".";

export const getAllProducts=async()=>{
    try{
        const response=await api.get("/products/");
        return response?.data; 
    }catch(error:any){
       throw error?.response?.data
    }
}

export const getFeaturedAllProducts=async()=>{
    try{
        const response=await api.get("/products/featured");
        return response?.data; 
    }catch(error:any){
       throw error?.response?.data
    }
}

export const product = async (data: FormData) => {
  try {
    const response = await api.post("products", data);
    console.log(response);
    return response.data;
  } catch (error: any) {
    console.log(error);
    throw error.response.data;
  }
}


export const updateProduct = async (data: IProducts) => {
  try {
    const response = await api.put(`/products/${data._id}`, data);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};

export const deleteProduct = async (data: IProducts) => {
  try {
    const response = await api.delete(`/products/${data._id}`);
    return response?.data;
  } catch (error: any) {
    throw error?.response.data;
  }
};
