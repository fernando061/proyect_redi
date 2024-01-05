import { useRouter } from 'next/router';
import NavBar from "../../app/shared/components/navbar/Navbar"
import SideBar from "../../app/shared/components/sidebar/SideBar";
import { useEffect } from 'react';
import { isAuthenticated } from '../../app/service/UserService'
import styles from './index.module.css';

const Index = () => {
    const router = useRouter();
    useEffect(() => {
        const _isAuthenticated = isAuthenticated();
        console.log("Hola",_isAuthenticated)
        if (!_isAuthenticated) {
          router.push('/login'); 
        }
      }, []);


      return (
        <div className="flex bg-[#151c2c]">
          <div className="flex-20 bg-[#182237] p-20 min-h-screen text-white">
            <SideBar />
          </div>
          <div className="flex-1 p-4">
            {/* <NavBar /> */}
            <div className={styles.title}>
                <h1 className='text-right'>Publicaciones</h1>
                <hr />
                <div className='mt-5'>
                    <button className={styles.btn}><a href="publish/register">Add</a></button>
                </div>
            </div>
            <div className='mt-20'></div>
            <div className={styles.container}>

                <h1>Publications</h1>
            </div>







          </div>
        </div>
      );
}

export default Index