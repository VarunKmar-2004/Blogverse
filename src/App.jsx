import { BrowserRouter as Router, Routes, Route,useLocation,useNavigate, matchPath } from 'react-router-dom'
import Home from './Pages/Home'
import React, { useEffect,useRef } from 'react';
import { ScrollContext } from './ContextAPI/ScrollContext';
import { LogIn } from 'lucide-react'
import Login from './Pages/Login'
import AOS from 'aos';
import 'aos/dist/aos.css';
import CreateNew from './Pages/CreateNew';
import Navbar from './components/Navbar';
import Content from './Pages/Content';
import Profile from './Pages/Profile';
import ErrorPage from './Pages/ErrorPage';
import About from './Pages/About';
const AOSInitializer = () => {
  const location = useLocation();

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true, // animate only once
      easing: 'ease-in-out',
    });
  }, []);

  useEffect(() => {
    AOS.refresh(); // refresh on route change
  }, [location]);

  return null;
};
function App() {
  const postsRef = useRef();
  const location = useLocation();
  const navigate = useNavigate();

  const scrollTo = (section) => {
    const refs = {
      post:postsRef,
    };

    if (location.pathname === '/') {
      refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/', { replace: false });

      setTimeout(() => {
        refs[section]?.current?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };
   const hideNavbarRoutes = ['/login', '/newpost','/content/:id','/profile','/error','/about'];
   const shouldHideNavbar = hideNavbarRoutes.some((route) =>
  matchPath(route, location.pathname)
);
  const showNavbar = !shouldHideNavbar;

  return (
    <>
     <ScrollContext.Provider value={{postsRef, scrollTo }}>
     {showNavbar && <Navbar />}
      <AOSInitializer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/newpost" element={<CreateNew />} />
        <Route path='/content/:id' element={<Content/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/error' element={<ErrorPage/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </ScrollContext.Provider>
    </>
  )
}

export default App
