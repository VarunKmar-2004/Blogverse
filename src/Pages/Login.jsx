import { LockKeyhole, PictureInPictureIcon, User2 } from 'lucide-react'
import React,{useContext, useState} from 'react'
import '../Styles/login.css'
import { Context } from '../ContextAPI/ContextProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const userStatus=useContext(Context)
  const navigate=useNavigate();
  const [loginstatus,setLoginStatus]=useState('login')
  const [formData,setFormData]=useState({
    fullName:'',
    password:'',
    email:'',
    about:'',
    profile_pic:null
  })
  const handleChange=(e)=>{
      const {name,value}=e.target;
      setFormData({...formData,[name]:value});
    }
const handleFileChange=(e)=>{
      setFormData({...formData,profile_picture:e.target.files[0]});
    }
const handleSubmit=async(e)=>{
  e.preventDefault();
   axios.defaults.withCredentials = true;
   let url =
        loginstatus === "login"
          ? "https://backend-blog-ruddy.vercel.app/api/users/login"
          : "https://backend-blog-ruddy.vercel.app/api/users/register"
   try{
    let response;
    if(loginstatus==='login'){
      response=await axios.post(
            url,
            { email: formData.email, password: formData.password },
            { withCredentials: true, headers: { "Content-Type": "application/json" } }
          );
    }
    else {
          // Registration request (FormData for file upload)
          const formDataToSend = new FormData();
          Object.keys(formData).forEach((key) => {
            formDataToSend.append(key, formData[key]);
          });
    
          response = await axios.post(url, formDataToSend, {
            headers: { "Content-Type": "multipart/form-data" },
          });
        }
    
        const { data } = response;
    
        if (data.success) {
          await userStatus.getUser();
          userStatus.setIsLoggedIn(true);  // ✅ Correct way to update state
          navigate("/");
        } else {
          alert(data.message);
        }
    
        // Reset form data
        setFormData({
          fullName: "",
          email: "",
          password: "",
          about: "",
          profile_pic: null,
        });
      } catch (error) {
        alert(`Error:${error.response?.data?.message || error.message}`);
      }

   }
  return (
    <div className='h-screen w-full sm:py-16 sm:px-8 py-8 px-4 flex justify-center items-center bg-[#121010f2]'>
        <div className='wrapper'>
          <div className='header'>
            <h1 className='font-varun font-semibold text-2xl'>{loginstatus==='login'?'Login':'SignUp'}</h1>
          </div>
          <form onSubmit={handleSubmit} encType="multipart/form-data" className='flex flex-col px-4 py-4 mx-auto '>
            <div className='input-box'>
              <input name='email' onChange={handleChange} type="email" required></input>
              <label htmlFor='Email' className='font-varun'>Email</label>
              <User2 className='icon'></User2>
            </div>
            <div className='input-box'>
              <input name='password' onChange={handleChange} type="password" required></input>
              <label htmlFor='Password' className='font-varun'>Password</label>
              <LockKeyhole className='icon'></LockKeyhole>
            </div>
            {loginstatus==='login'?"":(
              <>
               <div className='input-box'>
                 <input name='fullName' onChange={handleChange} type="text" required></input>
                 <label htmlFor='Name' className='font-varun'>Name</label>
               </div>
               <div className='input-box'>
                 <input name='about' onChange={handleChange} type="text" required></input>
                 <label htmlFor='About' className='font-varun'>About</label>
              </div>
              <div className="mt-4 w-full px-2 sm:px-4">
                <label htmlFor="profile" className="block text-[16px] sm:text-[17px] font-varun text-white mb-2">Profile Pic:</label><input name='profile_picture' onChange={handleFileChange}  id="profile"   type="file" required className="w-full sm:w-auto max-w-full outline-none text-black font-varun font-semibold bg-[#00ff8c] rounded-[5px] py-2 px-3 text-sm sm:text-base hover:cursor-pointer transition-all duration-200 file:bg-[#00ff8c] file:text-black file:font-semibold file:rounded file:border-none"/>
              </div>

              </>
            )}
            {loginstatus==='login'?(
              <div className='mt-[20px]'>
                <p className=' font-varun font-medium text-white text-[14px] hover:cursor-pointer hover:text-[#00ff8c] hover:underline transition duration-150'>Forgot Password?</p>
            </div>
            ):""}
            <div className='login-btn'>
              <button className='font-varun font-bold'>{loginstatus==='login'?"Login":"SignUp"}</button>
            </div>
            <div className='mt-2 text-center'>
              <p className='font-varun font-medium text-[13px] text-white'>{loginstatus==='login'?"Don't  have an account ?":"Already have an account"}<span onClick={()=>setLoginStatus((prev)=>prev==='login'?"SignUp":'login')} className='text-[#00ff8c] hover:cursor-pointer hover:underline'>{loginstatus==='login'?'SignUp':'Login'}</span></p>
            </div>
          </form>  
        </div>
    </div>
  )
}

export default Login