"use client";

import Button from "@/components/button";
import Input from "@/components/common/input";

import { loginSchema } from "@/schemas/auth.schemas";
import { TLogin } from "@/types/auth.types";

import { yupResolver } from "@hookform/resolvers/yup";

import { useForm } from "react-hook-form";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

import { login } from "@/api/auth.api";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import toast from "react-hot-toast";

import { useRouter } from "next/navigation";

import { All_Admin } from "@/types/enum.types";

const LoginForm = () => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLogin>({
    defaultValues: {
      email: "",
      password: "",
    },

    resolver: yupResolver(loginSchema),
  });

  const loginMutation = useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      toast.success(response?.message ?? "Login successful");

      await queryClient.refetchQueries({
        queryKey: ["auth", "me"],
      });

      // Clear user-specific data
      queryClient.removeQueries({
        queryKey: ["wishlist"],
      });

      queryClient.removeQueries({
        queryKey: ["cart"],
      });

      const role = response?.data?.role;

      // Admin
      if (All_Admin.includes(role)) {
        router.replace("/dashboard");
        return;
      }

      // Normal user
      router.replace("/");
    },

    onError: (error: any) => {
      toast.error(error?.message ?? "Login failed");
    },
  });

  const onSubmit = (data: TLogin) => {
    loginMutation.mutate(data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        <Input
          label="Email"
          placeholder="john@gmail.com"
          type="email"
          name="email"
          id="email"
          register={register}
          error={errors.email?.message}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          register={register}
          error={errors.password?.message}
        />

        <div>
          <Button
            label={loginMutation.isPending ? "Logging in..." : "Login"}
            type="submit"
          />
        </div>
      </form>

      <div className="flex flex-row gap-3">
        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-border py-2.5 pl-5 transition-colors hover:bg-primary-lighter"
        >
          <FcGoogle size={40} />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-sm border border-border py-2.5 pl-5 transition-colors hover:bg-primary-lighter"
        >
          <FaGithub size={40} />
          Continue with GitHub
        </button>
      </div>
    </>
  );
};

export default LoginForm;
