import React, { useState, useEffect, useContext } from 'react';
import { ChevronDown, SearchIcon } from 'lucide-react';
import { Context } from '../ContextAPI/ContextProvider';
import { useNavigate } from 'react-router-dom';

const Posts = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState('All');
  const { getAllPosts, totalPages, posts,isLoggedIn } = useContext(Context);
  const [currentPage, setCurrentPage] = useState(1);
  const navigate=useNavigate()
  useEffect(() => {
    getAllPosts(selected, currentPage, 10);
  }, [selected, currentPage]);

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };
  const handleNavigate=(postId)=>{
    if(isLoggedIn){
      navigate(`/content/${postId}`)
    }
    else{
      navigate('/error')
    }
  }

  return (
    <>
      <div className="flex flex-col py-2 px-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
          {/* Dropdown */}
          <div className="relative mt-[15px] w-full sm:w-auto">
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="flex items-center justify-between w-full sm:w-40 cursor-pointer rounded-lg px-3 py-2 bg-emerald-500 text-white shadow transition"
            >
              <p className="text-sm sm:text-base font-varun font-medium">{selected}</p>
              <ChevronDown
                className={`h-5 w-5 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : 'rotate-0'}`}
              />
            </div>

            {isOpen && (
              <div className="absolute z-10 mt-2 w-full sm:w-40 rounded-lg bg-[#141414] border shadow-lg py-2 px-2">
                {['All', 'Life Style', 'AI Revolution', 'Coding', 'Travelling'].map((label) => (
                  <p
                    key={label}
                    className="py-1 px-2 text-sm sm:text-base font-varun font-normal text-white cursor-pointer hover:bg-emerald-400 hover:text-black rounded"
                    onClick={() => {
                      setSelected(label);
                      setIsOpen(false);
                    }}
                  >
                    {label}
                  </p>
                ))}
              </div>
            )}
          </div>

          {/* Search */}
          <form className="flex items-center gap-2 bg-[#141414] px-3 py-2 rounded-lg shadow w-full">
            <input
              type="text"
              placeholder="Search By Post..."
              className="bg-transparent text-white placeholder-gray-400 outline-none flex-grow py-2"
            />
            <button type="submit" className="text-white hover:text-emerald-400 transition">
              <SearchIcon className="h-5 w-5" />
            </button>
          </form>
        </div>
      </div>

      {/* Posts Grid */}
      <div className="bg-[#141414] w-full py-4 px-2 rounded-[10px] mt-[20px] flex flex-col gap-2">
        <div className="px-2 py-2 flex flex-wrap gap-4">
          {posts.map((post, index) => (
            <div
              key={index}
              className="flex flex-col gap-2 rounded-[4px] w-full sm:w-[300px] min-h-[400px] px-2 py-2 bg-[#0f0d0d]"
            >
              <img
                src={post.image_url}
                alt="Post"
                className="rounded-[2px] h-[200px] object-cover w-full"
              />
              <div className="flex flex-col gap-1">
                <div className="flex flex-row items-center gap-2">
                  <img
                    src={post.profile_pic}
                    alt="user"
                    className="w-[30px] h-[30px] rounded-full bg-cover hover:cursor-pointer"
                  />
                  <p className="text-white font-varun font-medium hover:cursor-pointer">{post.fullName}</p>
                </div>
                <div className="flex flex-col gap-1 px-1 py-1">
                  <p className="font-sans font-extrabold text-[16px] text-white">{post.title}</p>
                  <p className="font-serif text-[12px] text-gray-300">{post.description}</p>
                  <button onClick={()=>handleNavigate(post.post_id)} className="py-2 px-2 bg-emerald-500 text-black font-varun font-semibold rounded-[4px] w-max hover:bg-emerald-400 cursor-pointer">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center gap-2 py-2 flex-wrap">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 hover:cursor-pointer disabled:opacity-50"
            disabled={currentPage === 1}
          >
            Prev
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, index) => {
            let pageNumber = index + 1;
            if (currentPage > 3 && totalPages > 5) {
              const shift = Math.min(currentPage - 3, totalPages - 5);
              pageNumber += shift;
            }

            return (
              <button
                key={pageNumber}
                onClick={() => handlePageChange(pageNumber)}
                className={`px-3 py-1 rounded ${
                  pageNumber === currentPage
                    ? 'bg-emerald-600 text-white font-bold'
                    : 'bg-gray-700 text-white hover:bg-gray-600'
                }`}
              >
                {pageNumber}
              </button>
            );
          })}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-3 py-1 bg-gray-700 text-white rounded hover:bg-gray-600 hover:cursor-pointer disabled:opacity-50"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default Posts;
