"use client";

import { useState } from "react";

const Quantity = () => {
  const [count, setCount] = useState(1);
  const onIncrement = () => {
    setCount((prev) => {
      return prev + 1;
    });
  };

  const onDecrement = () => {
    if (count > 0) {
      setCount((prev) => {
        return prev - 1;
      });
    }
  };
  return (
    <div className="flex items-center gap-0">
      <button
        className="h-12 w-12 rounded-l-lg border border-gray-300 bg-white text-lg hover:bg-gray-50"
        onClick={onDecrement}
      >
        -
      </button>

      <div className="flex h-12 w-14 items-center justify-center border-y border-gray-300 bg-white">
        
        {count}
      </div>

      <button
        className="h-12 w-12 rounded-r-lg border border-gray-300 bg-white text-lg hover:bg-gray-50"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
