"use client";

import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface IProps {
  label: string;
  name: string;
  id: string;
  type: "text" | "password" | "email" | "file";
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
  multiple?: boolean;
  className?: string;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
  multiple,
  className,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col">
      <label className="text-[14px] font-normal" htmlFor={id}>
        {label}{" "}
        {label !== "Phone" && (
          <span className="text-red-500 ml-1 text-xl">*</span>
        )}
      </label>

      <div className="relative">
        <input
          {...register(name)}
          id={id}
          placeholder={placeholder}
          type={inputType}
          multiple={multiple}
          className={`w-full py-3.5 px-2 rounded-sm text-sm
                border placeholder:text-sm outline-none
                file:mr-25
                file:rounded-full
                file:border-0
                file:bg-violet-50
                file:px-4
                file:py-2
                file:text-sm
                file:font-semibold
                file:text-violet-700
                hover:file:bg-violet-100

            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-primary-light focus:border-primary-active"
            }
            ${type === "password" ? "pr-10" : ""}
            ${className}
          `}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2
                       text-muted hover:text-primary cursor-pointer"
          >
            {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
          </button>
        )}
      </div>

      <small className="h-4 text-red-500">{error}</small>
    </div>
  );
};

export default Input;
