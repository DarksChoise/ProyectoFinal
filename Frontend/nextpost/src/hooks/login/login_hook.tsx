import axios from 'axios';

const useAuth = () => {
  const login = async (email: string, password: string) => {
    try {
      const response = await axios.post('https://backend-tu3j.onrender.com/auth/login/', {
        email,
        password,
      });

      // Guarda el token de acceso y los datos del usuario
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response
    } catch (error: any) {
      throw new Error(error.response?.data?.detail || 'Login failed');
    }
  };

  const logout = () => {
    // Limpia el token y los datos de usuario
    localStorage.removeItem('access_token');
    localStorage.removeItem('user');
  };

  const isAuthenticated = () => {
    // Comprueba si hay un token de acceso
    return !!localStorage.getItem('access_token');
  };

  const getToken = () => {
    return localStorage.getItem('access_token');
  }

  return { login, logout, isAuthenticated, getToken };
};

export default useAuth;
