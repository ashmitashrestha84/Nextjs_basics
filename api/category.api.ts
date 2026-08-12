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