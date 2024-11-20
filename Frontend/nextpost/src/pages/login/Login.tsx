import React, { useState } from 'react';
import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
} from '@ionic/react';
import './Login.css';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import useAuth from '../../hooks/login/login_hook';
import useRegister from '../../hooks/register/register_hook';
import { ToastContainer, toast } from 'react-toastify';



const Login: React.FC = () => {
  const { login } = useAuth();
  const { register } = useRegister();

  // Estados para el formulario de login
  const [email_login, setEmailLogin] = useState('');
  const [password_login, setPasswordLogin] = useState('');

  // Estados para el formulario de registro
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [error, setError] = useState<string | null>(null);

  const validateRegister = (): boolean => {
    if (!email || !password || !username || !firstName || !lastName) {
      toast.error('Todos los campos son obligatorios.', { theme: 'colored' });
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('El correo no es válido.', { theme: 'colored' });
      return false;
    }
    if (password.length < 6) {
      toast.error('La contraseña debe tener al menos 6 caracteres.', { theme: 'colored' });
      return false;
    }
    return true;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await login(email_login, password_login);

      if (response.status === 200) {
        toast.success('Inicio de sesión exitoso 🎉', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        setError(null);
        window.location.href = '/home';
      } else {
        throw new Error('Error al iniciar sesión');
      }
    } catch (err: any) {
      toast.error('Error al iniciar sesión', {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      setError(err.message);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateRegister()) return;

    try {
      const response = await register(email, password, username, firstName, lastName);
      if (response.status === 200 || response.status === 201) {
        toast.success('Registro exitoso 🎉', {
          position: 'top-right',
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          theme: 'colored',
        });
        setError(null);
        setIsRegistering(false);
      } else {
        throw new Error('Error al registrarse');
      }
    } catch (err: any) {
      const errorMessage = err.response?.data?.message || 'Error al registrarse';
      toast.error(errorMessage, {
        position: 'top-right',
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: 'colored',
      });
      setError(errorMessage);
    }
  };

  return (
    <IonPage>
      <ToastContainer />
      <IonContent fullscreen className="login-content">
        <div className={`form-container ${isRegistering ? 'show-register' : ''}`}>
          {/* Formulario de Login */}
          <div className="login-form">
            <h1 className='animated-title'>NextPost IA</h1>
            <p className="animated-subtitle">Ideas brillantes, potenciadas por IA.</p>
            <form onSubmit={handleLogin}>
              <IonItem className="custom-input">
                <IonInput
                  type="email"
                  placeholder="Correo"
                  value={email_login}
                  onIonChange={(e) => setEmailLogin(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem className="custom-input">
                <IonInput
                  type="password"
                  placeholder="Contraseña"
                  value={password_login}
                  onIonChange={(e) => setPasswordLogin(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonButton expand="block" type="submit" className="login-button">
                Iniciar sesión
              </IonButton>
              <IonButton
                expand="block"
                type="button"
                className="register-button"
                onClick={() => setIsRegistering(true)}
              >
                Registrarse
              </IonButton>
            </form>
          </div>

          {/* Formulario de Registro */}
          <div className="register-form" style={{ marginTop: '70px' }}>
          <h1 className='animated-title'>Registro</h1>
            <p className="animated-subtitle">Crea tu cuenta en NextPost IA</ p>
          <form onSubmit={handleRegister}>
              <IonItem className="custom-input">
                <IonInput
                  type="text"
                  placeholder="Nombre de usuario"
                  value={username}
                  onIonChange={(e) => setUsername(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem className="custom-input">
                <IonInput
                  type="text"
                  placeholder="Nombre"
                  value={firstName}
                  onIonChange={(e) => setFirstName(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem className="custom-input">
                <IonInput
                  type="text"
                  placeholder="Apellido"
                  value={lastName}
                  onIonChange={(e) => setLastName(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem className="custom-input">
                <IonInput
                  type="email"
                  placeholder="Correo"
                  value={email}
                  onIonChange={(e) => setEmail(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonItem className="custom-input">
                <IonInput
                  type="password"
                  placeholder="Contraseña"
                  value={password}
                  onIonChange={(e) => setPassword(e.detail.value!)}
                ></IonInput>
              </IonItem>
              <IonButton expand="block" type="submit" className="login-button">
                Registrarse
              </IonButton>
              <IonButton
                expand="block"
                type="button"
                className="back-button"
                onClick={() => setIsRegistering(false)}
              >
                Volver
              </IonButton>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
