import { TLogin, TSignup } from "@/types/auth.types";
import { createContext } from "react";

type TAuthContext = {
  user: TLogin | null;
  register: (data: TSignup) => void;
  login: (data: TLogin) => void;
  logout: () => void;
  isLoading: boolean;
};

const initialValue: TAuthContext = {
  user: null,

  register: ({ email }) => {
    console.log("Create:", email);
  },

  login: ({ email }) => {
    console.log("Add:", email);
  },
  logout: () => {},
  isLoading: false,
};

export const authContext = createContext<TAuthContext>(initialValue);
