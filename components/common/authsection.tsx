"use client";

import { AuthContext } from "@/context/auth.context.api";
import { useContext, useState } from "react";
import { FiLogOut, FiUser, FiX } from "react-icons/fi";

const Authsection = () => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const { user, isLoading, logout } = useContext(AuthContext);

  if (isLoading) {
    return <div className="h-9 w-24 animate-pulse rounded-lg bg-green-900" />;
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <div className="relative">
        <button
          onClick={() => setShowUserMenu((prev) => !prev)}
          className="flex items-center gap-2"
        >
          {user.profile_image?.path ? (
            <div className="h-9 w-9 overflow-hidden rounded-2xl bg-gray-100">
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

            <button
              type="button"
              onClick={() => {
                setShowUserMenu(false);
                setShowLogoutModal(true);
              }}
              className="w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
            >
              <FiLogOut className="mr-2 inline" />
              Logout
            </button>
          </div>
        )}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/50">
          <div className="relative w-80 rounded-xl bg-white p-6 text-center shadow-xl">
            <button
              onClick={() => setShowLogoutModal(false)}
              className="absolute right-4 top-4 text-gray-500"
            >
              <FiX />
            </button>

            <FiLogOut className="mx-auto mb-3 text-3xl text-red-600" />

            <h2 className="text-lg font-semibold text-gray-800">
              Do you want to logout?
            </h2>

            <p className="mt-2 text-sm text-gray-500">
              Are you sure you want to logout?
            </p>

            <div className="mt-5 flex gap-3">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="w-full rounded-lg border px-4 py-2"
              >
                No
              </button>

              <button
                onClick={logout}
                className="w-full rounded-lg bg-red-600 px-4 py-2 text-white"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Authsection;
