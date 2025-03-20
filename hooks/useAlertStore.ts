import { create } from "zustand";

interface AlertState {
  message: string;
  type: "default" | "destructive";
  show: boolean;
  setAlert: (message: string, type?: "default" | "destructive") => void;
  clearAlert: () => void;
}

export const useAlertStore = create<AlertState>((set) => ({
  message: "",
  type: "default",
  show: false,
  setAlert: (message, type = "default") => {
    set({ message, type, show: true });

    setTimeout(() => {
      set({ show: false });
    }, 3000);
  },
  clearAlert: () => set({ show: false }),
}));
