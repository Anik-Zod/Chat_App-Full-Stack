import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, LogOut, Mail } from "lucide-react";

const ProfilePage = () => {
  const { authUser, logout, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

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
    <div className="max-w-lg mx-auto bg-white shadow-lg  overflow-hidden">
      {/* Cover Photo */}
      <div className="relative h-40 bg-gradient-to-r from-[#101828] to-slate-600">
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-3xl font-semibold text-white">Profile</h1>
        </div>
      </div>

      {/* Profile Image */}
      <div className="relative flex flex-col items-center -mt-16">
        <div className="relative w-32 h-32">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-white shadow-xl transition-transform hover:scale-105"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-2 right-2 bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-gray-700 transition duration-200"
          >
            <Camera className="w-5 h-5" />
            <input
              type="file"
              id="avatar-upload"
              className="hidden"
              accept="image/*"
              onChange={handleImageUpload}
              disabled={isUpdatingProfile}
            />
          </label>
        </div>
        <p className="text-lg font-semibold mt-2">{authUser?.fullName}</p>
        <p className="text-sm text-gray-500">
          {isUpdatingProfile ? "Uploading..." : "Click the camera icon to update your photo"}
        </p>
      </div>

      {/* Profile Details */}
      <div className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <p className="font-medium">{authUser?.email}</p>
          </div>
        </div>

        <div className="border-t pt-4">
          <h2 className="text-lg font-semibold text-gray-700">Account Information</h2>
          <div className="mt-3 space-y-2 text-sm text-gray-600">
            <div className="flex justify-between">
              <span>Member Since</span>
              <span>{authUser.createdAt?.split("T")[0]}</span>
            </div>
            <div className="flex justify-between">
              <span>Account Status</span>
              <span className="text-green-500 font-medium">Active</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div
        className="flex mt-10 items-center justify-center gap-2 py-3 bg-gray-100 hover:bg-gray-200 cursor-pointer transition rounded-b-lg"
        onClick={logout}
      >
        <LogOut className="w-5 h-5 text-red-500" />
        <span className="text-red-500 font-medium">Logout</span>
      </div>
    </div>
  );
};

export default ProfilePage;
