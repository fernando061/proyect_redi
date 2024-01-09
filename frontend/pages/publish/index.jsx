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
    console.log("Hola", _isAuthenticated)
    if (!_isAuthenticated) {
      router.push('/login');
    }
  }, []);


  return (
    <div className="min-h-screen bg-[#151c2c] flex flex-col md:flex-row">
      <div className="bg-[#182237] text-white p-4 md:p-8">
        <SideBar />
      </div>
      <div className="flex-1 flex-shrink-0 p-4 md:p-8">
        {/* <NavBar /> */}
        <div className={styles.title}>
          <h1 className='text-right'>Publicaciones</h1>
          <hr className="mt-2 md:mt-4" />
          <div className='mt-5'>
            <button className={styles.btn}
            onClick={() => router.push('/publish/register')}>Add</button>
          </div>
        </div>
        <div className='mt-4 md:mt-8'></div>
        <div className={styles.container}>

          <h1>Publications</h1>
        </div>







      </div>
    </div>
  );
}

export default Index