"use client";

import { useForm } from "react-hook-form";
import { TBrand } from "@/types/Abrand.types";
import { BrandSchema } from "@/schemas/brand.schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import Input from "@/components/common/input";
import Button from "@/components/button";

import { brand } from "@/api/brand.api";

interface BrandFormProps {
  onSuccess?: () => void;
  onCancel?: () => void;
}

const BrandForm = ({ onSuccess, onCancel }: BrandFormProps) => {
  const queryClient = useQueryClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TBrand>({
    defaultValues: {
      name: "",
      description: "",
    },

    resolver: yupResolver(BrandSchema),
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (formData: FormData) => {
      return brand(formData);
    },

    onSuccess: (data) => {
      toast.success(data?.message ?? "Brand created successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-brand"],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      console.log(error);

      toast.error(error?.message ?? "Brand creation failed");
    },
  });

  const onSubmit = (data: TBrand) => {
    const formData = new FormData();

    formData.append("name", data.name);
    formData.append("description", data.description);

    if (data.logo?.length) {
      formData.append("logo", data.logo[0]);
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
        label="Brand Name"
        placeholder="Enter brand name"
        type="text"
        name="name"
        id="name"
        register={register}
        error={errors.name?.message}
      />

      <Input
        label="Brand Description"
        placeholder="Enter brand description"
        type="text"
        name="description"
        id="description"
        register={register}
        error={errors.description?.message}
      />

      <Input
        label="Logo"
        type="file"
        name="logo"
        id="logo"
        register={register}
        error={errors.logo?.message}
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

        <Button label={isPending ? "Creating..." : "Create"} type="submit" />
      </div>
    </form>
  );
};

export default BrandForm;
