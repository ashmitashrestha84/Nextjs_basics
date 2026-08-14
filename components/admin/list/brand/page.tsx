"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";
import { IBrand } from "@/types/brand.types";
import { getAllBrands } from "@/api/brand.api";




interface BrandTableProps {
  isUpdateMode: boolean;
  onSelectBrand: (brand: IBrand) => void;
  selectedBrand: IBrand | null;
}

const BrandTable = ({
  isUpdateMode,
  onSelectBrand,
}: BrandTableProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["get-all-brand"],
  });

  const brand: IBrand[] = data?.data ?? [];

  const columns: ColumnDef<IBrand>[] = [
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
      header: "brand",
      cell: ({ row }) => {
        if (isUpdateMode) {
          return (
            <input
              type="text"
              defaultValue={row.original.name}
              className="w-full rounded border px-2 py-1"
              onChange={(e) => {
                onSelectBrand({
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
  data:brand,
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
      <table className="w-full">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="border-b bg-gray-50">
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-5 py-4 text-left text-sm font-semibold"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>

        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              onClick={() => {
                if (isUpdateMode) {
                  onSelectBrand(row.original);
                }
              }}
              className={`border-b hover:bg-gray-50 ${
                isUpdateMode ? "cursor-pointer" : ""
              }`}
            >
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id} className="px-5 py-4 text-sm">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BrandTable;
