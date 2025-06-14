import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../ContextAPI/ContextProvider'
import {CirclePlus} from 'lucide-react'
import axios from 'axios'
const Profile = () => {
  const navigate=useNavigate()
  const {userData,userPosts,getPostsByUser}=useContext(Context)
  useEffect(()=>getPostsByUser,[]);
  const Logout=async()=>{
    try{
      const {data}=await axios.post('https://backend-blog-ruddy.vercel.app/api/users/logout',null,{withCredentials:true});
    if(data.success){
      alert('user Logged out successfully')
      navigate('/')
    }
    }catch(error){
      console.log(error)
    }
  }
  return (
    <div className='min-h-screen w-full sm:py-16 sm:px-16 px-8 py-8 bg-black'>
      <div className='flex flex-col gap-2 sm:px-4 sm:py-4 px-2 py-2 w-full bg-[#141414] rounded-[10px]'>
         <div className='transition-all duration-200 px-2 py-2 flex flex-row items-center gap-2'>
          <button onClick={()=>navigate('/')} className='px-4 py-1 font-varun bg-gray-700 text-white hover:bg-emerald-500 hover:text-white font-medium w-max rounded-[3px] cursor-pointer'>Home</button>
          <button onClick={Logout} className='px-4 py-1 font-varun bg-red-600 text-white font-medium w-max rounded-[3px] cursor-pointer'>Logout</button>
         </div>
         <div className='flex flex-row gap-2 px-2 py-2 items-center'>
          <div className='px-1 py-1 '>
            <img src={userData.profile_picture} alt={userData.name} className='sm:w-[100px] sm:h-[100px] w-[70px] h-[70px] object-cover rounded-full border-3 border-emerald-600'/>
          </div>
          <div className='px-2'>
            <p className='font-varun font-bold text-white text-[16px] sm:text-[18px]'>{userData.name}</p>
            <p className='font-serif  text-[14px] sm:text-[16px] text-gray-400'>{userData.about}</p>
          </div>
         </div>
         <div className='py-[1px] bg-emerald-600 rounded-full w-full'></div>
         <div className='flex sm:flex-row flex-col items-center gap-2 py-2 px-2'>
          <div className='h-[100px] w-[100px] flex justify-center items-center'>
            <CirclePlus size={40} onClick={()=>navigate('/newpost')} className='text-emerald-600 cursor-pointer rounded-full py-1 px-1 bg-[#1b1a1a]' />
          </div>
          {userPosts.map((post,index)=>(
            <div key={index} className='flex flex-col gap-2 px-2 py-2 rounded-[5px] w-full sm:w-[300px] min-h-[400px] bg-[#0f0d0d]'>
              <img src={post.image_url} alt={post.title} className='rounded-[2px] h-[200px] object-cover w-full'/>
              <div className="flex flex-col gap-1 px-1 py-1">
                  <p className="font-sans font-extrabold text-[16px] text-white">{post.title}</p>
                  <p className="font-serif text-[12px] text-gray-300">{post.description}</p>
                  <button onClick={()=>navigate(`/content/${post.post_id}`)} className="py-2 px-2 bg-emerald-500 text-black font-varun font-semibold rounded-[4px] w-max hover:bg-emerald-400 cursor-pointer">
                    Read More
                  </button>
                </div>
            </div>
          ))}
         </div>
      </div>
    </div>
  )
}

export default Profile