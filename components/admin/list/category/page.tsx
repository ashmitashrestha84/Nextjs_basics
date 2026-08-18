"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { getAllCategories } from "@/api/category.api";
import { ICategories } from "@/types/categories.types";
import Table from "@/components/admin/list/table";

interface CategoryTableProps {
  isUpdateMode: boolean;
  onSelectCategory: (product: ICategories) => void;
  selectedCategory: ICategories | null;
}

const CategoryTable = ({
  isUpdateMode,
  onSelectCategory,
}: CategoryTableProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllCategories,
    queryKey: ["get-all-category"],
  });

  const categories: ICategories[] = data?.data ?? [];

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
        if (isUpdateMode) {
          return (
            <input
              type="text"
              defaultValue={row.original.name}
              className="w-full rounded border px-2 py-1"
              onChange={(e) => {
                onSelectCategory({
                  ...row.original,
                  name: e.target.value,
                });
              }}
            />
          );
        }

        return row.original.name;
      },
    },
    {
      accessorKey: "description",
      header: "Description",
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
      <Table
        table={table}
        isUpdateMode={isUpdateMode}
        onSelectRow={onSelectCategory}
      />
    </div>
  );
};

export default CategoryTable;
