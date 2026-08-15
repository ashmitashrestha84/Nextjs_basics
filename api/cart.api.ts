import api from ".";

export const cart = async (productId: string) => {
  try {
    const response = await api.post("/cart");
    product_id: productId;
    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
