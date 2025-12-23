import React from 'react'

const VerifyEmail = () => {
  return (
      <div className='relative w-full h-screen overflow-hidden'>
      <div className='min-h-screen flex items-center justify-center bg-sky-400 px-4'>
        <div className='bg-gray-300 p-8 rounded-2xl shadow-lg w-full max-w-md text-center'>
            <h2 className='text-2xl font-semibold text-green-700 mb-4'>✅ Check Your Email</h2>
            <p className='text-gray-700 text-sm'>
                We've sent you an email to verify your account. Please check your inbox and click the verification link
            </p>
        </div>
      </div>
    </div>
  )
}

export default VerifyEmail