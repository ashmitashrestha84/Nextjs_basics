import api from ".";

interface ICreateCart {
  productId: string;
  quantity: number;
}

// Add to cart
export const createCart = async ({ productId, quantity }: ICreateCart) => {
  try {
    const response = await api.post("/carts", {
      product_id: productId,
      quantity,
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// Get cart
export const getCart = async () => {
  try {
    const response = await api.get("/carts");

    return response?.data?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};

// Delete cart item
export const deleteCart = async (productId: string) => {
  try {
    const response = await api.delete(`/carts/${productId}`);

    return response?.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
