import { useRouter } from 'next/router'; // Reemplaza con la ruta correcta
import {getTokenData} from '../service/UserService'
const AdminGuard = (WrappedComponent) => {
  const WithAdmin = (props) => {
    const router = useRouter();
    const tokenData =  getTokenData();
    console.log(tokenData.roles)
    if (!tokenData || !tokenData.roles.includes('admin')) {
      // Si no hay token o el rol de administrador no está presente, redirige a una página de acceso denegado
      router.push('/posts');
      return null;
    }

    // Si el usuario tiene permisos de administrador, renderiza el componente
    return <WrappedComponent {...props} />;
  };

  return WithAdmin;
};

export default AdminGuard;