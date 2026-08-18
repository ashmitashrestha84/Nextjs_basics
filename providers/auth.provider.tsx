"use client";

import { getProfile, login, logoutUser, signup } from "@/api/auth.api";
import { AuthContext } from "@/context/auth.context.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryFn: getProfile,
    queryKey: ["auth", "me"],
    retry: false,
    refetchInterval: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
  });

  // LOGIN
  const { mutate: loginMutation } = useMutation({
    mutationFn: login,

    onSuccess: async (response) => {
      toast.success(response.message ?? "Login successful");

      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      router.push("/");
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Login failed");
    },
  });

  // SIGNUP
  const { mutate: signupMutation } = useMutation({
    mutationFn: signup,

    onSuccess: async (response) => {
      toast.success(response.message ?? "Registration successful");

      await queryClient.invalidateQueries({
        queryKey: ["auth", "me"],
      });

      router.push("/");
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Registration failed");
    },
  });

  // LOGOUT
  const { mutate: logoutMutation } = useMutation({
    mutationFn: logoutUser,

    onSuccess: async (response) => {
      toast.success(response.message ?? "Logout successful");
      console.log("success")

      queryClient.removeQueries({
        queryKey: ["auth", "me"],
      });

      router.replace("/");
    },

    onError: (error: any) => {
      toast.error(error.message ?? "Logout failed");
      console.log("fail")
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: data?.data ?? null,

        login: loginMutation,

        register: signupMutation,

        logout: logoutMutation,

 
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
