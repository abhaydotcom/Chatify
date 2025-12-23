import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Camera, Mail, User, Calendar, CheckCircle, Sparkles } from "lucide-react";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuth();
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
    <div className="min-h-screen pt-16 sm:pt-20 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-4xl mx-auto p-4 sm:p-6 py-6 sm:py-8 relative z-10">
        {/* Main Card */}
        <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 overflow-hidden">
          {/* Header Section with Gradient */}
          <div className="relative h-32 sm:h-40 bg-gradient-to-r from-purple-500 via-blue-500 to-indigo-500 overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <Sparkles className="absolute top-4 right-4 w-6 h-6 sm:w-8 sm:h-8 text-white/80 animate-pulse" />
          </div>

          <div className="px-4 sm:px-8 pb-8">
            {/* Avatar Section */}
            <div className="flex flex-col items-center -mt-16 sm:-mt-20">
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-lg opacity-75 group-hover:opacity-100 transition-opacity"></div>
                <img
                  src={selectedImg || authUser.profilePic || "/avatar.png"}
                  alt="Profile"
                  className="relative size-28 sm:size-36 rounded-full object-cover border-4 border-white dark:border-gray-800 shadow-xl"
                />
                <label
                  htmlFor="avatar-upload"
                  className={`
                    absolute bottom-1 right-1 
                    bg-gradient-to-r from-purple-500 to-blue-500 
                    hover:from-purple-600 hover:to-blue-600
                    p-2.5 sm:p-3 rounded-full cursor-pointer 
                    shadow-lg hover:shadow-xl
                    transition-all duration-200 hover:scale-110
                    ${isUpdatingProfile ? "animate-pulse pointer-events-none" : ""}
                  `}
                >
                  <Camera className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
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

              <div className="text-center mt-4">
                <h1 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  {authUser?.fullName}
                </h1>
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {isUpdatingProfile ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
                      Uploading...
                    </span>
                  ) : (
                    "Click the camera icon to update your photo"
                  )}
                </p>
              </div>
            </div>

            {/* Profile Information Grid */}
            <div className="mt-8 grid sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Full Name Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                    <User className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Full Name</span>
                </div>
                <p className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 ml-1">
                  {authUser?.fullName}
                </p>
              </div>

              {/* Email Card */}
              <div className="backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20 hover:shadow-lg transition-shadow">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 sm:p-2.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg">
                    <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                  </div>
                  <span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">Email Address</span>
                </div>
                <p className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200 ml-1 break-all">
                  {authUser?.email}
                </p>
              </div>
            </div>

            {/* Account Information Section */}
            <div className="mt-6 sm:mt-8 backdrop-blur-sm bg-white/50 dark:bg-gray-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-white/20">
              <div className="flex items-center gap-2 mb-4 sm:mb-6">
                <div className="p-2 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                  <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <h2 className="text-lg sm:text-xl font-bold text-gray-800 dark:text-gray-200">
                  Account Information
                </h2>
              </div>

              <div className="space-y-3 sm:space-y-4">
                {/* Member Since */}
                <div className="flex items-center justify-between py-3 sm:py-4 border-b border-gray-200 dark:border-gray-600 group hover:bg-white/30 dark:hover:bg-gray-600/30 px-3 sm:px-4 rounded-lg transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <Calendar className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Member Since</span>
                  </div>
                  <span className="text-sm sm:text-base font-semibold text-gray-800 dark:text-gray-200">
                    {authUser.createdAt?.split("T")[0]}
                  </span>
                </div>

                {/* Account Status */}
                <div className="flex items-center justify-between py-3 sm:py-4 group hover:bg-white/30 dark:hover:bg-gray-600/30 px-3 sm:px-4 rounded-lg transition-colors">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
                    <span className="text-sm sm:text-base text-gray-700 dark:text-gray-300 font-medium">Account Status</span>
                  </div>
                  <span className="flex items-center gap-2 text-sm sm:text-base font-semibold text-green-500">
                    <span className="relative flex h-2 w-2 sm:h-3 sm:w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 sm:h-3 sm:w-3 bg-green-500"></span>
                    </span>
                    Active
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;