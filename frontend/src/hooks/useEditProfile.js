import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useAuthUser } from "./useAuthUser";

export const useEditProfile = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { username: oldUsername } = useAuthUser();

  const { mutateAsync: updateProfile, isPending: isUpdatingProfile } =
    useMutation({
      mutationFn: async (updateData) => {
        try {
          const res = await fetch("/api/users/update", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(updateData),
          });
          const data = await res.json();
          if (!res.ok) {
            throw new Error(data.error || "Failed to update profile");
          }
          return data;
        } catch (error) {
          throw new Error(error);
        }
      },
      onSuccess: (updatedUser) => {
        toast.success("Profile updated successfully");
        Promise.all([
          queryClient.invalidateQueries({ queryKey: ["userProfile"] }),
          queryClient.invalidateQueries({ queryKey: ["authUser"] }),
        ]);
        //if username was updated, emiddiately navigate to the new profile
        if (updatedUser.username !== oldUsername) {
          navigate(`/profile/${updatedUser.username}`);
        }
      },
      onError: (error) => {
        toast.error(error.message || "Failed to update profile");
        console.error("React Query fetch error:", error);
      },
    });

  return { updateProfile, isUpdatingProfile };
};
