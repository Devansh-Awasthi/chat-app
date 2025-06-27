import React, { useState } from "react";
import { useAuthStore } from "../store/userAuthStore";
import { Camera, Mail, User } from "lucide-react";

function ProfilePage() {
  const { authUser, updateprofile, isUpdatingProfile } = useAuthStore();
  const [NewSelected, setNewSelected] = useState(null);
  const handelProfileUpdate = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setNewSelected(base64Image);
      await updateprofile({profilePic:base64Image});
    };
  };
  return (
    <div className="h-screen pt-20">
      <div className="max-w-2xl mx-auto p-4 py-8">
        <div className="bg-base-300 rounded-xl p-6 space-y-8 flex-col  justify-items-center">
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Profile</h1>
            <p className="mt-3">Your Profile Information</p>
          </div>
          <div className="size-36 rounded-full bg-amber-100 relative">
            <img
              src={NewSelected || authUser.profilePic || "/avatar.png"}
              className="absolute inset-0 w-full h-full object-cover rounded-full"
            ></img>
            <label
              className={`absolute rounded-full right-0 bottom-0 bg-base-content cursor-pointer ${
                isUpdatingProfile ? "animate-pulse pointer-events-none" : ""
              }`}
            >
              <Camera className="h-5 w-5 m-2 text-base-200"></Camera>
              <input
                type="file"
                className="hidden bg-base-300"
                accept="image/*"
                onChange={handelProfileUpdate}
                disabled={isUpdatingProfile}
              ></input>
            </label>
          </div>
          <p className="text-sm text-zinc-400">
            {isUpdatingProfile
              ? "Uploading..."
              : "Click the camera icon to update your photo"}
          </p>
          <div className="w-full max-w-md mx-auto px-4">
            <div className="space-y-6">
              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex  gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.name}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="text-sm text-zinc-400 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </div>
                <p className="px-4 py-2.5 bg-base-200 rounded-lg border">
                  {authUser?.email}
                </p>
              </div>
            </div>

            <div className="mt-6 bg-base-300 rounded-xl p-6">
              <h2 className="text-lg font-medium  mb-4">Account Information</h2>
              <div className="space-y-3 text-sm">
                <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                  <span>Member Since</span>
                  <span>{authUser.createdAt?.split("T")[0]}</span>
                </div>
                <div className="flex items-center justify-between py-2">
                  <span>Account Status</span>
                  <span className="text-green-500">Active</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
