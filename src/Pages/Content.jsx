import React, { useEffect,useState } from 'react'
import { useNavigate,useParams } from 'react-router-dom'
import axios from "axios";
import '../Styles/post.css'

const Content = () => {
    const navigate=useNavigate()
    const { id } = useParams();
    const [post, setPost] = useState(null);
    const fetchPost=async(id)=>{
       try {
      const { data } = await axios.get(`https://backend-blog-ruddy.vercel.app/api/home/posts/${id}`);
      setPost(data);
    } catch (error) {
      console.error("Error fetching post:", error);
    }
    }
   useEffect(() => {
    if (id) {
      fetchPost(id);
    }
  }, [id]);
  return (
    <div className='bg-black py-8 px-8 sm:py-16 sm:px-16 flex flex-col gap-3 w-[100%] min-h-screen overflow-y-auto'>
        <div className='bg-[#141414] px-2 py-2 sm:px-4 sm:py-4 rounded-[10px] flex flex-col w-[100%]'>
            <div className='px-2 py-2'>
                <p onClick={()=>navigate('/')} className='px-4 py-1 text-[#838080c2] rounded-[3px] font-varun font-medium bg-[#232222c2] hover:cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300 w-max'>Home</p>
            </div>
            {post ? (
        <div className='py-2 w-full px-2 flex sm:flex-row flex-col gap-3'>
  {/* Post image (fixed width on sm and above) */}
  <div className='flex-shrink-0 w-full sm:w-[300px]'>
    <img
      src={post.image_url}
      alt='Image'
      className='w-full h-auto object-cover rounded-[4px]'
    />
  </div>

  {/* Post content */}
  <div className='flex flex-col gap-2 flex-1'>
    {/* Author info */}
    <div className='flex flex-row items-center gap-2'>
      <img
        src={post.user_id.profile_pic}
        alt='profile'
        className='w-[40px] h-[40px] object-cover rounded-full border-3 border-emerald-600'
      />
      <p className='font-varun font-semibold text-white text-[14px] sm:text-[16px]'>
        {post.user_id.fullName}
      </p>
    </div>

    {/* Title + Content */}
    <div className='px-2 py-2 flex flex-col gap-2'>
      <h1 className='text-white text-[16px] sm:text-[18px] font-varun font-extrabold underline'>
        {post.title}
      </h1>
      <div
        className='post-content text-white'
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </div>
  </div>
</div>

      ) : (
        <p className="text-white">Loading...</p>
      )}
        </div>
    </div>
  )
}

export default Content