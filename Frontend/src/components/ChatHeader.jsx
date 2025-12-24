import { X } from "lucide-react";
import { useAuth } from "../store/useAuth";
import { useMessage } from "../store/useMessage";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useMessage();
  const { onlineUsers } = useAuth();

  return (
    <div className="p-3 sm:p-4 border-b border-gray-800 bg-gray-900">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
          {/* Avatar */}
          <div className="relative flex-shrink-0">
            <img 
              src={selectedUser.profilePic || "/avatar.png"} 
              alt={selectedUser.fullName}
              className="size-9 sm:size-10 md:size-11 rounded-full object-cover ring-2 ring-gray-700"
            />
            {onlineUsers.includes(selectedUser._id) && (
              <span className="absolute bottom-0 right-0 size-2.5 sm:size-3 bg-green-500 rounded-full ring-2 ring-gray-900 animate-pulse" />
            )}
          </div>

          {/* User info */}
          <div className="min-w-0 flex-1">
            <h3 className="font-semibold text-white text-sm sm:text-base truncate">
              {selectedUser.fullName}
            </h3>
            <p className={`text-xs flex items-center gap-1 sm:gap-1.5 ${
              onlineUsers.includes(selectedUser._id) ? "text-green-400" : "text-gray-500"
            }`}>
              <span className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
                onlineUsers.includes(selectedUser._id) ? "bg-green-400" : "bg-gray-500"
              }`}></span>
              <span className="truncate">
                {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
              </span>
            </p>
          </div>
        </div>

        {/* Close button */}
        <button 
          onClick={() => setSelectedUser(null)}
          className="p-1.5 sm:p-2 hover:bg-gray-800 rounded-lg transition-colors group flex-shrink-0"
        >
          <X className="size-4 sm:size-5 text-gray-400 group-hover:text-white transition-colors" />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;