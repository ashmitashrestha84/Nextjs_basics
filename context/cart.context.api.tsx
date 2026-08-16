"use client";

import { createContext } from "react";

export type TCartItem = {
  product_id: string;
  quantity: number;
};

type TCartContext = {
  cart: TCartItem[] | null;

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
