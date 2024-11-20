import { IonContent, IonPage } from '@ionic/react';
import './Home.css';
import BottomNavbar from '../../components/navbar/navbar';
import usePosts from '../../hooks/posts/posts_hook';
import { useEffect, useState } from 'react';

const Home: React.FC = () => {
  const { getPosts } = usePosts();
  const [posts, setPosts] = useState<any[]>([]);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  const getPostsData = async () => {
    try {
      const postsData = await getPosts();
      setPosts(postsData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <IonPage className="home-page">
      <IonContent>
        <header className="page-header">
          <h1>🚀 NextPost</h1>
          <p>¡Inspírate con los últimos posts!</p>
        </header>
        <div className="posts-container"  style={{ marginBottom: '100px' }}>
          {loading && <p className="loading">Cargando posts...</p>}
          {error && <p className="error">{error}</p>}
          {!loading && !error && posts.length === 0 && <p>No hay posts...</p>}
          {!loading &&
            !error &&
            posts.map((post) => (
              <div key={post.id} className="post-card">
                <div className="post-user">
                  <img
                    src={post.user.avatar || './img/no_profile.png'}
                    alt={`${post.user.username}'s avatar`}
                    className="user-avatar"
                  />
                  <div className="user-info">
                    <h4>{`${post.user.first_name} ${post.user.last_name}`}</h4>
                    <p>@{post.user.username}</p>
                  </div>
                </div>
                <h3>{post.idea}</h3>
                <p>{post.post_generado}</p>
                <div className="post-footer">
                  <span className="post-date">
                    Creado en: {new Date(post.fecha_creacion).toLocaleDateString()}
                  </span>
                  <span className="post-social">Plataforma: {post.red_social}</span>
                </div>
              </div>
            ))}
        </div>
      </IonContent>
      <BottomNavbar />
    </IonPage>
  );
};

export default Home;
