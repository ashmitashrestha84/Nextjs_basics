"use client";

import { deleteProduct, getAllProducts } from "@/api/allproduct.api";
import { IProducts } from "@/types/products.types";
import Table from "@/components/admin/list/table";
import Action from "../action";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useMemo, useState } from "react";
import toast from "react-hot-toast";
import DeleteModal from "../../modal/deletemodel";
import UpdateModal from "../../modal/updatemodel";
import ProductForm from "../../form/product.form";
import UpdateProductForm from "../../update/productupdateform";

const ProductTable = () => {
  const queryClient = useQueryClient();

  const [selectedProduct, setSelectedProduct] = useState<IProducts | null>(
    null,
  );
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["get-all-products"],
    queryFn: getAllProducts,
  });

  const products: IProducts[] = data?.data ?? [];

  const deleteMutation = useMutation({
    mutationFn: deleteProduct,

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product deleted successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });

      setShowDeleteModal(false);
      setSelectedProduct(null);
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to delete product");
    },
  });

  const handleEdit = (product: IProducts) => {
    setSelectedProduct(product);
    setIsUpdateOpen(true);
  };

  const handleDelete = (product: IProducts) => {
    setSelectedProduct(product);
    setShowDeleteModal(true);
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
      },

      {
        accessorKey: "price",
        header: "Price",

        cell: ({ row }) => `Rs. ${row.original.price}`,
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

      {
        id: "action",
        header: "Action",

        cell: ({ row }) => {
          const product = row.original;

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
    [],
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
    <>
      <div className="mt-6 overflow-x-auto rounded-lg bg-white">
        <Table table={table} />
      </div>
      <UpdateModal
        open={isUpdateOpen}
        title="Update Product"
        onClose={() => {
          setIsUpdateOpen(false);
          setSelectedProduct(null);
        }}
      >
        {selectedProduct && (
          <UpdateProductForm
            product={selectedProduct}
            onSuccess={() => {
              setIsUpdateOpen(false);
              setSelectedProduct(null);
            }}
            onCancel={() => {
              setIsUpdateOpen(false);
              setSelectedProduct(null);
            }}
          />
        )}
      </UpdateModal>

      <DeleteModal
        open={showDeleteModal}
        name={selectedProduct?.name ?? ""}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedProduct(null);
        }}
        onConfirm={() => {
          if (!selectedProduct) return;

          deleteMutation.mutate(selectedProduct);
        }}
        isLoading={deleteMutation.isPending}
      />
    </>
  );
};

export default ProductTable;
