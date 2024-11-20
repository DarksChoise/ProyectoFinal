import {
  IonContent,
  IonPage,
  IonButton,
  IonInput,
  IonLabel,
  IonItem,
  IonSelect,
  IonSelectOption,
  IonTextarea,
  IonIcon,
} from '@ionic/react';
import React, { useState, useEffect } from 'react';
import {
  happyOutline,
  briefcaseOutline,
  checkmarkDoneOutline,
  shieldOutline,
  megaphoneOutline,
  flameOutline,
  bulbOutline,
  rocketOutline,
  sunnyOutline,
  flowerOutline,
  removeCircleOutline,
  heartOutline,
  copyOutline,
} from 'ionicons/icons';
import './CreatePost.css';
import usePosts from '../../hooks/posts/posts_hook';

const CreatePost: React.FC = () => {
  const { createPost } = usePosts();
  const [error, setError] = useState<string | null>(null);
  const [validationMessage, setValidationMessage] = useState<string | null>(null);
  const [step, setStep] = useState(1);
  const [currentMessage, setCurrentMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const phrases = [
    'Creando magia',
    'Un toque de magia',
    'Transformando ideas',
    'Añadiendo brillo',
    'Preparando tu post',
  ];

  const [formData, setFormData] = useState({
    idea: '',
    creatividad: 10,
    tema: '',
    post_type: 'Historia',
    pensamientos: '',
    ejemplo: '',
    tono: 'Amistoso',
    size: 500,
    red_social: 'Facebook',
    post_generado: '',
  });

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setCurrentMessage(phrases[Math.floor(Math.random() * phrases.length)]);
      }, 3000);

      return () => clearInterval(interval);
    }
  }, [loading]);

  const handleNext = () => {
    if (validateStep(step)) {
      setValidationMessage(null); // Clear validation message
      if (step < 4) setStep(step + 1);
    } else {
      setValidationMessage('Por favor, completa todos los campos requeridos.');
    }
  };

  const handleBack = () => {
    setValidationMessage(null); // Clear validation message when going back
    if (step > 1) setStep(step - 1);
  };

  const handleChange = (field: string, value: string | number) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(formData.post_generado).then(() => {
      console.log('Post copiado al portapapeles');
    });
  };

  const handleFinish = async () => {
    if (validateStep(step)) {
      try {
        setLoading(true);
        setError(null);
        setValidationMessage(null); // Clear validation message
        const response = await createPost({
          ...formData,
        });

        setFormData((prev) => ({
          ...prev,
          post_generado: response.post_generado,
        }));
        setStep(4);
        console.log('Post creado exitosamente:', response);
      } catch (err: any) {
        console.error('Error al crear el post:', err.message);
        setError('Error al crear el post');
      } finally {
        setLoading(false);
      }
    } else {
      setValidationMessage('Por favor, completa todos los campos requeridos.');
    }
  };

  const validateStep = (step: number) => {
    switch (step) {
      case 1:
        return formData.idea.trim() !== '' && formData.tema.trim() !== '';
      case 2:
        return (
          formData.post_type.trim() !== '' &&
          formData.tono.trim() !== '' &&
          formData.ejemplo.trim() !== ''
        );
      case 3:
        return formData.pensamientos.trim() !== '' && formData.red_social.trim() !== '';
      default:
        return true;
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case 1:
        return (
          <div className="step">
            <h2 className="step-header">
              <span className="step-number">1</span> Describe tu idea
            </h2>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Muestra tu idea</IonLabel>
              <IonTextarea
                value={formData.idea}
                onIonChange={(e) => handleChange('idea', e.detail.value!)}
                placeholder="Una idea clara y concisa..."
                rows={5}
              />
            </IonItem>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Tema</IonLabel>
              <IonInput
                value={formData.tema}
                onIonChange={(e) => handleChange('tema', e.detail.value!)}
                placeholder="Entra en detalle..."
              />
            </IonItem>
          </div>
        );
      case 2:
        return (
          <div className="step">
            <h2 className="step-header">
              <span className="step-number">2</span> Detalles del Post
            </h2>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Tipo de Post</IonLabel>
              <IonSelect
                value={formData.post_type}
                onIonChange={(e) => handleChange('post_type', e.detail.value!)}
              >
                {[
                  'Historia',
                  'Logro',
                  'Opnion de liderazgo',
                  'Pregunta',
                  'Recomendacion',
                  'Reflexion',
                  'Solicitud de ayuda',
                  'Sugerencia',
                ].map((type) => (
                  <IonSelectOption key={type} value={type}>
                    {type}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Elige un tono</IonLabel>
              <div className="tone-buttons mb-4">
                {[
                  { label: 'Amistoso', icon: happyOutline },
                  { label: 'Profesional', icon: briefcaseOutline },
                  { label: 'Asertivo', icon: checkmarkDoneOutline },
                  { label: 'Autoritario', icon: shieldOutline },
                  { label: 'Convincente', icon: megaphoneOutline },
                  { label: 'Desafiante', icon: flameOutline },
                  { label: 'Empatico', icon: heartOutline },
                  { label: 'Inspirador', icon: bulbOutline },
                  { label: 'Motivador', icon: rocketOutline },
                  { label: 'Optimista', icon: sunnyOutline },
                  { label: 'Respetuoso', icon: flowerOutline },
                  { label: 'Serio', icon: removeCircleOutline },
                ].map((tono) => (
                  <button
                    key={tono.label}
                    className={`tone-button ${formData.tono === tono.label ? 'selected' : ''}`}
                    onClick={() => handleChange('tono', tono.label)}
                  >
                    <IonIcon icon={tono.icon} slot="start" />
                    {tono.label}
                  </button>
                ))}
              </div>
            </IonItem>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Ejemplo</IonLabel>
              <IonTextarea
                value={formData.ejemplo}
                onIonChange={(e) => handleChange('ejemplo', e.detail.value!)}
                placeholder="Escribe un ejemplo que refleje el tono seleccionado..."
                rows={5}
              />
            </IonItem>
          </div>
        );
      case 3:
        return (
          <div className="step">
            <h2 className="step-header">
              <span className="step-number">3</span> Pensamientos y Red Social
            </h2>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Tus pensamientos</IonLabel>
              <IonInput
                value={formData.pensamientos}
                onIonChange={(e) => handleChange('pensamientos', e.detail.value!)}
                placeholder="Comparte tus pensamientos..."
              />
            </IonItem>
            <IonItem className="custom-input">
              <IonLabel position="stacked">Red Social</IonLabel>
              <IonSelect
                value={formData.red_social}
                onIonChange={(e) => handleChange('red_social', e.detail.value!)}
              >
                {['Facebook', 'Instagram', 'LinkedIn', 'Twitter', 'WhatsApp'].map((social) => (
                  <IonSelectOption key={social} value={social}>
                    {social}
                  </IonSelectOption>
                ))}
              </IonSelect>
            </IonItem>
          </div>
        );
      case 4:
        return (
          <div className="step">
            <h2 className="step-header">
              <span className="step-number">4</span> Post Generado
            </h2>
            <IonItem className="custom-input">
              <IonLabel position="stacked" className="mb-3">
                Tu post generado
              </IonLabel>
              <IonTextarea value={formData.post_generado} readonly rows={8} />
            </IonItem>
            <IonButton onClick={copyToClipboard} className="next-button">
              <IonIcon icon={copyOutline} slot="start" />
              Copiar al portapapeles
            </IonButton>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <IonPage>
      <IonContent>
        {loading && (
          <div className="loading-overlay">
            <div className="loading-message">{currentMessage}</div>
          </div>
        )}
        <header className="page-header">
          <h1>🚀 Crea un Post</h1>
          <p>¡Crea tu mejor post y compártelo con el mundo!</p>
        </header>
        <div className="form-steps">{renderStepContent()}
          {validationMessage && <div className="validation-message">{validationMessage}</div>}
        </div>
        {error && <div className="error-message">{error}</div>}
        <div className="navigation-buttons">
          
          {step > 1 && (
            <IonButton onClick={handleBack} className="next-button">
              Atras
            </IonButton>
          )}
          {step < 3 && (
            <IonButton onClick={handleNext} className="next-button">
              Siguiente
            </IonButton>
          )}
          {step === 3 && (
            <IonButton onClick={handleFinish} className="next-button" disabled={loading}>
              {loading ? 'Creando post...' : 'Crear Post'}
            </IonButton>
          )}
          {step === 4 && (
            <IonButton routerLink="/home" className="next-button">
              Ver Posts
            </IonButton>
          )}
        </div>
      </IonContent>
    </IonPage>
  );
};

export default CreatePost;
