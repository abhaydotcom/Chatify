import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, Sparkles } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { login, isLoggingIn } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);

    if (res?.success) {
      
      navigate('/');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-purple-900 dark:to-blue-900">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-indigo-300 dark:bg-indigo-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Left Side - Form */}
      <div className="flex flex-col justify-center items-center p-4 sm:p-6 md:p-12 relative z-10">
        <div className="w-full max-w-md">
          {/* Glassmorphism Card */}
          <div className="backdrop-blur-lg bg-white/70 dark:bg-gray-800/70 rounded-2xl sm:rounded-3xl shadow-2xl border border-white/20 p-6 sm:p-8 space-y-6 sm:space-y-8">
            {/* Logo */}
            <div className="text-center">
              <div className="flex flex-col items-center gap-2 group">
                <div className="relative">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mt-3 sm:mt-4 bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                  Welcome Back
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Sign in to continue your journey</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">Email</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-11 pr-4 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 rounded-xl"
                    placeholder="you@example.com"
                    value={formData.email}
                    required
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-purple-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-11 pr-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 dark:focus:ring-purple-800 transition-all duration-300 rounded-xl"
                    placeholder="••••••••"
                    required
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-purple-500 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-purple-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl h-11 sm:h-12 text-sm sm:text-base font-medium"
                disabled={isLoggingIn}
              >
                {isLoggingIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Signing in...
                  </>
                ) : (
                  <>
                    Sign in
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 sm:pt-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-semibold bg-gradient-to-r from-purple-600 to-blue-600 dark:from-purple-400 dark:to-blue-400 bg-clip-text text-transparent hover:underline"
                >
                  Create account
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-col justify-center items-center p-8 xl:p-12 relative z-10">
        <div className="max-w-md text-center space-y-4 xl:space-y-6">
          <div className="w-24 h-24 xl:w-32 xl:h-32 mx-auto bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
            <MessageSquare className="w-12 h-12 xl:w-16 xl:h-16 text-white" />
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold text-gray-800 dark:text-white">
            Welcome back!
          </h2>
          <p className="text-lg xl:text-xl text-gray-600 dark:text-gray-300">
            Sign in to continue your conversations and catch up with your messages.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 xl:gap-3 pt-4 xl:pt-6">
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">💬 Real-time Chat</span>
            </div>
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">🔒 Secure</span>
            </div>
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">⚡ Fast</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 xl:gap-4 pt-6 xl:pt-8">
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 rounded-full bg-indigo-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;