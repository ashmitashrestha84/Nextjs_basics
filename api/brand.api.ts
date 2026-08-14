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