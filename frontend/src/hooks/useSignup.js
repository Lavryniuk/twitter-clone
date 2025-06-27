import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useSignup = () => {
  return useMutation({
    mutationFn: async ({ email, username, fullName, password }) => {
      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, username, fullName, password }),
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to create account");
        }

        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Account created successfully");
    },
  });
};
