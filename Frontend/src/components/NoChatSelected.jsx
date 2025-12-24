import { MessageSquare } from "lucide-react";

const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-8 sm:p-16 bg-gray-900">
      <div className="max-w-md text-center space-y-6 sm:space-y-8">
        {/* Icon Display */}
        <div className="flex justify-center mb-4 sm:mb-6">
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-2xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-xl">
              <MessageSquare className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <div className="space-y-3 sm:space-y-4">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Welcome to Chatify!
          </h2>
          <p className="text-sm sm:text-base text-gray-400">
            Select a conversation from the sidebar to start chatting
          </p>
        </div>
      </div>
    </div>
  );
};

export default NoChatSelected;