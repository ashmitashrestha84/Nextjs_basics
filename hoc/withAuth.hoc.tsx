"use client"
import { useAuth } from "@/hooks/auth.hook";
import { Role } from "@/types/enum.types";
import { useRouter } from "next/navigation";
import { ComponentType, useEffect } from "react";
import toast from "react-hot-toast";

const WithAuth = (Component: any, roles?: Role[]) => {
  const Protected = (props: any) => {
    const { user, isLoading } = useAuth();
    const router = useRouter();
    useEffect(() => {
      if (isLoading) {
        return;
      }
      if (!user && !isLoading) {
        toast.error("Unauthorized. Login Required");
        router.replace("/login")
        return;
      }
       if (user && roles && Array.isArray(roles) && !roles.includes(user.role)) {
        toast.error("Unauthorized. Login required")
        router.replace("/login")  //make separate page
      return;
    }
      
    }, [user, isLoading]);
    if (isLoading) {
      return <div> Loading.....</div>;
    }
    if (!user && !isLoading) {
      return null;
    }
    if (user && roles && Array.isArray(roles) && !roles.includes(user.role)) {
      return null;
    }
    return <Component {...props} />;
  };
  return Protected;
};

export default WithAuth;
