import axios from 'axios'



export const axiosInstance=axios.create({
    baseURL:"https://chatify-backend-rouge.vercel.app/api",
    withCredentials:true
})