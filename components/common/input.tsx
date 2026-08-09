"use client";

import { FC, useState } from "react";
import { UseFormRegister } from "react-hook-form";
import { FiEye, FiEyeOff } from "react-icons/fi";

interface IProps {
  label: string;
  name: string;
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  register: UseFormRegister<any>;
  error?: string;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  register,
  error,
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const inputType = type === "password" && showPassword ? "text" : type;

  return (
    <div className="flex flex-col">
      <label className="text-[14px] font-normal" htmlFor={id}>
        {label}{" "}
        {label !== "Phone" && <span className="text-red-500 ml-1 text-xl">*</span>}
      </label>

      <div className="relative">
        <input
          {...register(name)}
          id={id}
          placeholder={placeholder}
          type={inputType}
          className={`w-full accent-primary py-3.5 px-2 rounded-sm text-sm
            border placeholder:text-sm outline-none
            ${
              error
                ? "border-red-500 focus:border-red-500"
                : "border-primary-light focus:border-primary-active"
            }
            ${type === "password" ? "pr-10" : ""}
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
