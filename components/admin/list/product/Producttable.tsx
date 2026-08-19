"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useQuery } from "@tanstack/react-query";

import { useEffect, useMemo, useRef, useState } from "react";

import { IProducts } from "@/types/products.types";
import { getAllProducts } from "@/api/allproduct.api";

import Table from "@/components/admin/list/table";
import Action from "../action";
import EditableInput from "../editableinput";

const ProductTable = () => {
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllProducts,
    queryKey: ["get-all-products"],
  });

  const [products, setProducts] = useState<IProducts[]>([]);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const editedProductRef = useRef<IProducts | null>(null);

  useEffect(() => {
    if (data?.data) {
      setProducts(data.data);
    }
  }, [data]);

  const handleEdit = (product: IProducts) => {
    setEditingProductId(product._id);

    editedProductRef.current = {
      ...product,
    };
  };

  const handleSave = () => {
    const editedProduct = editedProductRef.current;

    if (!editedProduct) return;

    setProducts((prev) =>
      prev.map((product) =>
        product._id === editedProduct._id ? editedProduct : product,
      ),
    );

    editedProductRef.current = null;
    setEditingProductId(null);
  };

  const handleCancel = () => {
    editedProductRef.current = null;
    setEditingProductId(null);
  };

  const handleDelete = (product: IProducts) => {
    setProducts((prev) => prev.filter((item) => item._id !== product._id));
  };

  const columns = useMemo<ColumnDef<IProducts>[]>(
    () => [
  
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
          const product = row.original;

          if (editingProductId === product._id) {
            return (
              <EditableInput
                value={product.name}
                onChange={(value) => {
                  if (editedProductRef.current) {
                    editedProductRef.current.name = String(value);
                  }
                }}
              />
            );
          }

          return product.name;
        },
      },

      {
        accessorKey: "price",
        header: "Price",

        cell: ({ row }) => {
          const product = row.original;

          if (editingProductId === product._id) {
            return (
              <EditableInput
                value={product.price}
                type="number"
                onChange={(value) => {
                  if (editedProductRef.current) {
                    editedProductRef.current.price = Number(value);
                  }
                }}
              />
            );
          }

          return `Rs. ${product.price}`;
        },
      },


      {
        accessorKey: "description",
        header: "Description",

        cell: ({ row }) => {
          const product = row.original;

          if (editingProductId === product._id) {
            return (
              <EditableInput
                value={product.description}
                onChange={(value) => {
                  if (editedProductRef.current) {
                    editedProductRef.current.description = String(value);
                  }
                }}
              />
            );
          }

          return product.description;
        },
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

      {
        id: "action",
        header: "Action",

        cell: ({ row }) => {
          const product = row.original;

          if (editingProductId === product._id) {
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
            <Action
              data={product}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          );
        },
      },
    ],
    [editingProductId],
  );


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
      <Table table={table} />
    </div>
  );
};

export default ProductTable;
