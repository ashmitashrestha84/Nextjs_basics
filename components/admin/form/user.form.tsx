"use client";

import { useEffect } from "react";

import { getUserById, updateUser } from "@/api/user.api";

import Button from "@/components/button";
import Input from "@/components/common/input";

import { updateUserSchema } from "@/schemas/user.schemas";

import { IUser, TUpdateUser } from "@/types/user.types";

import { yupResolver } from "@hookform/resolvers/yup";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { useForm } from "react-hook-form";

import toast from "react-hot-toast";

interface UserFormProps {
  user: IUser;
  onSuccess?: () => void;
  onCancel?: () => void;
}

const UserForm = ({ user, onSuccess, onCancel }: UserFormProps) => {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["user", user._id],
    queryFn: () => getUserById(user._id),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TUpdateUser>({
    defaultValues: {
      full_name: "",
      email: "",
      profile_image: undefined,
    },

    resolver: yupResolver(updateUserSchema) as any,
  });


  useEffect(() => {
    if (data?.data) {
      const userData = data.data;

      reset({
        full_name: userData.full_name,
        email: userData.email,
      });
    }
  }, [data, reset]);

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      updateUser(id, data),

    onSuccess: (response) => {
      toast.success(response?.message ?? "User updated successfully");

      queryClient.invalidateQueries({
        queryKey: ["get-all-user"],
      });

      queryClient.invalidateQueries({
        queryKey: ["user", user._id],
      });

      onSuccess?.();
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Failed to update user");
    },
  });

  const isPending = updateMutation.isPending;

  const onSubmit = (data: TUpdateUser) => {
    const formData = new FormData();

    formData.append("full_name", data.full_name);

    formData.append("email", data.email);

    if (data.profile_image && data.profile_image.length > 0) {
      formData.append("profile_image", data.profile_image[0]);
    }

    updateMutation.mutate({
      id: user._id,
      data: formData,
    });
  };

  if (isLoading) {
    return (
      <div className="p-6">
        <p className="text-gray-500">Loading user...</p>
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
        label="Full Name"
        placeholder="Enter full name"
        type="text"
        name="full_name"
        id="full_name"
        register={register}
        error={errors.full_name?.message}
      />

      <Input
        label="Email"
        placeholder="Enter email"
        type="email"
        name="email"
        id="email"
        register={register}
        error={errors.email?.message}
      />


      {user.profile_image?.path && (
        <div className="flex flex-col gap-2">
          <label className="text-[14px] font-normal">
            Current Profile Image
          </label>

          <div className="h-24 w-24 overflow-hidden rounded-md">
            <img
              src={user.profile_image.path}
              alt={user.full_name}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      )}

      <Input
        label="Profile Image"
        type="file"
        name="profile_image"
        id="profile_image"
        register={register}
        error={errors.profile_image?.message}
      />

      <p className="text-xs text-gray-400">
        Leave empty to keep the existing profile image.
      </p>


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

export default UserForm;
