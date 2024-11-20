import { IonContent, IonPage } from '@ionic/react';
import { useState, useEffect } from "react";
import BottomNavbar from '../../components/navbar/navbar';

import usePosts from '../../hooks/posts/posts_hook';
import './MyPost.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';


const MyPost = () => {
  const { getMyPosts } = usePosts();
  const { deletePost } = usePosts();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getPostsData = async () => {
    try {
      const postsData = await getMyPosts();
      setPosts(postsData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (postId: number) => {
    try {
      await deletePost(postId);
      setPosts((prevPosts) => prevPosts.filter((post) => post.id !== postId));
      toast.success('Post eliminado correctamente.', { theme: 'colored' });
    } catch (error: any) {
      toast.error(error.message, { theme: 'colored' });
    }
  }


  const handleCopyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success('Texto copiado al portapapeles. 🎉', { 
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored'
        });
      })
      .catch(() => {
        toast.error('Falló al copiar el texto al portapapeles.', { theme: 'colored' });
      });
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <IonPage className="home-page">
      <IonContent>
        <ToastContainer />
        <header className="page-header">
          <h1>📬 Bienvenido a tus posts</h1>
          <span>En esta página podrás ver todos tus posts generados</span>
        </header>
        <div className="posts-container" style={{ marginBottom: '100px' }}>
          {loading && <p className="loading">Cargando posts...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && posts.length === 0 && <p>No existen posts...</p>}
          {!loading &&
            !error &&
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <h3>{post.idea}</h3>
                <p>{post.post_generado}</p>
                <div className="post-footer">
                  <span className="post-date">
                    Created on: {new Date(post.fecha_creacion).toLocaleDateString()}
                  </span>
                  <span className="post-social">Platform: {post.red_social}</span>
                </div>
                {/* Contenedor para los botones */}
                <div className="button-container">
                  <button
                    className="copy-button"
                    onClick={() => handleCopyToClipboard(post.post_generado)}
                  >
                    Copiar al portapapeles
                  </button>
                  {/* <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post.id)}
                  >
                    Eliminar post
                  </button> */}
                </div>
              </div>
            ))}
        </div>
      </IonContent>
      <BottomNavbar />
    </IonPage>
  );
};

export default MyPost;
