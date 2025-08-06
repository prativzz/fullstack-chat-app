import React from 'react';
import Navbar from './assets/components/Navbar';
import HomePage from './assets/pages/HomePage';
import LoginPage from './assets/pages/LoginPage';

import SignUpPage from './assets/pages/SignUpPage';
import ProfilePage from './assets/pages/ProfilePage';
import { Loader } from "lucide-react"; 
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuthStore } from './assets/store/useAuthStore';
import { useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { BrowserRouter } from "react-router-dom";
import Contacts from './assets/pages/Contacts';
import About from './assets/pages/About';
const App = () => {
const {authUser,checkAuth,isCheckingAuth}=useAuthStore();
useEffect(()=>{
  checkAuth();
},[checkAuth])
console.log(authUser)

if(isCheckingAuth && !authUser){
return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="animate-spin w-12 h-12 text-blue-500" />
    </div>
  );
}
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser? <HomePage /> : <Navigate to="/login"/>} />
        <Route path="/signup" element={!authUser? <SignUpPage /> : <Navigate to="/"/>} />
        <Route path="/login" element={!authUser? <LoginPage /> : <Navigate to="/"/>} />
       
        <Route path="/profile" element={authUser? <ProfilePage /> : <Navigate to="/login"/>} />
        <Route path="/contact" element={authUser? <Contacts /> : <Navigate to="/login"/>} />
        <Route path="/about" element={authUser? <About /> : <Navigate to="/login"/>} />
      </Routes>
      <Toaster/>
    </div>
  );
};

export default App;
