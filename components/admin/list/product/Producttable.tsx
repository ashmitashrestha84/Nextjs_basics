"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "@tanstack/react-query";

import { IProducts } from "@/types/products.types";
import { getAllProducts } from "@/api/allproduct.api";
import Table from "@/components/admin/list/table";

interface ProductTableProps {
  isUpdateMode: boolean;
  onSelectProduct: (product: IProducts) => void;
  selectedProduct: IProducts | null;
}

const ProductTable = ({ isUpdateMode, onSelectProduct }: ProductTableProps) => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get-all-products"],
  });

  const products: IProducts[] = data?.data ?? [];

  const columns: ColumnDef<IProducts>[] = [
    {
      id: "image",
      header: "Image",
      cell: ({ row }) => (
        <div className="h-16 w-16 overflow-hidden rounded-md">
          <img
            src={row.original.product_image?.path}
            alt={row.original.name}
            className="h-full w-full object-cover"
          />
        </div>
      ),
    },
    {
      accessorKey: "name",
      header: "Product",
      cell: ({ row }) => {
        if (isUpdateMode) {
          return (
            <input
              type="text"
              defaultValue={row.original.name}
              className="w-full rounded border px-2 py-1"
              onChange={(e) => {
                onSelectProduct({
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
      accessorKey: "price",
      header: "Price",
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      id: "category",
      header: "Category",
      accessorFn: (row) => row.category?.name,
    },
    {
      id: "brand",
      header: "Brand",
      accessorFn: (row) => row.brand?.name,
    },
    {
      accessorKey: "new_arrival",
      header: "New Arrivals",
    },
    {
      accessorKey: "is_featured",
      header: "Featured",
    },
  ];

  const table = useReactTable({
    data: products,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div className="p-6 text-center">Loading products...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-center text-red-500">
        Failed to load products.
      </div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-white">
      <Table
        table={table}
        isUpdateMode={isUpdateMode}
        onSelectRow={onSelectProduct}
      />
    </div>
  );
};

export default ProductTable;
