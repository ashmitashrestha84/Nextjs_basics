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
interface LoginFormProps {
  onLoginSuccess: () => void;
}

const LoginForm = ({ onLoginSuccess }: LoginFormProps) => {
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

  const { data, isPending, error, mutate } = useMutation({
    mutationFn: login,
    mutationKey: ["login"],
    onSuccess: async (data) => {
      console.log("on success");
      console.log(data);
      toast.success(data?.message ?? "Login success");
      await queryClient.refetchQueries({
        queryKey: ["auth", "me"],
      });
      onLoginSuccess();
      if (All_Admin.includes(data.data.role)) {
        router.replace("/dashboard");
      } else {
        router.replace("/");
      }
    },

    onError: (error: Error) => {
      toast.error(error?.message ?? "Login Failed");
      console.log("on error");
      console.log(error);
    },
  });

  const onSubmit = async (data: TLogin) => {
    mutate(data);
    console.log("submit end");
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
          error={errors?.email?.message}
          register={register}
        />

        <Input
          label="Password"
          placeholder="Enter your password"
          type="password"
          name="password"
          id="password"
          error={errors?.password?.message}
          register={register}
        />

        <div>
          <Button label="Login" type="submit" />
        </div>
      </form>
      <div className="flex flex-row gap-3">
        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 pl-5 border border-border rounded-sm hover:bg-primary-lighter transition-colors cursor-pointer"
        >
          <FcGoogle size={40} />
          Continue with Google
        </button>

        <button
          type="button"
          className="flex items-center justify-center gap-2 w-full py-2.5 pl-5 border border-border rounded-sm hover:bg-primary-lighter transition-colors cursor-pointer"
        >
          <FaGithub size={40} />
          Continue with GitHub
        </button>
      </div>
    </>
  );
};

export default LoginForm;
