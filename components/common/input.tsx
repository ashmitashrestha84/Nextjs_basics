import { FC } from "react";

interface IProps {
  label: string;
  name: string;
  id: string;
  type: "text" | "password" | "email";
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
}

const Input: FC<IProps> = ({
  id,
  label,
  name,
  onChange,
  placeholder,
  value,
  type = "text",
}) => {
  return (
    <div className="flex flex-col">
      <label className="text-[18px] font-normal" htmlFor={id}>
        {label}
      </label>

      <input
        id={id}
        name={name}
        onChange={onChange}
        placeholder={placeholder}
        type={type}
        value={value}
        className=" w-full px-3 py-2.5 rounded-sm border border-border bg-card text-[16px] text-foreground placeholder:text-muted outline-none transition-colors duration-200 hover:border-primary-hover focus:border-primary"
      />
    </div>
  );
};

export default Input;
