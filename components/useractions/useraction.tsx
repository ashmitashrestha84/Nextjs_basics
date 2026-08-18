"use client";

import Link from "next/link";
import { useState } from "react";
import {
  FiHeart,
  FiShoppingCart,
  FiUser,
  FiLogIn,
  FiX,
  FiLogOut,
} from "react-icons/fi";

import LoginForm from "../client/form/login.form";
import RegisterForm from "../client/form/register.form";

const UserActions = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isSignUp, setIsSignedup] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <>
      {/* ================= USER ACTIONS ================= */}

      <div className="flex items-center gap-6">
        {isLoggedIn ? (
          <>
            {/* Wishlist */}
            <Link href="/wishlist">
              <FiHeart className="text-xl text-gray-300 transition hover:text-white" />
            </Link>

            {/* Cart */}
            <Link href="/carts">
              <FiShoppingCart className="text-xl text-gray-300 transition hover:text-white" />
            </Link>

            {/* User */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-green-700">
                  <FiUser className="text-lg text-white" />
                </div>

                <span className="text-sm text-white">Ashmita</span>
              </button>

              {/* User Dropdown */}
              {showUserMenu && (
                <div className="absolute right-0 top-12 z-50 w-48 rounded-xl bg-white p-3 shadow-xl">
                  <div className="border-b px-3 pb-3">
                    <p className="font-semibold text-green-950">Ashmita</p>

                    <p className="text-xs text-gray-500">My Account</p>
                  </div>

                  <Link
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
                  </Link>

                  <button
                    onClick={() => {
                      setIsLoggedIn(false);
                      setShowUserMenu(false);
                    }}
                    className="w-full rounded-lg px-3 py-3 text-left text-sm text-red-600 hover:bg-red-50"
                  >
                    <FiLogOut className="mr-2 inline" />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </>
        ) : (
          /* Sign In */
          <button
            onClick={() => {
              setIsSignedup(false);
              setShowLogin(true);
            }}
            className="flex items-center gap-2 rounded-2xl bg-green-800 px-4 py-2 text-sm text-white transition hover:bg-green-700"
          >
            <FiLogIn />
            <span>Sign In</span>
          </button>
        )}
      </div>

      {/* ================= AUTH MODAL ================= */}

      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50">
          <div className="relative w-[420px] rounded-xl bg-white p-6 shadow-xl">
            {/* Close */}
            <button
              onClick={() => setShowLogin(false)}
              className="absolute right-4 top-4"
            >
              <FiX className="text-xl text-gray-600 hover:text-black" />
            </button>

            {isSignUp ? (
              /* ================= REGISTER ================= */

              <>
                <h2 className="mb-6 mt-4 text-center text-2xl font-semibold text-green-950">
                  Create Account
                </h2>

                <RegisterForm
                  onSignupSuccess={() => {
                    setIsSignedup(false);
                  }}
                />

                <p className="mt-5 text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignedup(false)}
                    className="font-semibold text-green-800 hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              </>
            ) : (
              /* ================= LOGIN ================= */

              <>
                <h2 className="mb-6 mt-4 text-center text-2xl font-semibold text-green-950">
                  Welcome Back
                </h2>

                <LoginForm
                  onLoginSuccess={() => {
                    setIsLoggedIn(true);
                    setShowLogin(false);
                  }}
                />

                <p className="mt-5 text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <button
                    type="button"
                    onClick={() => setIsSignedup(true)}
                    className="font-semibold text-green-800 hover:underline"
                  >
                    Sign Up
                  </button>
                </p>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default UserActions;
