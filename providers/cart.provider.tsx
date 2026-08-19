"use client";

import { createCart, deleteCart, getCart } from "@/api/cart.api";
import { CartContext } from "@/context/cart.context.api";
import { useAuth } from "@/hooks/auth.hook";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface IProps {
  children: React.ReactNode;
}

const CartProvider = ({ children }: IProps) => {
  const queryClient = useQueryClient();

  const { user } = useAuth();

  const { data: cart } = useQuery({
    queryFn: getCart,
    queryKey: ["cart", user?._id],
    enabled: !!user?._id,
  });

  const { mutate: addToCart } = useMutation({
    mutationFn: createCart,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product added to cart");

      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to add product to cart");
    },
  });

  const { mutate: removeFromCart } = useMutation({
    mutationFn: deleteCart,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product removed from cart");

      queryClient.invalidateQueries({
        queryKey: ["get-cart"],
      });
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to remove product");
    },
  });

  const handleAddToCart = ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => {
    addToCart({
      productId,
      quantity,
    });
  };

  const handleRemoveFromCart = ({ productId }: { productId: string }) => {
    removeFromCart(productId);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart: handleAddToCart,
        removeFromCart: handleRemoveFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
