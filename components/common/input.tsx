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
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  placeholder,
  type = "text",
  register,
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
        className=" w-full px-3 py-2.5 rounded-sm border border-border bg-card text-[12px] text-foreground placeholder:text-muted outline-none transition-colors duration-200 hover:border-primary-hover focus:border-primary"
      />
    </div>
  );
};

export default Input;
