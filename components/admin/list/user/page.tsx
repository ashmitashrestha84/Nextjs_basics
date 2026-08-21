"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { deleteUser, getAllUsers } from "@/api/user.api";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import { IUser } from "@/types/user.types";

import Table from "@/components/admin/list/table";
import Action from "../action";

import DeleteModal from "../../modal/deletemodel";
import UpdateModal from "../../modal/updatemodel";
import UserForm from "../../form/user.form";

const UserTable = () => {
  const queryClient = useQueryClient();

  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-user"],
    queryFn: getAllUsers,
  });

  console.log("USER DATA:", data);
  console.log("USER DATA.DATA:", data?.data);

  const users: IUser[] = data?.data ?? [];

  // Delete user
  const deleteMutation = useMutation({
    mutationFn: deleteUser,

    onSuccess: (response) => {
      toast.success(response?.message ?? "User deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-user"],
      });

      setShowDeleteModal(false);
      setSelectedUser(null);
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to delete user");
    },
  });

  // Edit user
  const handleEdit = (user: IUser) => {
    setSelectedUser(user);
    setIsUpdateOpen(true);
  };

  // Delete user
  const handleDelete = (user: IUser) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const columns = useMemo<ColumnDef<IUser>[]>(
    () => [
      {
        id: "image",

        header: "Image",

        cell: ({ row }) => (
          <div className="h-16 w-16 overflow-hidden rounded-md">
            <img
              src={row.original.profile_image?.path}
              alt={row.original.full_name}
              className="h-full w-full object-cover"
            />
          </div>
        ),
      },

      {
        accessorKey: "full_name",

        header: "Name",
      },

      {
        accessorKey: "email",

        header: "Email",
      },

      {
        accessorKey: "role",

        header: "Role",
      },

      {
        id: "action",

        header: "Action",

        cell: ({ row }) => {
          const user = row.original;

          return (
            <Action data={user} onEdit={handleEdit} onDelete={handleDelete} />
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: users,

    columns,

    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading users...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">Failed to load users.</div>
    );
  }

  return (
    <>
      {/* Table */}

      <div className="mt-6 overflow-x-auto rounded-lg bg-white">
        <Table table={table} />
      </div>

      {/* Update Modal */}

      <UpdateModal
        open={isUpdateOpen}
        title="Update User"
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedUser(null);
        }}
      >
        {selectedUser && (
          <UserForm
            user={selectedUser}
            onSuccess={() => {
              setIsUpdateOpen(false);
              setSelectedUser(null);
            }}
            onCancel={() => {
              setIsUpdateOpen(false);
              setSelectedUser(null);
            }}
          />
        )}
      </UpdateModal>

      {/* Delete Modal */}

      <DeleteModal
        open={showDeleteModal}
        name={selectedUser?.full_name ?? ""}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedUser(null);
        }}
        onConfirm={() => {
          if (!selectedUser) return;

          deleteMutation.mutate(selectedUser);
        }}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default UserTable;
