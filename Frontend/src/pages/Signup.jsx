import { useState } from "react";
import { useAuth } from "../store/useAuth";
import { Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User, Sparkles } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
  const { signup, isSigningUp } = useAuth();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const success = validateForm();
    if (!success) return;

    const res = await signup(formData);

    if (res?.success) {
      navigate('/login');
    }
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-blue-900 dark:to-purple-900">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 dark:bg-blue-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-purple-300 dark:bg-purple-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-300 dark:bg-pink-600 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
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
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <MessageSquare className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-pink-400 absolute -top-1 -right-1 animate-pulse" />
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold mt-3 sm:mt-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                  Create Account
                </h1>
                <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">Get started with your free account</p>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">Full Name</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="text"
                    className="input input-bordered w-full pl-11 pr-4 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 rounded-xl"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                     required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">Email</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type="email"
                    className="input input-bordered w-full pl-11 pr-4 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 rounded-xl"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                     required
                  />
                </div>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-medium text-sm sm:text-base text-gray-700 dark:text-gray-200">Password</span>
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="input input-bordered w-full pl-11 pr-12 bg-white/50 dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 dark:focus:ring-blue-800 transition-all duration-300 rounded-xl"
                    placeholder="••••••••"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    required
                  />
                  <button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:scale-110 transition-transform"
                    onClick={() => setShowPassword(!showPassword)}
                    
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    ) : (
                      <Eye className="h-5 w-5 text-gray-400 hover:text-blue-500 transition-colors" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="btn w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white border-none shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 rounded-xl h-11 sm:h-12 text-sm sm:text-base font-medium"
                disabled={isSigningUp}
              >
                {isSigningUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Creating account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="ml-2">→</span>
                  </>
                )}
              </button>
            </form>

            <div className="text-center pt-2 sm:pt-4">
              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:underline"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Decorative */}
      <div className="hidden lg:flex flex-col justify-center items-center p-8 xl:p-12 relative z-10">
        <div className="max-w-md text-center space-y-4 xl:space-y-6">
          <div className="w-24 h-24 xl:w-32 xl:h-32 mx-auto bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl animate-float">
            <MessageSquare className="w-12 h-12 xl:w-16 xl:h-16 text-white" />
          </div>
          <h2 className="text-3xl xl:text-4xl font-bold text-gray-800 dark:text-white">
            Join our community
          </h2>
          <p className="text-lg xl:text-xl text-gray-600 dark:text-gray-300">
            Connect with friends, share moments, and stay in touch with your loved ones.
          </p>
          
          {/* Feature badges */}
          <div className="flex flex-wrap justify-center gap-2 xl:gap-3 pt-4 xl:pt-6">
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">✨ Free Forever</span>
            </div>
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">🔒 Secure</span>
            </div>
            <div className="px-3 py-1.5 xl:px-4 xl:py-2 rounded-full bg-white/50 dark:bg-gray-700/50 backdrop-blur-sm border border-white/20 shadow-md">
              <span className="text-xs xl:text-sm font-medium text-gray-700 dark:text-gray-200">⚡ Fast Setup</span>
            </div>
          </div>

          <div className="flex justify-center gap-3 xl:gap-4 pt-6 xl:pt-8">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-bounce"></div>
            <div className="w-3 h-3 rounded-full bg-purple-500 animate-bounce" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-3 h-3 rounded-full bg-pink-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;