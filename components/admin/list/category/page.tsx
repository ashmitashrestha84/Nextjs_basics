"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

import { getAllCategories } from "@/api/category.api";
import { ICategories } from "@/types/categories.types";

import Table from "@/components/admin/list/table";
import Action from "../action";
import EditableInput from "../editableinput";

const CategoryTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-category"],
  });

  const [categories, setCategories] = useState<ICategories[]>([]);

  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(
    null,
  );

  const editedCategoryRef = useRef<ICategories | null>(null);

  useEffect(() => {
    if (data?.data) {
      setCategories(data.data);
    }
  }, [data]);

  const handleEdit = (category: ICategories) => {
    setEditingCategoryId(category._id);

    editedCategoryRef.current = {
      ...category,
    };
  };

  const handleSave = () => {
    const editedCategory = editedCategoryRef.current;

    if (!editedCategory) return;

    setCategories((prev) =>
      prev.map((category) =>
        category._id === editedCategory._id ? editedCategory : category,
      ),
    );

    editedCategoryRef.current = null;
    setEditingCategoryId(null);
  };

  const handleCancel = () => {
    editedCategoryRef.current = null;
    setEditingCategoryId(null);
  };

  // Delete category
  const handleDelete = (category: ICategories) => {
    setCategories((prev) => prev.filter((item) => item._id !== category._id));
  };

  const columns: ColumnDef<ICategories>[] = [
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
      cell: ({ row }) => {
        const category = row.original;

        if (editingCategoryId === category._id) {
          return (
            <EditableInput
              value={category.name}
              onChange={(value) => {
                if (editedCategoryRef.current) {
                  editedCategoryRef.current.name = String(value);
                }
              }}
            />
          );
        }

        return category.name;
      },
    },

    {
      accessorKey: "description",
      header: "Description",
      cell: ({ row }) => {
        const category = row.original;

        if (editingCategoryId === category._id) {
          return (
            <EditableInput
              value={category.description}
              onChange={(value) => {
                if (editedCategoryRef.current) {
                  editedCategoryRef.current.description = String(value);
                }
              }}
            />
          );
        }

        return category.description;
      },
    },

    {
      id: "action",
      header: "Action",
      cell: ({ row }) => {
        const category = row.original;

        if (editingCategoryId === category._id) {
          return (
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleSave}
                className="rounded-md bg-green-700 px-3 py-1 text-sm text-white hover:bg-green-800"
              >
                ✓ Save
              </button>

              <button
                type="button"
                onClick={handleCancel}
                className="rounded-md bg-gray-500 px-3 py-1 text-sm text-white hover:bg-gray-600"
              >
                ✕ Cancel
              </button>
            </div>
          );
        }

        return (
          <Action data={category} onEdit={handleEdit} onDelete={handleDelete} />
        );
      },
    },
  ];

  const table = useReactTable({
    data: categories,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading category...</div>;
  }
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load category.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-white">
      <Table table={table} />
    </div>
  );
};

export default CategoryTable;
