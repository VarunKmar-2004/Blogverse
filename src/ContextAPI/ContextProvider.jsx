import React, { createContext, useEffect, useState} from "react";
import axios from 'axios'
const Context = createContext();
const ContextProvider = ({children}) => {
  axios.defaults.withCredentials=true;
  const [isLoggedIn,setIsLoggedIn]=useState(false);
  const [userData,setUserData]=useState({});
  const [posts, setPosts] = useState([]); // <-- FIXED: declared posts state
  const [totalPages, setTotalPages] = useState(1); // <-- FIXED: declared totalPages state
//   const [posts,setPosts]=useState([]);
  const [userPosts,setUserPosts]=useState([]);
  const [category,setCategory]=useState('All');
  const isAuthenticated=async()=>{
    try{
      const {data}=await axios.get('https://backend-blog-ruddy.vercel.app/api/home/is-auth');
      if(data.success){
          setIsLoggedIn(true);
          getUser();
      }
    }catch(err){
      alert(err.message);
    }
  }
  const getUser=async()=>{
    try{
      const {data}=await axios.get('https://backend-blog-ruddy.vercel.app/api/home/userData',{ withCredentials: true });
      console.log(data);
      if(data && data.userData){
        setIsLoggedIn(true)
        setUserData(data.userData);
      }
    }catch(err){
      alert(err.meassage);
    }
  }
const getAllPosts = async (category = 'All', page = 1, limit = 5) => {
  try {
    const baseUrl = 'https://backend-blog-ruddy.vercel.app/api/home/posts';
    let query = `?page=${page}&limit=${limit}`;
    
    if (category !== 'All') {
      query += `&category=${encodeURIComponent(category)}`;
    }

    const { data } = await axios.get(baseUrl + query, { withCredentials: true });
    console.log(data)
    if (data && data.success) {
      setPosts(data.result); // assuming result includes paginated posts
      setTotalPages(data.totalPages); // if backend sends this
    }
  } catch (err) {
    alert(err.message);
  }
};

   const getPostsByUser=async()=>{
      try{
       const {data}=await axios.get('https://backend-blog-ruddy.vercel.app/api/home/user-posts',{withCredentials:true});
       if(data && data.success){
         setUserPosts(data.result);
         console.log(data.result);
       }
     }catch(err){
       alert(err.message);
     }

   }
  useEffect(()=>{
    isAuthenticated();
  },[]);
  return (
    <Context.Provider value={{userData,setUserData,isLoggedIn,setIsLoggedIn,getUser,category,setCategory,getAllPosts,setPosts,setTotalPages,posts,totalPages,userPosts,setUserPosts,getPostsByUser}}>
      {children}
    </Context.Provider>
  );
};
export { Context, ContextProvider };