import Link from "next/link";
import {
  AiOutlineHome,
  AiOutlineLogout,
  AiOutlineMenuUnfold,
} from "react-icons/ai";
import { LuCuboid, LuUser } from "react-icons/lu";
import { CiShoppingTag } from "react-icons/ci";

const Sidebar = () => {
  return (
    <main className="flex h-full w-full shrink-0 flex-col bg-green-950 text-white ">
      
      {/* Logo */}
      <div className="flex items-center gap-3 border-b border-black px-4 py-3">
        <div className="flex h-10 w-9 items-center justify-center rounded-xl bg-green-800 text-2xl">
          <h1>V</h1>
        </div>

        <h1 className="text-base font-semibold">
          Botaniva Admin
        </h1>
      </div>

      {/* Navigation */}
      <nav className="mt-10 flex flex-col gap-4 px-4">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-green-800"
        >
          <AiOutlineHome size={20} />
          <span>Dashboard</span>
        </Link>

        <Link
          href="/admin/product"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-green-800"
        >
          <LuCuboid size={20} />
          <span>Products</span>
        </Link>

        <Link
          href="/admin/brands"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-green-800"
        >
          <CiShoppingTag size={20} />
          <span>Brands</span>
        </Link>

        <Link
          href="/admin/categories"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-green-800"
        >
          <AiOutlineMenuUnfold size={20} />
          <span>Categories</span>
        </Link>

        <Link
          href="/admin/users"
          className="flex items-center gap-3 rounded-2xl px-4 py-3 hover:bg-green-800"
        >
          <LuUser size={20} />
          <span>Users</span>
        </Link>
      </nav>

      <div className="mt-auto flex w-full items-center justify-baseline border-t border-black px-1 pt-4 pb-4">
    
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-300 text-lg font-medium">
            A
          </div>

          <div>
            <p className="text-base font-normal">
              Admin User
            </p>

            <p className="text-sm text-green-400">
              admin@botaniva.co
            </p>
          </div>
        </div>

        <button
          type="button"
          className="cursor-pointer text-white hover:text-green-400"
        >
          <AiOutlineLogout size={22} />
        </button>

      </div>
    </main>
  );
};

export default Sidebar;