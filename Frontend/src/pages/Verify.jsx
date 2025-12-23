import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

const Verify = () => {

  const [status,setStatus]=useState('Verifying...')
 
  const navigate=useNavigate()
  const BASEURL=import.meta.env.VITE_BASE_URL;

useEffect(() => {
  const verifyMail = async () => {
    try {

      const res = await axios.post(
        `${BASEURL}/auth/verify`,
        {},    { withCredentials: true }
      );
     
      console.log(res)

      if (res.data?.success) {
        setStatus("✅ Email Verified successfully");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      } else {
        setStatus("❌ Invalid or Expired Token");
      }
    } catch (error) {
        console.log(error)
     
      setStatus("❌ Verification Failed. Please try again.");
    }
  };

verifyMail();
}, [ navigate, BASEURL]);




  return (
    <div className='relative w-full h-screen bg-sky-400 overflow-hidden'>
       <div className='min-h-screen flex items-center justify-center'>
        <div className='bg-gray-300 p-6 rounded-xl shadow-md text-center w-[90%] max-w-md'>
            <h2 className='text-xl font-semibold text-gray-800'>{status}</h2>
        </div>
       </div>
    </div>
  )
}

export default Verify