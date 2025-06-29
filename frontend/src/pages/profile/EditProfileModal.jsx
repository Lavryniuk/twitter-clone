import { useState, useEffect } from "react";
import { useEditProfile } from "../../hooks/useEditProfile";
import LoadingSpinner from "../../components/common/LoadingSpinner";

const EditProfileModal = ({ authUser }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    username: "",
    email: "",
    bio: "",
    link: "",
  });
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const { updateProfile, isUpdatingProfile } = useEditProfile();

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "currentPassword") {
      setCurrentPassword(value);
    } else if (name === "newPassword") {
      setNewPassword(value);
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();
    updateProfile({
      ...formData,
      currentPassword,
      newPassword,
    });
  };

  useEffect(() => {
    if (authUser) {
      setFormData({
        fullName: authUser.fullName,
        username: authUser.username,
        email: authUser.email,
        bio: authUser.bio,
        link: authUser.link,
      });

      setCurrentPassword("");
      setNewPassword("");
    }
  }, [authUser]);
  return (
    <>
      <button
        className="btn btn-outline rounded-full btn-sm"
        onClick={() =>
          document.getElementById("edit_profile_modal").showModal()
        }
      >
        Edit profile
      </button>
      <dialog id="edit_profile_modal" className="modal">
        <div className="modal-box border rounded-md border-gray-700 shadow-md">
          <h3 className="font-bold text-lg my-3">Update Profile</h3>
          <form className="flex flex-col gap-4" onSubmit={onHandleSubmit}>
            <div className="flex flex-wrap gap-2">
              <input
                type="text"
                placeholder="Full Name"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.fullName}
                name="fullName"
                onChange={handleInputChange}
              />
              <input
                type="text"
                placeholder="Username"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.username}
                name="username"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="email"
                placeholder="Email"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.email}
                name="email"
                onChange={handleInputChange}
              />
              <textarea
                placeholder="Bio"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={formData.bio}
                name="bio"
                onChange={handleInputChange}
              />
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                type="password"
                placeholder="Current Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={currentPassword}
                name="currentPassword"
                onChange={handleInputChange}
                autoComplete="new-password"
              />
              <input
                type="password"
                placeholder="New Password"
                className="flex-1 input border border-gray-700 rounded p-2 input-md"
                value={newPassword}
                name="newPassword"
                onChange={handleInputChange}
                autoComplete="new-password"
              />
            </div>
            <input
              type="text"
              placeholder="Link"
              className="flex-1 input border border-gray-700 rounded p-2 input-md"
              value={formData.link}
              name="link"
              onChange={handleInputChange}
            />
            <button className="btn btn-primary rounded-full btn-sm text-white">
              {isUpdatingProfile ? <LoadingSpinner size="sm" /> : "Update"}
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button className="outline-none">close</button>
        </form>
      </dialog>
    </>
  );
};
export default EditProfileModal;
