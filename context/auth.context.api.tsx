import { TLogin, TSignup } from "@/types/auth.types";
import { IUser } from "@/types/user.types";
import { createContext } from "react";

type TAuthContext = {
  user: IUser | null;
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

export const AuthContext = createContext<TAuthContext>(initialValue);
