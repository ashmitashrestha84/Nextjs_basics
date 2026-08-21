"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "@/components/common/input";
import Button from "@/components/button";
import { FiX } from "react-icons/fi";
import { updateProduct } from "@/api/allproduct.api";
import { IProducts } from "@/types/products.types";
import { TUpdateProduct } from "@/types/Aproduct.types";
import { updateProductSchema } from "@/schemas/product.schemas";

interface UpdateProductFormProps {
  product: IProducts;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UpdateProductForm = ({
  product: selectedProduct,
  onSuccess,
  onCancel,
}: UpdateProductFormProps) => {
  const queryClient = useQueryClient();
  const [existingImages, setExistingImages] = useState(
    selectedProduct.images ?? [],
  );

  const handleRemoveImage = (publicId: string) => {
    setExistingImages((prev) =>
      prev.filter((image) => image.public_id !== publicId),
    );
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TUpdateProduct>({
    defaultValues: {
      name: selectedProduct.name ?? "",
      price: selectedProduct.price ?? 0,
      description: selectedProduct.description ?? "",
      category: selectedProduct.category?._id ?? "",
      brand: selectedProduct.brand?._id ?? "",
      is_featured: selectedProduct.is_featured ?? false,
      new_arrival: selectedProduct.new_arrival ?? false,
    },

    resolver: yupResolver(updateProductSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      if (!selectedProduct?._id) {
        throw new Error("Product not selected");
      }

      return updateProduct(selectedProduct._id, formData);
    },

    onSuccess: (data) => {
      toast.success(data?.message ?? "Product updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-product"],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      console.log(error);

      toast.error(error?.message ?? "Product update failed");
    },
  });

  const onSubmit = (data: TUpdateProduct) => {
    const formData = new FormData();

    if (data.name) {
      formData.append("name", data.name);
    }

    if (data.price !== undefined && data.price !== null) {
      formData.append("price", String(data.price));
    }

    if (data.description) {
      formData.append("description", data.description);
    }

    if (data.category) {
      formData.append("category", data.category);
    }

    if (data.brand) {
      formData.append("brand", data.brand);
    }

    if (data.is_featured !== undefined) {
      formData.append("is_featured", String(data.is_featured));
    }

    if (data.new_arrival !== undefined) {
      formData.append("new_arrival", String(data.new_arrival));
    }

    if (data.product_image?.length) {
      formData.append("product_image", data.product_image[0]);
    }

    if (data.images?.length) {
      for (const image of data.images) {
        formData.append("images", image);
      }
    }

    const deletedImages = (selectedProduct.images ?? []).filter(
      (oldImage) =>
        !existingImages.some(
          (currentImage) => currentImage.public_id === oldImage.public_id,
        ),
    );

    deletedImages.forEach((image) => {
      formData.append("deleted_images", image.public_id);
    });

    mutate(formData);
  };

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
        error={errors.name?.message}
      />

      <Input
        label="Price"
        placeholder="Enter product price"
        type="text"
        name="price"
        id="price"
        register={register}
        error={errors.price?.message}
      />

      <Input
        label="Description"
        placeholder="Enter product description"
        type="text"
        name="description"
        id="description"
        register={register}
        error={errors.description?.message}
      />

      {selectedProduct.product_image?.path && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Current Main Image
          </p>

          <div className="relative h-32 w-32">
            <img
              src={selectedProduct.product_image.path}
              alt={selectedProduct.name}
              className="h-full w-full rounded-md object-cover"
            />
          </div>
        </div>
      )}

      <Input
        label="Change Main Image (optional)"
        type="file"
        name="product_image"
        id="product_image"
        register={register}
        error={errors.product_image?.message}
      />

      <Input
        label="Category"
        placeholder="Enter category id"
        type="text"
        name="category"
        id="category"
        register={register}
        error={errors.category?.message}
      />

      <Input
        label="Brand"
        placeholder="Enter brand id"
        type="text"
        name="brand"
        id="brand"
        register={register}
        error={errors.brand?.message}
      />

      {existingImages.length > 0 && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Current Images
          </p>

          <div className="flex flex-wrap gap-3">
            {existingImages.map((image) => (
              <div key={image.public_id} className="relative h-24 w-24">
                <img
                  src={image.path}
                  alt="Product image"
                  className="h-full w-full rounded-md object-cover"
                />

                <button
                  type="button"
                  onClick={() => handleRemoveImage(image.public_id)}
                  className="absolute right-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 text-white hover:bg-red-600"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <Input
        label="Add More Images (optional)"
        type="file"
        name="images"
        id="images"
        multiple
        register={register}
        error={errors.images?.message}
      />

      <Input
        label="New Arrival"
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

        <Button label={isPending ? "Updating..." : "Update"} type="submit" />
      </div>
    </form>
  );
};

export default UpdateProductForm;
