import { ICategories } from "@/types/categories.types";
import {  useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";


interface UpdateCategoryFormProps {
  category: ICategories;
  onSuccess?: () => void;
  onCancel: () => void;
}

const updateCategoryForm = ({
  category: selectedCategory,
  onSuccess,
  onCancel,
}: UpdateCategoryFormProps) => {
    const queryClient=useQueryClient()
};
//  const {regitser,handleSubmit,formState:{errors}=useForm<T>}