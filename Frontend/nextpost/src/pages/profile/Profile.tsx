import {
  IonContent,
  IonPage,
  IonInput,
  IonButton,
  IonItem,
  IonLabel,
  IonText,
  IonLoading,
} from '@ionic/react';
import { useState, useEffect } from "react";
import BottomNavbar from '../../components/navbar/navbar';
import useUserUpdate from '../../hooks/profile/profile_hook';

const UserProfile = () => {
  const { getInfo, updateInfo, loading, error, success } = useUserUpdate();
  const [userData, setUserData] = useState<any>(null);
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await getInfo();
        setUserData(data);
        setFormData({
          username: data.username,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
        });
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (userData) {
      try {
        await updateInfo(userData.id, formData);
        window.location.href = '/home';
      } catch (err) {
        console.error("Error updating user data:", err);
      }
    }
  };

  return (
    <IonPage>
      <IonContent>
        <header className="page-header">
            <IonText>
            <h1>✏️ Editar Perfil</h1>
            <p>
              Actualiza tus datos personales para mantener tu información actualizada. 
            </p>
            </IonText>
        </header>

        <form onSubmit={handleFormSubmit} className="mt-5 p-5">
          <IonItem className="custom-input">
            <IonLabel position="stacked">Usuario</IonLabel>
            <IonInput
              name="username"
              value={formData.username}
              placeholder="Ingresa tu nombre de usuario"
              onIonChange={handleInputChange}
            />
          </IonItem>

          <IonItem className="custom-input">
            <IonLabel position="stacked">Nombres</IonLabel>
            <IonInput
              name="first_name"
              value={formData.first_name}
              placeholder="Ingresa tu nombre"
              onIonChange={handleInputChange}
            />
          </IonItem>

          <IonItem className="custom-input">
            <IonLabel position="stacked">Apellidos</IonLabel>
            <IonInput
              name="last_name"
              value={formData.last_name}
              placeholder="Ingresa tu apellido"
              onIonChange={handleInputChange}
            />
          </IonItem>

          <IonItem className="custom-input">
            <IonLabel position="stacked">Correo electrónico</IonLabel>
            <IonInput
              name="email"
              type="email"
              value={formData.email}
              placeholder="Ingresa tu correo electrónico"
              onIonChange={handleInputChange}
            />
          </IonItem>

          <IonButton expand="block" type="submit" disabled={loading} className="next-button">
            {loading ? "Guardando..." : "Guardar"}
          </IonButton>
        </form>

        <IonLoading isOpen={loading} message={"Cargando..."} />
      </IonContent>

      <BottomNavbar />
    </IonPage>
  );
};

export default UserProfile;
