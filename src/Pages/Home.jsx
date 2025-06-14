import React from 'react'
import Spline from '@splinetool/react-spline';
import { ArrowDown } from 'lucide-react';
import Posts from '../components/Posts';
import { useScroll } from '../ContextAPI/ScrollContext';
import Footer from '../components/Footer';

const Home = () => {
  const { postsRef,homeRef,scrollTo } = useScroll();
  function isWebGLAvailable() {
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch (error) {
    return error;
  }
}

  return (
    <>
    <div className='min-h-screen w-[100%] py-[16px] px-[24px] bg-black flex flex-col  gap-[20px] overflow-y-auto '>
        <div ref={homeRef} className='w-[100%] h-screen relative px-2 flex justify-center items-center overflow-hidden'>
          {isWebGLAvailable()?(
            <Spline className='w-auto' scene="https://prod.spline.design/HDsXi6xfTDLF3Ags/scene.splinecode" />
          ):( '')}
          
          <div className='absolute z-10 flex flex-col items-center'>
            <h1 data-aos="fade-right" data-dao-duration='1500' className='font-varun font-bold text-3xl sm:text-4xl text-white text-center'>Welcome to BlogVerse...</h1>
            <p data-aos="fade-left" data-dao-duration='1700'  className='font-varun font-semibold text-md sm:text-lg text-emerald-500 text-center mt-[20px]'>-Where Ideas Spark and Stories Shine.</p>
            <button onClick={()=>scrollTo('post')} data-aos="fade-up" data-dao-duration='2000' className='bg-emerald-600 rounded-full shadow-sm hover:shadow-emerald-400 transition-shadow duration-300 cursor-pointer text-center px-2 py-2 mt-5'><ArrowDown size={28} className='text-black font-bold'/></button>
          </div>
        </div>
        <section ref={postsRef} className='min-h-screen w-full  sm:px-20 sm:py-28 px-2 py-2'>
          <Posts/>
        </section>
        <Footer/>
    </div>
    </>
  )
}

export default Home