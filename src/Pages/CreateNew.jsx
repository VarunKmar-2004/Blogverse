import React, { useContext, useEffect, useRef, useState } from 'react'
import '../index.css'
import 'react-quill-new/dist/quill.snow.css';
import ReactQuill from 'react-quill-new';
import { useNavigate } from 'react-router-dom'
import { ArrowUpCircleIcon, ChevronDown, StarsIcon, User2Icon, X } from 'lucide-react';
import { Context } from '../ContextAPI/ContextProvider';
import axios from 'axios';
const CreateNew = () => {
  const navigate=useNavigate()
  const {userData}=useContext(Context)
  const [dropdownOpen,setDropdownOpen]=useState(false)
  const [item,setItem]=useState('Life Style')
  const [aiOpen,setAiOpen]=useState(true)
  const [formdata,setFormData]=useState({
    user_id:userData._id,
    title:"",
    description:"",
    content:"",
    category:item,
    created_at:new Date().toISOString().split("T")[0],
    image_url:null
  })
  const [chatHistory,setChatHistory]=useState([])
  const inputref=useRef()
  const chatBodyref=useRef()
  const handleChange=(e)=>{
    const {name,value}=e.target;
    setFormData({...formdata,[name]:value});
  }
  const handleQuillChange=(content)=>{
    setFormData((prevFormData) => ({
    ...prevFormData,
    content: content, // This is the HTML content from the editor
  }));
  }
  const handleFileChange=(e)=>{
    setFormData({...formdata,image_url:e.target.files[0]});
  }
  const handleSubmit=async(e)=>{
    e.preventDefault()
    axios.defaults.withCredentials = true;
    let url="https://backend-blog-ruddy.vercel.app/api/users/newposts";
    try{
      let response;
      const formDataToSend = new FormData();
      Object.keys(formdata).forEach((key) => {
      formDataToSend.append(key, formdata[key]);
      });
      response = await axios.post(url, formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      const { data } = response;
      if (data.success) {
        navigate("/");
        } else {
          alert(data.message);
        }
        // Reset form data
        setFormData({
          user_id:userData._id,
          title:"",
          description:"",
          content:"",
          category:item,
          created_at:'',
          image_url:null
        });
      } catch (error) {
        alert(`Error:${error.response?.data?.message || error.message}`);
      }
    }
    const handleBotSubmit=(e)=>{
      e.preventDefault()
      const userMessage=inputref.current.value.trim()
      if (!userMessage) return;
      inputref.current.value='';
      setChatHistory(prev => [...prev, { role: 'user', text: userMessage }]);
      setTimeout(()=>setChatHistory((history)=>[...history,{role:'model',text:'Analyzing...'}]),600)
      generateResponse([...chatHistory,{role:'user',text:userMessage}]);
    }
    const generateResponse=async(history)=>{
      const updateHistory=(text)=>{
        setChatHistory((prev)=>[...prev.filter(msg=>msg.text!=='Analyzing...'),{role:'model',text}])
      }
      history=history.map(({role,text})=>({role,parts:[{text}]}));
      const requestOptions={
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({contents:history})
      }
      try{
         const response=await fetch(import.meta.env.VITE_API_URL,requestOptions)
         const data=await response.json()
         if(!response.ok) throw new Error(data.error.message || 'something went wrong')
         const apiResponseText=data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g,"$1").trim()
        updateHistory(apiResponseText)
      }catch(error){
         console.log(error)
      }
    }
    useEffect(()=>{
       chatBodyref.current.scrollTo({top:chatBodyref.current.scrollHeight,behaviour:'smooth'});
    },[chatHistory])
  return (
    <div className='bg-black py-8 px-8 sm:py-16 sm:px-16 flex sm:flex-row flex-col gap-3 justify-center items-center w-[100%] min-h-screen overflow-y-auto'>
        <div className='bg-[#141414] px-2 py-2 sm:px-4 sm:py-4 rounded-[10px] flex flex-col w-[100%]'>
            <div className='flex flex-row items-center gap-2 px-2 py-2'>
                <p className='font-varun font-medium text-white px-2 py-1 bg-emerald-600 rounded-[3px] shadow-sm hover:shadow-emerald-400 hover:cursor-pointer transition-all duration-500'>New Post</p>
                <p className='font-medium text-white text-[20px] transform scale-y-150 mt-[-6px]'>|</p>
                <p onClick={()=>navigate('/')} className='px-4 py-1 text-[#838080c2] rounded-[3px] font-varun font-medium bg-[#232222c2] hover:cursor-pointer hover:bg-emerald-600 hover:text-white transition-all duration-300'>Home</p>
            </div>
            <div className='mt-2.5 w-full'>
                <form className='flex flex-col gap-[20px] py-2 w-full' onSubmit={handleSubmit} encType="multipart/form-data">
                  <div className="relative w-full">
                    <input type="text" name="title" onChange={handleChange} required className="peer h-10 sm:h-12 w-full border-2 border-[#efe4e4] bg-transparent px-3 sm:text-[17px] text-[16px] text-base text-white placeholder-transparent outline-none transition-all duration-200 focus:border-emerald-400 rounded-[5px] font-varun font-semibold" />
                    <label className="absolute left-3 sm:top-3 top-2 text-white text-base transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-12px] bg-[#141414] px-2 peer-focus:text-sm peer-valid:top-[-12px] peer-valid:text-sm">Blog Title</label>
                  </div>
                  <div className="relative w-full">
                    <textarea name="description" onChange={handleChange} required className="peer sm:h-16 py-2 w-full border-2 border-[#efe4e4] bg-transparent px-3 sm:text-[17px] text-[16px]  text-base text-white placeholder-transparent outline-none transition-all duration-200 focus:border-emerald-400 rounded-[5px] font-varun font-semibold"></textarea>
                    <label htmlFor='short Description' className="absolute left-3 top-3 text-white text-base transition-all duration-200 peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-base peer-focus:top-[-12px] bg-[#141414] px-2 peer-focus:text-sm peer-valid:top-[-12px] peer-valid:text-sm">Short Description</label>
                  </div>
                  <div className='relative w-full flex flex-row items-center gap-3'>
                    <label htmlFor='category' className='font-varun font-semibold text-[15px] sm:text-[17px] text-white'>Category : </label>
                    <p 
                    onMouseOver={() => setDropdownOpen((prev) => !prev)}
                    className=" font-varun font-semibold text-[15px] sm:text-[17px] text-white bg-[#201e1e] rounded-[3px] px-3 py-1 hover:text-shadow-amber-50 hover:cursor-pointer flex flex-row items-center gap-3"
                    >
                    {item}
                    <ChevronDown
                    className={`mt-1 transition-transform duration-200 ${
                    dropdownOpen ? "rotate-180" : ""
                    }`}
                    />
                    </p>

                  {dropdownOpen && (
                    <div className="absolute top-10 left-20 mt-2 bg-[#1f1f1f] text-white shadow-lg rounded-lg z-10 py-2 w-40">
                      <p className="px-4 py-2 hover:bg-emerald-700 hover:cursor-pointer font-varun"onClick={()=>{setItem('Travelling');setFormData(prev => ({ ...prev, category: 'Travelling' }))}}>Travelling</p>
                      <p className="px-4 py-2 hover:bg-emerald-700 hover:cursor-pointer font-varun" onClick={()=>{setItem('AI Revolution');setFormData(prev => ({ ...prev, category: 'AI Revolution' }))}}>AI Revolution</p>
                      <p className="px-4 py-2 hover:bg-emerald-700 hover:cursor-pointer font-varun" onClick={()=>{setItem('Coding');setFormData(prev => ({ ...prev, category: 'Coding' }))}}>Coding</p>
                    </div>
                  )}
                  </div>
                  <div className='flex flex-col sm:flex-row gap-2 items-start sm:items-center mt-2 w-full'>
                    <label htmlFor='File' className='font-varun font-semibold text-[15px] sm:text-[17px] text-white'>Upload Picture:</label>
                    <input type='file' name='image_url' onChange={handleFileChange} className='w-full sm:w-auto bg-white text-black font-varun font-normal sm:text-[17px] text-[16px] py-2 px-4 rounded-[3px] cursor-pointer'/>
                  </div>

                   <div>
                    <ReactQuill name='content'  theme="snow" className="bg-[#1a1919] rounded-md min-h-[150px] sm:min-h-[200px] text-white font-varun font-normal border-2 border-emerald-400" onChange={handleQuillChange} value={formdata.content}/>
                   </div>
                   <div className='mt-2 flex flex-row sm:items-center sm:justify-start justify-center  gap-3'>
                    <button className='w-full sm:w-auto sm:px-5  px-2 py-1 font-varun font-medium text-white text-[15px] sm:text-[17px] bg-emerald-500 rounded-[3px] shadow-sm hover:shadow-emerald-400 hover:cursor-pointer transition-all duration-200'>Post</button>
                    <button className='w-full sm:w-auto sm:px-5  px-2 py-1 font-varun font-medium text-white text-[15px] sm:text-[17px] bg-blue-500 rounded-[3px] shadow-sm hover:shadow-emerald-400 hover:cursor-pointer transition-all duration-200'>Draft</button>
                    {!aiOpen?<p className='w-full sm:w-auto sm:px-5 flex flex-row items-center gap-2  px-2 py-1 font-varun font-medium text-white text-[14px] sm:text-[15px] bg-gradient-to-r from-purple-500 via-blue-500 to-pink-500 hover:cursor-pointer transition-all duration-200 rounded-[3px]' onClick={()=>setAiOpen(!aiOpen)}>Ask AI <StarsIcon className='text-[#fad348]'/></p>:''}
                   </div>
                </form>
            </div>
        </div>
        {aiOpen?
         (
          <div className='w-full bg-[#141414] px-2 py-2 sm:px-4 sm:py-4 rounded-[10px]'>
          <h1 className='font-varun font-medium text-emerald-600 text-[16px] sm:text-[18px] px-2 flex flex-row items-center justify-between'>Genrate Through AI<X className='text-black hover:text-white bg-emerald-500 rounded-full cursor-pointer px-1 py-1' onClick={()=>setAiOpen(!aiOpen)}/></h1>
          <div className='flex flex-col gap-2 px-2 py-2'>
            <div ref={chatBodyref} className='w-full flex flex-col sm:h-[460px] h-[300px] overflow-y-auto py-2 px-2 gap-3 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-gray-800  [&::-webkit-scrollbar-thumb]:bg-emerald-500  [&::-webkit-scrollbar-thumb]:rounded-full'>
              <div className='flex flex-row items-center gap-2 bg-emerald-200 w-max max-w-[80%] px-3 py-2 rounded-lg'>
                <StarsIcon size={20} className='text-[#fbd827] flex-shrink-0' />
                <p className='text-sm sm:text-base font-medium break-words font-varun'>Hi there,How Can I help you</p>
              </div>
              {chatHistory.map((chat,index)=>
                (chat.role==='model'?(
                  <div key={index} className='flex flex-row items-center gap-2 bg-emerald-200 max-w-[90%] sm:max-w-[400px] px-3 py-2 rounded-lg break-words'>
                    <StarsIcon size={20} className='text-[#fbd827] flex-shrink-0' />
                    <p className='text-sm sm:text-base font-medium break-words whitespace-pre-wrap'>
                    {chat.text}
                    </p>
                  </div>):
                ( <div className='flex justify-end px-2' key={index}>
                    <div className='flex flex-row items-center gap-2 bg-emerald-400 max-w-[90%] px-3 py-2 rounded-lg break-words'>
                      <p className='text-sm sm:text-base font-medium break-words whitespace-pre-wrap font-varun'>
                        {chat.text}
                      </p>
                      <User2Icon size={20} className='text-[#fbd827] flex-shrink-0' />
                    </ div>
                  </div>))
              )}
            </div>
            <form onSubmit={handleBotSubmit} className='flex flex-row items-center gap-2 w-full'>
               <input ref={inputref} className='w-full py-2 px-2 bg-[#1c1a1a] rounded-[10px] text-white text-[15px] sm:text-[16px] placeholder:text-white font-varun font-normal border-0 outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-0' type='text' placeholder='Enter here..'/>
               <button className='px-1 py-1 rounded-full bg-emerald-500 text-white transition-all duration-200 cursor-pointer'><ArrowUpCircleIcon className='text-[18px] hover:text-black'/></button>
            </form>
          </div>
        </div>
            ):('')}
    </div>
  )
}

export default CreateNew