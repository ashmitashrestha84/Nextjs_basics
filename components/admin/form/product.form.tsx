"use client";

import { useEffect } from "react";
import { product, getProductById, updateProduct } from "@/api/allproduct.api";
import Button from "@/components/button";
import Input from "@/components/common/input";
import { productSchema, updateProductSchema } from "@/schemas/product.schemas";
import { TProduct } from "@/types/Aproduct.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormProps {
  productId?: string;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ProductForm = ({ productId, onSuccess, onCancel }: ProductFormProps) => {
  const queryClient = useQueryClient();

  const isEditMode = Boolean(productId);

  const { data, isLoading } = useQuery({
    queryKey: ["product", productId],

    queryFn: () => getProductById(productId as string),

    enabled: isEditMode,
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      name: "",
      price: 0,
      description: "",
      category: "",
      brand: "",
      new_arrival: false,
      is_featured: false,
    },

    resolver: isEditMode
      ? (yupResolver(updateProductSchema) as any)
      : (yupResolver(productSchema) as any),
  });


  useEffect(() => {
    if (!isEditMode || !data?.data) {
      return;
    }

    const productData = data.data;

    reset({
      name: productData.name,

      price: productData.price,

      description: productData.description,

      category: productData.category?._id ?? productData.category,

      brand: productData.brand?._id ?? productData.brand,

      new_arrival: productData.new_arrival,

      is_featured: productData.is_featured,
    });
  }, [data, isEditMode, reset]);


  const createMutation = useMutation({
    mutationFn: (formData: FormData) => product(formData),

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product created successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateProduct(id, data),

    onSuccess: (response) => {
      toast.success(response?.message ?? "Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-products"],
      });

      queryClient.invalidateQueries({
        queryKey: ["product", productId],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  const isPending = createMutation.isPending || updateMutation.isPending;

  const onSubmit: SubmitHandler<TProduct> = (data) => {
    const formData = new FormData();

    formData.append("name", data.name);

    formData.append("price", String(data.price));

    formData.append("description", data.description);

    formData.append("category", data.category);

    formData.append("brand", data.brand);

    formData.append("is_featured", String(data.is_featured));

    formData.append("new_arrival", String(data.new_arrival));

    if (data.product_image && data.product_image.length > 0) {
      formData.append("product_image", data.product_image[0]);
    }

    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((image) => {
        formData.append("images", image);
      });
    }

    if (!isEditMode) {
      createMutation.mutate(formData);

      return;
    }


    updateMutation.mutate({
      id: productId as string,
      data: formData,
    });
  };


  if (isEditMode && isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading product...</p>
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
        label="Product Name"
        placeholder="Enter product name"
        type="text"
        name="name"
        id="name"
        register={register}
        required
        error={errors.name?.message}
      />

      <Input
        label="Price"
        placeholder="Enter product price"
        type="number"
        name="price"
        id="price"
        register={register}
        required
        error={errors.price?.message}
      />
      <Input
        label="Description"
        placeholder="Enter product description"
        type="text"
        name="description"
        id="description"
        register={register}
        required
        error={errors.description?.message}
      />

      <Input
        label="Main Image"
        type="file"
        name="product_image"
        id="product_image"
        register={register}
        required={!isEditMode}
        error={errors.product_image?.message}
      />

      {isEditMode && (
        <p className="text-xs text-gray-400">
          Leave empty to keep the existing main image.
        </p>
      )}

      <Input
        label="Category"
        placeholder="Enter category id"
        type="text"
        name="category"
        id="category"
        register={register}
        required
        error={errors.category?.message}
      />

      <Input
        label="Brand"
        placeholder="Enter brand id"
        type="text"
        name="brand"
        id="brand"
        register={register}
        required
        error={errors.brand?.message}
      />

      <Input
        label="Images"
        type="file"
        name="images"
        id="images"
        multiple
        register={register}
        required={!isEditMode}
        error={errors.images?.message}
      />

      {isEditMode && (
        <p className="text-xs text-gray-400">
          Select new images to add more product images.
        </p>
      )}

      <Input
        label="New Arrivals"
        type="text"
        name="new_arrival"
        id="new_arrival"
        register={register}
        error={errors.new_arrival?.message}
      />

      <Input
        label="Is Featured"
        type="text"
        name="is_featured"
        id="is_featured"
        register={register}
        error={errors.is_featured?.message}
      />

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

export default ProductForm;
