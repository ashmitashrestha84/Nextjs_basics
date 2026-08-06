"use client";
import Button from "@/components/button";
import Input from "@/components/common/input";
import { loginSchema } from "@/schemas/auth.schemas";
import { TLogin } from "@/types/auth.types";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

const LoginForm = () => {
  const { register, handleSubmit, formState:{errors} } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data:TLogin) => {
    console.log("form submitted", data);
  };

  return (
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
  );
};

export default LoginForm;
