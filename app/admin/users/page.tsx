"use client"
import UserTable from "@/components/admin/list/user/page"
import RegisterForm from "@/components/client/form/register.form";
import { IUser } from "@/types/user.types";
import { useState } from "react";
import { FiEdit, FiPlus, FiTrash2, FiX } from "react-icons/fi";


const Userpage = () => {
   const [showCreateForm, setShowCreateForm] = useState(false);
  const [isUpdateMode, setIsUpdateMode] = useState(false);

  const [selectedUser, setSelectedUser] = useState<IUser | null>(
    null,
  );
  return (
    <main className="min-h-screen bg-primary-lighter p-5">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold text-primary">Products</h1>

          <p className="text-sm text-gray-500">Manage Your Products</p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowCreateForm(true)}
            className="flex items-center gap-2 rounded-lg bg-green-800 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-green-900"
          >
            <FiPlus size={18} />
            Create
          </button>
          {showCreateForm && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="absolute right-5 top-5 rounded-full p-2 text-gray-500 transition hover:bg-gray-100 hover:text-red-600"
                >
                  <FiX size={22} />
                </button>

                <div className="mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">
                    Create User Account
                  </h2>

                  <p className="mt-1 text-sm text-gray-500">
                    Please enter the User details
                  </p>
                </div>
                <RegisterForm />
              </div>
            </div>
          )}
          <button
            type="button"
            onClick={() => setIsUpdateMode(true)}
            className="flex items-center gap-2 rounded-lg border border-green-800 px-4 py-2.5 text-sm font-medium text-green-800 transition hover:bg-green-50"
          >
            <FiEdit size={17} />
            Update
          </button>
          {isUpdateMode && selectedUser && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
              <div className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-xl bg-white p-8 shadow-xl">
                <button
                  type="button"
                  onClick={() => {
                    setIsUpdateMode(false);
                    setSelectedUser(null);
                  }}
                  className="absolute right-5 top-5 rounded-full p-2 text-gray-500 hover:bg-gray-100 hover:text-red-600"
                >
                  <FiX size={22} />
                </button>
              </div>
            </div>
          )}
          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border  border-green-800 px-4 py-2.5 text-sm font-medium text-green-800 transition hover:bg-green-50"
          >
            <FiX size={17} />
            Clear
          </button>

          <button
            type="button"
            className="flex items-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-medium text-red-600 transition hover:bg-red-50"
          >
            <FiTrash2 size={17} />
            Delete
          </button>
        </div>
      </div>

      <UserTable
        isUpdateMode={isUpdateMode}
        onSelectUser={setSelectedUser}
        selectedUser={selectedUser}
      />
    </main>
  )
}

export default Userpage