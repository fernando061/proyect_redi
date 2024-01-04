// services/auth.js
import axios from 'axios';

const BASE_URL = "http://127.0.0.1:5000";
export const login = async (email, password) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/login`,
        { email, password },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      // Almacenar información de roles en el almacenamiento local
      const { data } = response;
      localStorage.setItem('userRoles', JSON.stringify(data.roles));
  
      // Puedes devolver datos adicionales si los necesitas
      return data;
    } catch (error) {
      // Manejar errores de la solicitud
      throw error;
    }
  };
  
  // Función para establecer el token de autenticación
  export const setAuthToken = (token) => {
    // Almacenar el token en localStorage o cookies
    localStorage.setItem('token', token);
  };
  
  // Función para obtener el token de autenticación
  export const getAuthToken = () => {
    // Recuperar el token de localStorage o cookies
    return localStorage.getItem('token');
  };
  
  // Función para eliminar el token de autenticación
  export const removeAuthToken = () => {
    // Eliminar el token de localStorage o cookies
    localStorage.removeItem('token');
  };


//signup the user

export const signUp = async ({ name, email, password, nationality }) => {
  try {
    const response = await axios.post(`${BASE_URL}/signup`, {
      name,
      email,
      password,
      nationality,
    }, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      console.log("Registration successful");
      // You can handle the response as needed
    } else {
      console.error("Error in registration");
      throw new Error("Error in registration. Check your data and try again.");
    }
  } catch (error) {
    console.error("Request error:", error.message);
    throw new Error("Error in registration. Check your data and try again.");
  }
};
