import { useState } from "react";
import axios from "axios";
import useAuth from "../login/login_hook";

const useUserUpdate = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const { getToken } = useAuth();

  const getInfo = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available. Please log in.");
      }

      const response = await axios.get("https://backend-tu3j.onrender.com/users/me/", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLoading(false); // Petición finalizada
      return response.data;
    } catch (err: any) {
      setLoading(false); // Detenemos el spinner en caso de error
      setError(err.response?.data?.detail || "Error fetching user data.");
      throw err;
    }
  };

  const updateInfo = async (id: number, data: any) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const token = getToken();
      if (!token) {
        throw new Error("No token available. Please log in.");
      }

      const response = await axios.put(
        `https://backend-tu3j.onrender.com/users/${id}/`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess(true);
      setLoading(false); // Petición finalizada
      return response.data;
    } catch (err: any) {
      setLoading(false); // Detenemos el spinner en caso de error
      setError(err.response?.data?.detail || "Error al actualizar los datos");
      throw err;
    }
  };

  return { getInfo, updateInfo, loading, error, success };
};

export default useUserUpdate;
