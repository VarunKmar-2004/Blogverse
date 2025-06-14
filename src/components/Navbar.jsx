import React, { useContext, useState,} from 'react'
import { ChevronDown} from 'lucide-react'
import {useNavigate}  from 'react-router-dom'
import { Context } from '../ContextAPI/ContextProvider'
import { useScroll } from '../ContextAPI/ScrollContext'
const Navbar = () => {
  const { scrollTo } = useScroll();
  const {userData,isLoggedIn}=useContext(Context)
  const [mobileOpen,setMobileOpen]=useState(false)
  const navigate=useNavigate()
  const handleToggle = () => setMobileOpen(!mobileOpen);
  const handleNavigate=(path)=>{
    setMobileOpen(false);
    if(path!=='/login'){
       if(isLoggedIn){
        navigate(path)
      }
      else{
        navigate('/error')
      }
  }else{
    navigate(path)
  }
  }
  return (
    <div className='sm:px-[20px] px-[10px] py-[16px] flex flex-row items-center justify-around fixed top-0 left-0 right-0 z-50 bg-black'>
        <div className='sm:px-8 px-2 py-4'>
            <h1 data-aos="fade-down" data-aos-duration='1000' className='font-varun font-bold md:text-3xl text-2xl text-emerald-500 '>BlogVerse..</h1>
        </div>
        <nav className='hidden px-2 sm:flex flex-row items-center gap-[30px] text-white transition duration-200 ease-in-out'>
            <p data-aos="fade-down" data-aos-duration='1000' className='font-varun font-semibold text-lg hover:text-emerald-400 hover:text-shadow-amber-50 hover:cursor-pointer mr-3'>Home</p>
            <div className="relative">
        <p data-aos="fade-down" data-aos-duration='1200'
          className="font-varun font-semibold text-lg hover:text-emerald-400 hover:text-shadow-amber-50 hover:cursor-pointer mr-3 flex flex-row items-center gap-3"
         onClick={()=>scrollTo('post')}>
          Blogs
        </p>
      </div>
            <p onClick={()=>handleNavigate('/newpost')} data-aos="fade-down" data-aos-duration='1400'  className='font-varun font-semibold text-lg hover:text-emerald-400 hover:text-shadow-amber-50 hover:cursor-pointer mr-3'>Create New</p>
            <p onClick={()=>handleNavigate('/about')} data-aos="fade-down" data-aos-duration='1600' className='font-varun font-semibold text-lg hover:text-emerald-400 hover:text-shadow-amber-50 hover:cursor-pointer mr-2'>About Us</p>
            <p onClick={()=>alert('this page is under Developmet!!')} data-aos="fade-down" data-aos-duration='1800' className='font-varun font-semibold text-lg hover:text-emerald-400 hover:text-shadow-amber-50 hover:cursor-pointer mr-2'>Settings</p>
        </nav>
      <div data-aos="fade-down" data-aos-duration='1200' className="sm:hidden px-4 py-2 flex justify-between items-center text-white">
        <button onClick={handleToggle} className={`px-2 py-2 rounded-full bg-[#141414] transition-all duration-150 transform ${mobileOpen ?'rotate-180':'rotate-0'}`}>
          <ChevronDown size={28} className='text-white'/>
        </button>
      </div>
        {/* Mobile Sidebar */}
      <div className={`sm:hidden fixed top-0 left-0 h-full w-64 bg-black z-50 transform transition-transform duration-300 ${mobileOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex flex-col p-4 text-white gap-4 text-[16px] font-varun font-semibold mt-10">
          <p onClick={() => handleNavigate('/')} className='hover:text-emerald-400 hover:cursor-pointer'>Home</p>
          <p onClick={() => scrollTo('post')} className='hover:text-emerald-400 hover:cursor-pointer'>Blogs</p>
          <p onClick={() => handleNavigate('/newpost')} className='hover:text-emerald-400 hover:cursor-pointer'>Create New</p>
          <p onClick={() => handleNavigate('/about')} className='hover:text-emerald-400 hover:cursor-pointer'>About Us</p>
          <p onClick={() => alert('this page is under Developmet!!')} className='hover:text-emerald-400 hover:cursor-pointer'>Settings</p>
        </div>
      </div>
        {userData?.profile_picture?(
          <div data-aos="fade-down" data-aos-duration='2000' className=' border-3 border-emerald-600 w-[40px] h-[40px] bg-white rounded-full hover:cursor-pointer hover:shadow-sm hover:shadow-emerald-700 transition-colors duration-200'>
            <img  className='object-cover rounded-full w-full h-full' src={userData.profile_picture} alt={userData.name} onClick={()=>handleNavigate('/profile')}/>
          </div>
        ):(
          <div className='px-2 py-2'>
            <button data-aos="fade-down" data-aos-duration='2200' className='px-4 py-2 text-lg text-white bg-emerald-500 font-varun font-semibold rounded-[10px] hover:cursor-pointer hover:bg-emerald-700 transition duration-150 ease-in-out hover:shadow-black hover:shadow-md' onClick={()=>handleNavigate('/login')}>Login</button>
        </div>
        )}
    </div>
  )
}

export default Navbar