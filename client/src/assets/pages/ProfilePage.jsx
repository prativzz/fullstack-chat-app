import React, { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
const ProfilePage = () => {
 const [selectedImg, setSelectedImg] = useState(null);
 
 const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
 const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };


  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h2
          className="text-2xl font-semibold text-center text-gray-800"
          style={{
            fontFamily:
              '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
          }}
        >
          My Profile
        </h2>

        {/* Profile Picture */}
     {/* Profile Picture */}
<div className="flex flex-col items-center space-y-2">
  <div className="w-32 h-32 rounded-full overflow-hidden bg-gray-200 shadow">
    <img
      src={
        selectedImg ||
        authUser.profilePic ||
        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
      }
      alt="Profile"
      className="size-32 rounded-full object-cover border-4 "
    />
  </div>

  <label className="text-sm text-gray-600 hover:underline cursor-pointer">
    <input
      type="file"
      accept="image/*"
      className="hidden"
      onChange={handleImageUpload}
    />
    Choose Profile Picture
  </label>

  {/* Remove Button */}
  <button
    onClick={() => {
      setSelectedImg(null);
      updateProfile({ profilePic: "" }); // Send blank or fallback
    }}
    className="mt-2 text-sm text-red-600 hover:underline"
  >
    Remove Profile Picture
  </button>
</div>


        {/* User Info */}
        <div className="space-y-3">
          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">Full Name</p>
            <p className="text-base font-medium text-gray-800">{authUser?.fullName}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">Email</p>
            <p className="text-base font-medium text-gray-800">{authUser?.email}</p>
          </div>

          <div className="bg-gray-50 p-3 rounded-xl border border-gray-200">
            <p className="text-xs text-gray-500">Member Since</p>
            <p className="text-base font-medium text-gray-800">{authUser.createdAt?.split("T")[0]}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
