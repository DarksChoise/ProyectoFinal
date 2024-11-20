import React from 'react';
import { IonIcon, IonTabBar, IonTabButton } from '@ionic/react';
import { add, logOutOutline, reorderFour, documentTextOutline, personOutline,sparklesOutline } from 'ionicons/icons';
import useAuth from '../../hooks/login/login_hook';
import { useLocation } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';

import './BottomNavbar.css';
import 'react-toastify/dist/ReactToastify.css';

const BottomNavbar: React.FC = () => {
  const { logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.setItem('showToast', 'true');
    logout(); 
    window.location.href = '/'; 
  };

  const handleCreatePost = () => {
    console.log('Botón Crear Post clicado');
    window.location.href = '/create-post';
  };

  const MyPosts = () => {
    console.log('Botón Mis Posts clicado');
    window.location.href = '/my-post';
  }
  const Home = () => {
    console.log('Botón Home clicado');
    window.location.href = '/home';
  }

  const handleProfile = () => {
    console.log('Botón Perfil clicado');
    window.location.href = '/profile';
  }

  const isActive = (path: string) => location.pathname === path ? 'ion-tab-button-tab-active' : '';


  return (
    <div className="navbar-container">
      <ToastContainer />
      <IonTabBar slot="bottom" className="custom-navbar">
        <IonTabButton tab="home" href="/home" className={isActive('/home')} onClick={Home}>
          <IonIcon icon={reorderFour} />
          <span>Global</span>
        </IonTabButton>

        <IonTabButton tab="my-post" href="/my-post" className={isActive('/my-post')} onClick={MyPosts}>
          <IonIcon icon={documentTextOutline} />
          <span>Posteos</span>
        </IonTabButton>

        <IonTabButton tab="profile" href="/" className={isActive('/profile')} onClick={handleProfile}>
          <IonIcon icon={personOutline} />
          <span>Perfil</span>
        </IonTabButton>

        <IonTabButton tab="logout" onClick={handleLogout}>
          <IonIcon icon={logOutOutline} />
          <span>Logout</span>
        </IonTabButton>
      </IonTabBar>

      <button className="highlight-button" onClick={handleCreatePost}>
        <IonIcon icon={sparklesOutline} className="highlight-icon" />
      </button>
    </div>
  );
};

export default BottomNavbar;
