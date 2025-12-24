import axios from 'axios'



export const axiosInstance=axios.create({
    baseURL:"https://chatify-backend-zdm0.onrender.com/api",
    withCredentials:true
})