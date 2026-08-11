import { AiOutlineBell, AiOutlineMenu } from "react-icons/ai";
import { FiArrowLeft } from "react-icons/fi";

const Header = () => {
  return (
    <header className="flex h-20 w-full items-center justify-between border-b border-[#e1e7e1] bg-white px-8">
      <div className="flex items-center gap-8">
        <button
          type="button"
          className="cursor-pointer text-green-800 hover:text-green-700"
        >
          <AiOutlineMenu size={28} />
        </button>

        <div className="flex items-center gap-2 text-[18px]">
          <span className="text-green-800">Admin</span>
          <span className="text-green-800">/Dashboard</span>
        </div>
      </div>

      <div className="flex items-center gap-7">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="h-14 w-full rounded-2xl border border-gray-300 bg-gray-100 px-5 text-[17px] outline-none placeholder:text-gray-500 focus:border-emerald-600"
          />
        </div>

        <button
          type="button"
          className="relative cursor-pointer text-green-800 hover:text-green-600"
        >
          <AiOutlineBell size={28} />

          <span className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-orange-200" />
        </button>

        <button
          type="button"
          className="flex h-12 items-center gap-2 rounded-xl border border-gray-300 bg-white px-5 text-[16px] text-green-800 hover:bg-white"
        >
          <FiArrowLeft size={17} />
          <span>Store</span>
        </button>

        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-300 text-lg font-semibold text-white">
          A
        </div>
      </div>
    </header>
  );
};

export default Header;
