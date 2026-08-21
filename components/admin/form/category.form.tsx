"use client";

import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import Input from "@/components/common/input";
import Button from "@/components/button";
import { TCategory } from "@/types/Acategory.types";
import {
  categorySchema,
  UpdateCategorySchema,
} from "@/schemas/category.schemas";
import {
  category,
  getCategoryById,
  updateCategories,
} from "@/api/category.api";

interface CategoryFormProps {
  categoryId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const CategoryForm = ({
  categoryId,
  onSuccess,
  onCancel,
}: CategoryFormProps) => {
  const queryClient = useQueryClient();
  const isEditMode = Boolean(categoryId);

  const { data, isLoading } = useQuery({
    queryKey: ["category", categoryId],

    queryFn: () => getCategoryById(categoryId as string),

    enabled: isEditMode,
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TCategory>({
    defaultValues: {
      name: "",
      description: "",
    },

    resolver: isEditMode
      ? (yupResolver(UpdateCategorySchema) as any)
      : (yupResolver(categorySchema) as any),
  });

  useEffect(() => {
    if (!isEditMode || !data?.data) {
      return;
    }

    const categoryData = data.data;

    reset({
      name: categoryData.name,
      description: categoryData.description,
    });
  }, [data, isEditMode, reset]);

  const createMutation = useMutation({
    mutationFn: (formData: FormData) => category(formData),
    onSuccess: (response) => {
      toast.success(response?.message ?? "Category created successfully");
      queryClient.invalidateQueries({
        queryKey: ["get-all-category"],
      });
      onSuccess?.();
    },
    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateCategories(id, data),

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-category"],
      });

      queryClient.invalidateQueries({
        queryKey: ["category", categoryId],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit: SubmitHandler<TCategory> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.logo && data.logo.length > 0) {
      formData.append("product_image", data.logo[0]);
    }

    if (!isEditMode) {
      createMutation.mutate(formData);

      return;
    }

    updateMutation.mutate({
      id: categoryId as string,
      data: formData,
    });
  };

  if (isEditMode && isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading category...</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="flex flex-col gap-3"
    >
      <Input
        label="Category Name"
        placeholder="Enter category name"
        type="text"
        name="name"
        id="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Description"
        placeholder="Enter category description"
        type="text"
        name="description"
        id="description"
        register={register}
        error={errors.description?.message}
      />

      <Input
        label="Logo"
        placeholder=""
        type="file"
        name="logo"
        id="logo"
        register={register}
        error={errors.logo?.message}
      />
      {isEditMode && (
        <p className="text-xs text-gray-400">
          {" "}
          Leave empty to keep the existing main image.
        </p>
      )}

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

export default CategoryForm;
