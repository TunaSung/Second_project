import './App.css'
import Navbar from './components/Layout/Navbar'
import Footer from './components/Layout/Footer'
import FixedMessage from './components/Feature/FixedMessage'
import { useState, useEffect, lazy, Suspense} from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom"; 
import 'ldrs/dotStream'

const Home = lazy(() => import('./pages/Home')); 
const Product = lazy(() => import('./pages/Product'));
const Sign = lazy(() => import('./pages/Sign'))

function App() {

  function ScrollToTop() {
    const location = useLocation()

    useEffect(() => {
      window.scrollTo(0, 0);
    }, [location]);

    return null;
  }

  return (
    <Router>
      <ScrollToTop/>
      <FixedMessage/>
      <Navbar />
      <Suspense fallback={<div className="w-full h-[100vh] flex items-center justify-center text-center my-60"> 
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
        </Routes>
      </Suspense>
      <Footer/>
    </Router>
  )
}

export default App
