import React, { useState, useEffect } from "react";
import { isAuthenticated } from '../../app/service/UserService'
import SideBar from "../../app/shared/components/sidebar/SideBar";
import NavBar from "../../app/shared/components/navbar/Navbar";
import CardPost from "./components/cardPost";
import {getPost} from '@/app/service/PostService'
import styles from './index.module.css';
import "tailwindcss/tailwind.css";
const Posts = () => {
  const [post, setPost] = useState([]);
    useEffect(() => {
      dataPost()
      console.log(post)
      }, []);

      const dataPost = async() =>{
        const _post = await getPost()
        console.log(_post.content)
        setPost(_post.content)
      }


  return (
    <div className="min-h-screen bg-[#151c2c] flex flex-col md:flex-row">
    <div className="bg-[#182237] text-white p-4 md:p-8">
      <SideBar />
    </div>
    <div className="flex-1 flex-shrink-0 p-4 md:p-8">
      <NavBar />
      
      <div className='mt-4 md:mt-8'></div>
      <div className='container border-neutral-500	border-solid border '>
      {
      post.map(item => (
            <CardPost key={item.id} title={item.content} imageUrl={item.photos[0].url_file} />
          ))
          
          
          }
      </div>







    </div>
  </div>
  )
}

export default Posts