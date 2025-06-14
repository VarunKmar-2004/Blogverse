import { X } from 'lucide-react'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const ErrorPage = () => {
    const navigate=useNavigate()
  return (
    <div className='h-screen bg-black flex justify-center items-center'>
        <div className='py-2 px-2 bg-[#141414] rounded-[4px] flex flex-col items-center gap-2'>
            <X onClick={()=>navigate('/')} size={35} className='text-red-600'/>
            <p className='text-[15px] sm:text-[16px] font-varun font-semibold text-white'>Login first and explore second..</p>
            <button onClick={()=>navigate('/login')} className='px-2 py-1 rounded-[3px] bg-emerald-500 text-white font-varun text-[14px] sm:text-[15px] font-semibold w-full cursor-pointer'>Login</button>
        </div>
    </div>
  )
}

export default ErrorPage