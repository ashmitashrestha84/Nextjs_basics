import { FC } from "react";
import { UseFormRegister } from "react-hook-form";

interface IProps {
  label: string;
  name: string;
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  // onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  // value: string;
  register: UseFormRegister<any>;
  error?:string
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  register,
  error
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[14px] font-normal" htmlFor={id}>
        {label}
      </label>

      <input
        {...register(name)}
        id={id}
        // name={name}
        // onChange={onChange}
        placeholder={placeholder}
        type={type}
        // value={value}
        className={`accent-primary py-3.5 border px-2 rounded-sm text-sm placeholder:text-sm
          ${error ? "border-green-800 focus:outline-green-800":"border-primary-light focus:outline-primary-active"}
        `}
       />
      <small
      className="h-4 text-green-950">{error}</small>
    </div>
  );
};

export default Input;
