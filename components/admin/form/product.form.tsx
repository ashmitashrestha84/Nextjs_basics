"use client";

import { product, updateProduct } from "@/api/allproduct.api";
import Button from "@/components/button";
import Input from "@/components/common/input";
import { productSchema } from "@/schemas/product.schemas";
import { TProduct } from "@/types/Aproduct.types";
import { IProducts } from "@/types/products.types";

import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ProductFormProps {
  product?: IProducts;
  mode?: "create" | "update";
  onSuccess?: () => void;
  onCancel?: () => void;
}

const ProductForm = ({
  product: selectedProduct,
  mode = "create",
  onSuccess,
  onCancel,
}: ProductFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      name: selectedProduct?.name ?? "",
      price: selectedProduct?.price ?? 0,
      description: selectedProduct?.description ?? "",
      category: selectedProduct?.category?._id ?? "",
      brand: selectedProduct?.brand?._id ?? "",
      is_featured: selectedProduct?.is_featured ?? false,
      new_arrival: selectedProduct?.new_arrival ?? false,
    },
    resolver: yupResolver(productSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      if (mode === "update") {
        if (!selectedProduct?._id) {
          throw new Error("Product not selected");
        }

        return updateProduct(selectedProduct._id, formData);
      }
      return product(formData);
    },

    onSuccess: (data) => {
      toast.success(
        data?.message ??
          (mode === "update"
            ? "Product updated successfully"
            : "Product created successfully"),
      );

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Something went wrong");
    },
  });

  const onSubmit = (data: TProduct) => {
    const formData = new FormData();
    if (mode === "create") {
      formData.append("name", data.name);
      formData.append("price", String(data.price));
      formData.append("description", data.description);
      formData.append("category", data.category);
      formData.append("brand", data.brand);
      formData.append("is_featured", String(data.is_featured));
      formData.append("new_arrival", String(data.new_arrival));

      if (data.product_image?.length) {
        formData.append("product_image", data.product_image[0]);
      }

      if (data.images?.length) {
        for (const image of data.images) {
          formData.append("images", image);
        }
      }
    }

if (mode === "update") {
  formData.append("name", data.name);
  formData.append("price", String(data.price));
  formData.append("description", data.description);
  formData.append("category", data.category);
  formData.append("brand", data.brand);
  formData.append("is_featured", String(data.is_featured));
  formData.append("new_arrival", String(data.new_arrival));

  if (data.product_image?.length) {
    formData.append("product_image", data.product_image[0]);
  }

  if (data.images?.length) {
    for (const image of data.images) {
      formData.append("images", image);
    }
  }
}

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

      {mode === "update" && selectedProduct?.product_image?.path && (
        <div>
          <p className="mb-2 text-sm font-medium text-gray-700">
            Current Main Image
          </p>

          <img
            src={selectedProduct.product_image.path}
            alt={selectedProduct.name}
            className="h-32 w-32 rounded-md object-cover"
          />
        </div>
      )}

      <Input
        label={
          mode === "update" ? "Change Main Image (optional)" : "Main Image"
        }
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

      {mode === "update" &&
        selectedProduct?.images &&
        selectedProduct.images.length > 0 && (
          <div>
            <p className="mb-2 text-sm font-medium">Current Images</p>

            <div className="flex flex-wrap gap-3">
              {selectedProduct.images.map((image) => (
                <img
                  key={image.public_id}
                  src={image.path}
                  alt="Product image"
                  className="h-24 w-24 rounded-md object-cover"
                />
              ))}
            </div>
          </div>
        )}

      <Input
        label={mode === "update" ? "Add More Images (optional)" : "Images"}
        type="file"
        name="images"
        id="images"
        multiple
        register={register}
        error={errors.images?.message}
      />

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
              ? mode === "update"
                ? "Updating..."
                : "Creating..."
              : mode === "update"
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
