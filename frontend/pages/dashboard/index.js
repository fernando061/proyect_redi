// pages/dashboard/index.js
import Layout from './layout';
// import AdminGuard from '@/app/guard/adminGuard';
import { useRouter } from 'next/router'; // Reemplaza con la ruta correcta
import { getTokenData } from '@/app/service/UserService';
import { useEffect } from 'react';
const Dashboard = () => {
  const router = useRouter();
  const auth=()=>{
  
    const tokenData =  getTokenData();
    console.log(tokenData.roles)
    if (!tokenData || !tokenData.roles.includes('admin')) {
      // Si no hay token o el rol de administrador no está presente, redirige a una página de acceso denegado
      router.push('/posts');
      return null;
  }

}
useEffect(() => {
  // Verificar la autenticación aquí
  auth();
}, []);

  return (
    <Layout>
     
       
    </Layout>
  );
};

export default Dashboard;