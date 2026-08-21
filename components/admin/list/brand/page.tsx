"use client";

import {
  ColumnDef,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { IBrand } from "@/types/brand.types";
import { deleteBrand, getAllBrands } from "@/api/brand.api";
import Table from "@/components/admin/list/table";
import Action from "../action";
import { useState } from "react";
import toast from "react-hot-toast";
import { set } from "react-hook-form";
import UpdateModal from "../../modal/updatemodel";
import BrandForm from "../../form/brand.form";
import DeleteModal from "../../modal/deletemodel";

const BrandTable = () => {
  const queryClient = useQueryClient();
  const [selectedBrand, setSelectedBrand] = useState<IBrand | null>(null);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const { data, isLoading, isError } = useQuery({
    queryFn: getAllBrands,
    queryKey: ["get-all-brand"],
  });

  const brand: IBrand[] = data?.data?.brand ?? [];
  const deleteMutation = useMutation({
    mutationFn: deleteBrand,
    onSuccess: (response) => {
      toast.success(response?.message ?? "Brand deleted Succeddfully");
      queryClient.invalidateQueries({
        queryKey: ["get-all-brands"],
      });
      setShowDeleteModal(false);
      setSelectedBrand(null);
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to delete brand");
    },
  });
  const handleEdit = (brand: IBrand) => {
    setSelectedBrand(brand);
    setIsUpdateOpen(true);
  };

  const handleDelete = (brand: IBrand) => {
    setSelectedBrand(brand);
    setShowDeleteModal(true);
  };

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
    },
    {
      accessorKey: "description",
      header: "Description",
    },
    {
      accessorKey: "action",
      header: "Action",
      cell: ({ row }) => {
        const brand = row.original;
        return (
          <Action data={brand} onEdit={handleEdit} onDelete={handleDelete} />
        );
      },
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
      <div className="p-6 text-center text-red-500">Failed to load Brand.</div>
    );
  }

  return (
    <div className="mt-6 overflow-x-auto rounded-lg bg-white">
      <Table table={table} />
      <UpdateModal
        open={isUpdateOpen}
        title="Update Brand"
        onClose={() => {
          setIsUpdateOpen(false);
        }}
      >
        {selectedBrand && (
          <BrandForm
          />
        )}
      </UpdateModal>
      <DeleteModal
        open={showDeleteModal}
        name={selectedBrand?.name ?? ""}
        onClose={() => {
          setShowDeleteModal(false);
          setSelectedBrand(null);
        }}
        onConfirm={() => {
          if (!selectedBrand) return;

          deleteMutation.mutate(selectedBrand);
        }}
        isLoading={deleteMutation.isPending}
      />
    </div>
  );
};

export default BrandTable;
