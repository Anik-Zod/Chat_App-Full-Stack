import { useEffect, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { Camera, Loader, LogOut, Mail, Calendar } from "lucide-react";

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

  if (!authUser) return <Loader className="text-white mx-auto" />;

  return (
    <div className="max-w-md mx-auto bg-[#101828] text-white  shadow-lg overflow-hidden h-screen">
      {/* Cover Photo */}
      <div className="relative h-32 bg-[#101828] flex justify-center items-center">
        <div className="absolute top-24 w-24 h-24">
          <img
            src={selectedImg || authUser.profilePic || "/avatar.png"}
            alt="Profile"
            className="w-full h-full rounded-full object-cover border-4 border-black shadow-lg"
          />
          <label
            htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 bg-gray-800 p-2 rounded-full text-white cursor-pointer hover:bg-gray-700 transition"
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
      </div>

      {/* Profile Details */}
      <div className="text-center mt-12 p-4">
        <h2 className="text-xl font-semibold">{authUser?.fullName}</h2>
        <p className="text-gray-400 text-sm">Click the camera icon to update your photo</p>
      </div>

      {/* Contact Information */}
      <div className="bg-gray-900 p-4 rounded-lg mx-4">
        <h3 className="text-gray-400 text-sm">Contact Information</h3>
        <div className="flex items-center gap-3 mt-2">
          <Mail className="w-5 h-5 text-gray-400" />
          <p className="text-white text-sm">{authUser?.email}</p>
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-gray-900 p-4 rounded-lg mx-4 mt-4">
        <h3 className="text-gray-400 text-sm">Account Information</h3>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-gray-400" />
            <span>Member Since</span>
          </div>
          <span className="text-white">{authUser.createdAt?.split("T")[0]}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-400 mt-2">
          <span>Account Status</span>
          <span className="text-green-500 font-medium">Active</span>
        </div>
      </div>

      {/* Logout Button */}
      <div
        className="flex items-center justify-center gap-2 py-3 mt-20 bg-red-600 hover:bg-red-500 cursor-pointer transition text-white font-medium "
        onClick={logout}
      >
        <LogOut className="w-5 h-5" />
        <span>Logout</span>
      </div>
    </div>
  );
};

export default ProfilePage;