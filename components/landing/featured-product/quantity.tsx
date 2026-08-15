"use client";

interface IProps {
  count: number;
  setCount: React.Dispatch<React.SetStateAction<number>>;
}

const Quantity = ({ count, setCount }: IProps) => {
  const onIncrement = () => {
    setCount((prev) => prev + 1);
  };

  const onDecrement = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  return (
    <div className="flex items-center gap-0">
      <button
        type="button"
        className="h-12 w-12 rounded-l-lg border border-gray-300 bg-white text-lg hover:bg-gray-50"
        onClick={onDecrement}
      >
        -
      </button>

      <div className="flex h-12 w-14 items-center justify-center border-y border-gray-300 bg-white">
        {count}
      </div>

      <button
        type="button"
        className="h-12 w-12 rounded-r-lg border border-gray-300 bg-white text-lg hover:bg-gray-50"
        onClick={onIncrement}
      >
        +
      </button>
    </div>
  );
};

export default Quantity;
