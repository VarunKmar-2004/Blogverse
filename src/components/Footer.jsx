import React from 'react'

const Footer = () => {
  return (
    <div className='w-[100%] bg-black px-8 py-2 sm:px-16 sm:py-4 flex flex-col gap-2'>
      <div className='flex flex-row justify-center items-center gap-3'>
        <div className='text-center'>
            <h2 className='text-[15px] sm:text-[17px] text-emerald-500 font-varun font-semibold'>BlogVerse.</h2>
            <p className='text-gray-400 text-[13px] sm:text-[14px] font-serif'>A mini experience sharing application</p>
            <p  className='text-gray-400 text-[14px] sm:text-[15px] font-varun font-medium'>Copyright ©2025 Varun Kumar. All Rights Reserved.</p>
        </div>
      </div>
    </div>
  )
}

export default Footer