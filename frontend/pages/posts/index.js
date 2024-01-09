import React, { useState, useEffect } from "react";
import { isAuthenticated } from '../../app/service/UserService'
import SideBar from "../../app/shared/components/sidebar/SideBar";
import NavBar from "../../app/shared/components/navbar/Navbar";
import CardPost from "./components/cardPost";
import styles from './index.module.css';
import "tailwindcss/tailwind.css";
const Posts = () => {

    useEffect(() => {
        // Verificar la autenticación aquí
        // const _isAuthenticated = isAuthenticated();
        // console.log("Hola",_isAuthenticated)
        // if (!_isAuthenticated) {
        //   router.push('/login'); 
        // }
      }, []);


  return (
    <div className="min-h-screen bg-[#151c2c] flex flex-col md:flex-row">
    <div className="bg-[#182237] text-white p-4 md:p-8">
      <SideBar />
    </div>
    <div className="flex-1 flex-shrink-0 p-4 md:p-8">
      <NavBar />
      
      <div className='mt-4 md:mt-8'></div>
      <div className='container border-neutral-500	border-solid border h-screen'>

        <CardPost/>
        <CardPost/>
        <CardPost/>
      </div>







    </div>
  </div>
  )
}

export default Posts