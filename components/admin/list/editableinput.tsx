"use client";

import { useState } from "react";

interface EditableInputProps {
  value: string | number;
  type?: "text" | "number";
  onChange: (value: string | number) => void;
}

const EditableInput = ({
  value,
  type = "text",
  onChange,
}: EditableInputProps) => {
  const [inputValue, setInputValue] = useState(value);

  const handleChange = (newValue: string) => {
    setInputValue(newValue);

    onChange(type === "number" ? Number(newValue) : newValue);
  };

  return (
    <input
      type={type}
      value={inputValue}
      onChange={(e) => handleChange(e.target.value)}
      className="h-full w-full min-w-0 rounded border px-2 py-1 outline-none"
    />
  );
};

export default EditableInput;
