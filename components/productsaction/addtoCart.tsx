"use client";

import { useContext, useState } from "react";
import { IoCartOutline } from "react-icons/io5";
import Quantity from "../landing/featured-product/quantity";
import { CartContext } from "@/context/cart.context.api";

interface IProps {
  className: string;
  detail?: string;
  productId: string;
}

const AddToCart = ({ className, detail, productId }: IProps) => {
  const [count, setCount] = useState(1);

  const { addToCart } = useContext(CartContext);

  const handleAddToCart = () => {
    addToCart({
      productId,
      quantity: count,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <Quantity count={count} setCount={setCount} />

      <button type="button" onClick={handleAddToCart} className={className}>
        <IoCartOutline className="text-xl" />
        {detail ?? "Add to Cart"}
      </button>
    </div>
  );
};

export default AddToCart;
