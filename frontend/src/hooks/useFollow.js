import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

export const useFollow = () => {
  const queryClient = useQueryClient();

  const { mutate: follow, isPending } = useMutation({
    mutationFn: async (userId) => {
      try {
        const res = await fetch(`/api/users/follow/${userId}`, {
          method: "POST",
        });

        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || "Failed to follow user");
        }

        return data;
      } catch (error) {
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      toast.success("Followed successfully");
      Promise.all([
        queryClient.invalidateQueries({ queryKey: ["suggestedUsers"] }),
        queryClient.invalidateQueries({ queryKey: ["authUser"] }),
      ]);
    },
    onError: (error) => {
      toast.error(error.message || "Failed to follow user");
    },
  });

  return { follow, isPending };
};
