"use client";

import { useEffect } from "react";

import { brand, getBrandById, updateBrand } from "@/api/brand.api";

import Button from "@/components/button";
import Input from "@/components/common/input";

import { BrandSchema, UpdateBrandSchema } from "@/schemas/brand.schemas";

import { TBrand } from "@/types/Abrand.types";

import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

interface BrandFormProps {
  brandId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BrandForm = ({ brandId, onSuccess, onCancel }: BrandFormProps) => {
  const queryClient = useQueryClient();

  const isEditMode = !!brandId;

  // Get brand for update
  const { data, isLoading } = useQuery({
    queryKey: ["brand", brandId],

    queryFn: () => getBrandById(brandId!),

    enabled: isEditMode,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TBrand>({
    defaultValues: {
      name: "",
      description: "",
    },

    resolver: isEditMode
      ? (yupResolver(UpdateBrandSchema) as any)
      : (yupResolver(BrandSchema) as any),
  });

  // Put existing brand data into form
  useEffect(() => {
    if (!isEditMode || !data?.data) {
      return;
    }

    const brandData = data.data;

    reset({
      name: brandData.brand_name,
      description: brandData.description,
    });
  }, [data, isEditMode, reset]);

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (formData: FormData) => brand(formData),

    onSuccess: (response) => {
      toast.success(response?.message ?? "Brand created successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-brand"],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  // Update mutation
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateBrand(id, data),

    onSuccess: (response) => {
      toast.success(response?.message ?? "Brand updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-brand"],
      });

      queryClient.invalidateQueries({
        queryKey: ["brand", brandId],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  // Submit
  const onSubmit = (data: TBrand) => {
    const formData = new FormData();

    formData.append("brand_name", data.name);

    formData.append("description", data.description);

    // Logo
    if (data.logo && data.logo.length > 0) {
      formData.append("logo", data.logo[0]);
    }

    // Create
    if (!brandId) {
      createMutation.mutate(formData);

      return;
    }

    // Update
    updateMutation.mutate({
      id: brandId,
      data: formData,
    });
  };

  // Loading update data
  if (isEditMode && isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading brand...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      {/* Brand Name */}

      <Input
        label="Brand Name"
        placeholder="Enter brand name"
        type="text"
        name="brand_name"
        id="brand_name"
        register={register}
        required
        error={errors.name?.message}
      />

      {/* Description */}

      <Input
        label="Description"
        placeholder="Enter brand description"
        type="text"
        name="description"
        id="description"
        register={register}
        required
        error={errors.description?.message}
      />

      {/* Logo */}

      <Input
        label="Logo"
        type="file"
        name="logo"
        id="logo"
        register={register}
        error={errors.logo?.message}
      />

      {isEditMode && (
        <p className="text-xs text-gray-400">
          Leave empty to keep the existing logo.
        </p>
      )}

      {/* Buttons */}

      <div className="flex gap-3">
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="w-full rounded-md border px-4 py-2"
          >
            Cancel
          </button>
        )}

        <Button
          label={
            isPending
              ? isEditMode
                ? "Updating..."
                : "Creating..."
              : isEditMode
                ? "Update"
                : "Create"
          }
          type="submit"
        />
      </div>
    </form>
  );
};

export default BrandForm;
