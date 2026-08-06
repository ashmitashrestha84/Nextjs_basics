interface IProps {
  label: string;
  type?: "button" | "submit" | "reset";
}

const Button = ({ label, type = "button" }: IProps) => {
  return (
    <button
      className="cursor-pointer rounded-sm w-full py-3 bg-primary text-white font-bold text-[18px] hover:bg-primary-hover active:bg-primary-active transition-all duration-300"
      type={type}
    >
      {label}
    </button>
  );
};

export default Button;
