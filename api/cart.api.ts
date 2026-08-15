import api from ".";

interface ICreateCart {
  productId: string;
  quantity: number;
}

export const createCart = async ({ productId, quantity }: ICreateCart) => {
  try {
    const response = await api.post("/cart", {
      product_id: productId,
      quantity,
    });

    return response.data;
  } catch (error: any) {
    throw error?.response?.data;
  }
};
