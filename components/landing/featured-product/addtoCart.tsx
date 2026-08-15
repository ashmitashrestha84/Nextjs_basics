"use client";

import { createCart } from "@/api/cart.api";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoCartOutline } from "react-icons/io5";
import Quantity from "./quantity";

interface IProps {
  className: string;
  detail?: string;
  productId: string;
}

const AddToCart = ({ className, detail, productId }: IProps) => {
  const [count, setCount] = useState(1);

  const { mutate, isPending } = useMutation({
    mutationFn: createCart,

    onSuccess(response) {
      toast.success(response.message ?? "Product added to Cart");
    },

    onError(error: any) {
      toast.error(error.message ?? "Something went wrong");
    },
  });

  const handleAddToCart = () => {
    mutate({
      productId,
      quantity: count,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Quantity count={count} setCount={setCount} />

      <button
        type="button"
        disabled={isPending}
        onClick={handleAddToCart}
        className={className}
      >
        <IoCartOutline className="text-xl" />
        {isPending ? "Adding..." : detail}
      </button>
    </div>
  );
};

export default AddToCart;
