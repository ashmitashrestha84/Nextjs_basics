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
import Table from "@/components/common/table";

interface BrandTableProps {
  isUpdateMode: boolean;
  onSelectBrand: (brand: IBrand) => void;
  selectedBrand: IBrand | null;
}

const BrandTable = ({ isUpdateMode, onSelectBrand }: BrandTableProps) => {
  const { data, isLoading, isError,} = useQuery({
    queryFn: getAllBrands,
    queryKey: ["get-all-brand"],
  });


  const brand: IBrand[] = data?.data?.brand ?? [];
  console.log(
  brand.map((brand) => ({
    name: brand.name,
    logo: brand.logo,
    path: brand.logo?.path,
  }))
);

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
      header: "Brand",
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
    data: brand,
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
      <Table table={table}
      isUpdateMode={isUpdateMode}
      onSelectRow={onSelectBrand}/>
    </div>
  );
};

export default BrandTable;
