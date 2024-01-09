import React from 'react'
import SideBar from "../../../app/shared/components/sidebar/SideBar";
import styles from '../index.module.css';
import dynamic from 'next/dynamic'
import "tailwindcss/tailwind.css";
import  MyForm  from '../components/form';
// const NoSSR = dynamic(() => import('../components/form'), { ssr: false })

const Index = () => {
  return (
    <div className="flex bg-[#151c2c]">
          <div className="flex-20 bg-[#182237] p-20 min-h-screen text-white">
            <SideBar />
          </div>
          <div className="flex-1 p-4 md:p-8 ">
            {/* <NavBar /> */}
            <div className={styles.title}>
                <h1 className='text-left'>Register</h1>
                <hr />
            </div>S
            <div className='mt-20'></div>
            <div className={styles.container}>

              <MyForm/>

             
            </div>

          </div>
        </div>
  )
}

export default Index