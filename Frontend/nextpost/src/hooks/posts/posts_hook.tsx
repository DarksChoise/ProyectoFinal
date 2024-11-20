import axios from 'axios';
import { useCallback } from 'react';
import useAuth from '../login/login_hook';

const usePosts = () => {
  const { getToken } = useAuth();

  const getPosts = useCallback(async () => {
    try {
      const token = getToken(); // Obtiene el token desde useAuth

      if (!token) {
        throw new Error('No token available. Please log in.');
      }

      const response = await axios.get('https://backend-tu3j.onrender.com/posts/', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    } catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 403) {
        throw new Error('Forbidden. You do not have access.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch posts');
    }
  }, [getToken]);

  const createPost = useCallback(
    async (postData: {
      idea: string;
      creatividad: number;
      tema: string;
      post_type: string;
      pensamientos: string;
      ejemplo: string;
      tono: string;
      size: number;
      red_social: string;
    }) => {
      try {
        const token = getToken();
  
        if (!token) {
          throw new Error('No token available. Please log in.');
        }
  
        const response = await axios.post('https://backend-tu3j.onrender.com/posts/', postData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json', // Asegurar que el tipo de contenido sea JSON
          },
        });
  
        return response.data;
      } catch (error: any) {
        if (error.response?.status === 401) {
          throw new Error('Unauthorized. Please log in again.');
        }
        if (error.response?.status === 403) {
          throw new Error('Forbidden. You do not have access.');
        }
        throw new Error(error.response?.data?.detail || 'Failed to create post');
      }
    },
    [getToken]
  );

  const deletePost = useCallback(async (postId: number) => {
    try {
      const token = getToken();

      if (!token) {
        throw new Error('No token available. Please log in.');
      }

      const response = await axios.delete(`http://https://backend-tu3j.onrender.com/posts/${postId}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      return response.data;
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 403) {
        throw new Error('Forbidden. You do not have access.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to delete post');
    }
  }
  , [getToken]);
  
  const getMyPosts = useCallback(async () => {
    try {
      const token = getToken(); // Obtiene el token desde useAuth

      if (!token) {
        throw new Error('No token available. Please log in.');
      }

      const response = await axios.get('https://backend-tu3j.onrender.com/posts/my_posts/', {
        headers: {
          Authorization: `Bearer ${token}`,          
        },
      });

      return response.data;
    }
    catch (error: any) {
      if (error.response?.status === 401) {
        throw new Error('Unauthorized. Please log in again.');
      }
      if (error.response?.status === 403) {
        throw new Error('Forbidden. You do not have access.');
      }
      throw new Error(error.response?.data?.detail || 'Failed to fetch posts');
    }
  }
  , [getToken]);

  return { getPosts, createPost, getMyPosts, deletePost };
};

export default usePosts;
