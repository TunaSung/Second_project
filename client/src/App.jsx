import './App.css'
import NavbarFixed from './components/Layout/NavbarFixed'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import FixedMessage from './components/Feature/FixedMessage'
import { useState, useEffect, lazy, Suspense } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { clearToken, setAuthHeader } from './services/authService' 
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'ldrs/dotStream'

const Home = lazy(() => import('./pages/Home')); 
const Product = lazy(() => import('./pages/Product'));
const Sign = lazy(() => import('./pages/Sign'))
const Personal = lazy(() => import('./pages/Personal'))
const MyShop = lazy(() => import('./pages/MyShop'))


// Dynamically adjust navbar
function DynamicNavbar() { 
  const location = useLocation();
  
  if (location.pathname === "/") {
    return <NavbarFixed />;
  }
  return <Navbar />;
}

 function ScrollToTop() {
    const location = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  }

function App() {

  useEffect(() => {
    setAuthHeader()
  },[])

  useEffect(() => {
    const EXPIRE_MS = 60*60*1000 // 一小時
    const ts = Number(localStorage.getItem('tokenSaveAt'))
    const now = Date.now() // 頁面刷新後會重算

    if(!ts || now-ts > EXPIRE_MS){ //過一小時後自動
      clearToken()
    }else{
      const timeout = setTimeout(() => {
        clearToken()
      }, EXPIRE_MS - (now-ts))

      return () => clearTimeout(timeout) // 刷新時就取消計時器，避免記憶體浪費
    }
  }, [])

  return (
    <Router>
      <ScrollToTop/>
      <ToastContainer position="top-right" autoClose={3000} />
      <FixedMessage/>
      <DynamicNavbar />
      <Suspense fallback={<div className="w-full h-[50vh] flex items-center justify-center text-center my-60"> 
                            <l-dot-stream
                            size="60"
                            speed="2.5"
                            color="black" 
                            ></l-dot-stream>
                        </div>}>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/product" element={<Product />}/>
          <Route path="/sign" element={<Sign />}/>
          <Route path="/personal" element={<Personal />}/>
          <Route path="/my-shop" element={<MyShop />}/>
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  )
}

export default App
