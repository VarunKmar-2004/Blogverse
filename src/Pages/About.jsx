import React from 'react'
import about from '../assets/about_us.png'
import { useNavigate } from 'react-router-dom'
const About = () => {
 const navigate=useNavigate()
  return (
    <div className='min-h-screen py-8 px-8 sm:py-16 sm:px-16 w-full bg-black'>
        <div className='flex sm:flex-row flex-col-reverse gap-2 bg-[#141414] px-2 py-2 rounded-[10px] w-full'>
            <div className='flex flex-col gap-2 px-2 py-1 w-full'>
                <h1 className='text-[18px] sm:text-[20px] text-emerald-500 font-varun font-bold'>BlogVerse...</h1>
                <div className='flex flex-col gap-2 mt-3'>
                    <p className='text-[13px] sm:text-[15px] text-white font-varun font-normal'>At Blogverse, we believe that stories, ideas, and opinions deserve more than just a post—they deserve a platform. Whether you're a writer, a reader, a thinker, or just someone who loves to scroll through interesting content, Blogverse is your universe of blogs.</p>
                    <p className='text-[13px] sm:text-[15px] text-white font-varun font-normal'>We’re on a mission to make blogging simple, expressive, and powerful for everyone. From personal reflections and tutorials to hot takes and creative pieces, this is the place where content meets community.</p>
                </div>
                <div className='px-2 py-1 rounded-[4px] bg-[#1a1818] flex flex-col gap-3'>
                    <h1 className='text-emerald-600 text-[17px] font-varun font-semibold'>Developer Contact:</h1>
                    <p className='text-white text-[15px] font-serif'>Email : varun972004@gmail.com</p>
                </div>
                <button onClick={()=>navigate('/')} className='px-4 w-max py-1 text-[13px] sm:text-[15px] font-varun rounded-[4px] font-semibold text-white hover:cursor-pointer bg-emerald-400 mb-3'>Home</button>
            </div>
            <div className=''>
                <img src={about} className='' alt='about_img'/>
            </div>
        </div>
    </div>
  )
}

export default About