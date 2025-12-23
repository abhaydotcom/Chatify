import { Link } from "react-router-dom";
import { useAuth } from "../store/useAuth";
import { LogOut, MessageSquare, User, Sparkles } from "lucide-react";

const Navbar = () => {
  const { logout, authUser } = useAuth();

  return (
    <header className="fixed w-full top-0 z-40 backdrop-blur-lg bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/50 shadow-lg">
      <div className="container mx-auto px-4 sm:px-6 h-16 sm:h-18">
        <div className="flex items-center justify-between h-full">
          {/* Logo Section */}
          <div className="flex items-center gap-6 sm:gap-8">
            <Link 
              to="/" 
              className="flex items-center gap-2 sm:gap-2.5 hover:scale-105 transition-transform duration-200 group"
            >
              <div className="relative">
                <div className="size-9 sm:size-10 rounded-xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <MessageSquare className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <Sparkles className="absolute -top-1 -right-1 w-4 h-4 text-yellow-400 animate-pulse opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <h1 className="text-lg sm:text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                Chatify
              </h1>
            </Link>
          </div>

          {/* Right Side - User Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {authUser && (
              <>
                {/* Profile Button */}
                <Link 
                  to={"/update-profile"} 
                  className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-white/50 dark:bg-gray-800/50 hover:bg-white dark:hover:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-600 transition-all duration-200 hover:shadow-lg"
                >
                  <div className="p-1.5 sm:p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500 group-hover:scale-110 transition-transform">
                    <User className="size-4 sm:size-5 text-white" />
                  </div>
                  <span className="hidden sm:inline text-sm font-medium text-gray-700 dark:text-gray-300">
                    Profile
                  </span>
                </Link>

                {/* Logout Button */}
                <button 
                  onClick={logout}
                  className="group relative flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white border-none transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  <LogOut className="size-4 sm:size-5" />
                  <span className="hidden sm:inline text-sm font-medium">
                    Logout
                  </span>
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;