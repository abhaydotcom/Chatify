import axios from 'axios'
import { useAuth } from '../store/useAuth';




export const axiosInstance=axios.create({
     baseURL:"https://chatify-backend-zdm0.onrender.com/api",
    // baseURL:"http://localhost:9999/api",
    withCredentials:true
})


axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      const { logout } = useAuth.getState();
      logout();
    }
    return Promise.reject(error);
  }
)