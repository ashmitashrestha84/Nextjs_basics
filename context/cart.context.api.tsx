"use client";

import { createContext } from "react";
import { TCart } from "@/types/cart.types";

type TCartContext = {
  cart: TCart | null;

  addToCart: ({
    productId,
    quantity,
  }: {
    productId: string;
    quantity: number;
  }) => void;

  removeFromCart: ({ productId }: { productId: string }) => void;
};

const initialValue: TCartContext = {
  cart: null,

  addToCart: ({ productId, quantity }) => {
    console.log("Add to cart:", productId, quantity);
  },

  removeFromCart: ({ productId }) => {
    console.log("Remove from cart:", productId);
  },
};

export const CartContext = createContext<TCartContext>(initialValue);
