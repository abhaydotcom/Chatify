import React from 'react'
import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import SignUpPage from './pages/Signup'
import LoginPage from './pages/Login'
import Verify from './pages/Verify'
import VerifyEmail from './pages/VerifyEmail'
import Chat from './pages/Chat'
import { Toaster } from 'react-hot-toast'
import { useAuth } from './store/useAuth'
import ProfilePage from './pages/Profile'
import { useEffect } from 'react'
import { Loader } from 'lucide-react'
import Navbar from './components/Navbar'

export  const App = () => {

  const {authUser,checkAuth,isCheckingAuth,onlineUsers,connectSocket,disconnectSocket}=useAuth()


   const location = useLocation();

  const hideNavbarRoutes = ["/verify", "/verifyEmail"];

  const shouldHideNavbar = hideNavbarRoutes.includes(location.pathname);



    useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  
useEffect(() => {
  if (authUser?._id) {
    connectSocket(authUser._id);
  } else {
    disconnectSocket();
  }
}, [authUser]);

 

    if (isCheckingAuth && !authUser)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );

  return (
    <div>
      {!shouldHideNavbar && <Navbar/>}

       <Routes>
        <Route path="/" element={authUser?<Home/>:<Navigate to='/login' />} />
        <Route path="/signup" element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route path="/verify" element={<Verify/>} />
        <Route path="/verifyEmail" element={<VerifyEmail/>} />
        <Route path="/update-profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
     
      </Routes>

      <Toaster/>  

    </div>
  )
}
