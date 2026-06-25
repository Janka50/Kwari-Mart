import { create } from "zustand";

interface AuthState {
  access: string | null;
  refresh: string | null;
  role: string | null;
  email: string | null;

  setAuth: (data: any) => void;
  logout: () => void;
}

export const useAuthStore =
  create<AuthState>((set) => ({
    access: null,
    refresh: null,
    role: null,
    email: null,

    setAuth: (data) =>
      set({
        access: data.access,
        refresh: data.refresh,
        role: data.role,
        email: data.email,
      }),

    logout: () =>
      set({
        access: null,
        refresh: null,
        role: null,
        email: null,
      }),
  }));