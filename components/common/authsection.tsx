"use client";

import { AuthContext } from "@/context/auth.context.api";

import { useContext, useState } from "react";
import { FiLogOut, FiUser } from "react-icons/fi";

const Authsection = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);

  const { user, isLoading, logout } = useContext(AuthContext);

  if (isLoading) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-green-900" />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="relative">
      <button
        onClick={() => setShowUserMenu((prev) => !prev)}
        className="flex items-center gap-2"
      >
        {user.profile_image?.path ? (
          <div className="h-9 w-9 rounded-2xl overflow-hidden bg-gray-100 flex items-center justify-center object-contain">
            <img
              src={user.profile_image.path}
              alt={user.full_name}
              className="h-full w-full object-contain"
            />
          </div>
        ) : (
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700">
            <FiUser className="text-lg text-white" />
          </div>
        )}

        <span className="text-sm text-white">{user.full_name}</span>
      </button>

      {showUserMenu && (
        <div className="absolute right-0 top-12 z-50 w-52 rounded-xl bg-white p-3 shadow-xl">
          <div className="border-b px-3 pb-3">
            <p className="font-semibold text-green-950">{user.full_name}</p>

            <p className="truncate text-xs text-gray-500">{user.email}</p>
          </div>

          {/* <Link
            href="/profile"
            onClick={() => setShowUserMenu(false)}
            className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50"
          >
            <FiUser className="mr-2 inline" />
            My Profile
          </Link>

          <Link
            href="/orders"
            onClick={() => setShowUserMenu(false)}
            className="block rounded-lg px-3 py-3 text-sm text-gray-700 hover:bg-green-50"
          >
            My Orders
          </Link> */}

          <button
            type="button"
            onClick={logout}
            className="w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
          >
            <FiLogOut className="mr-2 inline" />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Authsection;
