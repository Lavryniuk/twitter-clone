import { useQuery } from "@tanstack/react-query";

export const useAuthUser = () =>
  useQuery({
    // use queryKey to give a unique name to query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();

        if (data.error) {
          return null;
        }

        if (!res.ok) {
          throw new Error(data.error || "Failed to fetch user");
        }

        return data;
      } catch (error) {
        throw new Error(error);
      }
    },
    retry: false,
  });
