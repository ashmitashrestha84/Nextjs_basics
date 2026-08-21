"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo, useState } from "react";

import toast from "react-hot-toast";

import { deleteCategories, getAllCategories } from "@/api/category.api";

import { ICategories } from "@/types/categories.types";

import Table from "@/components/admin/list/table";
import Action from "../action";

import DeleteModal from "../../modal/deletemodel";
import UpdateModal from "../../modal/updatemodel";
import CategoryForm from "../../form/category.form";

const CategoryTable = () => {
  const queryClient = useQueryClient();

  const [selectedCategory, setSelectedCategory] = useState<ICategories | null>(
    null,
  );

  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-category"],
    queryFn: getAllCategories,
  });
  console.log("CATEGORY DATA:", data);
  console.log("CATEGORY DATA.DATA:", data?.data);

  const categories: ICategories[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteCategories,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Category deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-category"],
      });

      setShowDeleteModal(false);
      setSelectedCategory(null);
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to delete category");
    },
  });

  const handleEdit = (category: ICategories) => {
    setSelectedCategory(category);
    setIsUpdateOpen(true);
  };

  const handleDelete = (category: ICategories) => {
    setSelectedCategory(category);
    setShowDeleteModal(true);
  };

  const columns = useMemo<ColumnDef<ICategories>[]>(
    () => [
      {
        id: "image",
        header: "Image",

        cell: ({ row }) => (
          <div className="h-16 w-16 overflow-hidden rounded-md">
            <img
              src={row.original.logo?.path}
              alt={row.original.name}
              className="h-full w-full object-cover"
            />
          </div>
        ),
      },

      {
        accessorKey: "name",
        header: "Category",
      },

      {
        accessorKey: "description",
        header: "Description",
      },

      {
        id: "action",
        header: "Action",

        cell: ({ row }) => {
          const category = row.original;

          return (
            <Action
              data={category}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ],
    [],
  );

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading categories...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load categories.
      </div>
    );
  }

  return (
    <>
      <div className="mt-6 overflow-x-auto rounded-lg bg-white">
        <Table table={table} />
      </div>

      <UpdateModal
        open={isUpdateOpen}
        title="Update Category"
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedCategory(null);
        }}
      >
        {selectedCategory && (
          <CategoryForm
            categoryId={selectedCategory._id}
            onSuccess={() => {
              setIsUpdateOpen(false);
              setSelectedCategory(null);
            }}
            onCancel={() => {
              setIsUpdateOpen(false);
              setSelectedCategory(null);
            }}
          />
        )}
      </UpdateModal>

      <DeleteModal
        open={showDeleteModal}
        name={selectedCategory?.name ?? ""}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedCategory(null);
        }}
        onConfirm={() => {
          if (!selectedCategory) return;

          deleteMutation.mutate(selectedCategory);
        }}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default CategoryTable;
