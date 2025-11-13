import React, { useState } from 'react';
import { IonPage, IonContent, IonHeader, IonToolbar, IonTitle, IonButton } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './VendorLogin.css';

const VendorLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const history = useHistory();

  // Mock credentials
  const MOCK_EMAIL = 'vendor@example.com';
  const MOCK_PASS = 'password123';

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email || !password) {
      setError('Por favor completa los campos.');
      return;
    }

    if (email === MOCK_EMAIL && password === MOCK_PASS) {
      // Simulate successful login — try history, fallback to full navigation
      try {
        history.push('/home');
      } catch (e) {
        window.location.href = '/home';
      }
    } else {
      setError('Credenciales incorrectas. Usa vendor@example.com / password123 para demo.');
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Inicio de sesión (Vendedor)</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div className="vendor-login-wrap">
          <form className="vendor-form" onSubmit={submit}>
            <div className="avatar">AE</div>
            <h2>Inicia sesión como vendedor</h2>

            {error && <div className="form-error">{error}</div>}

            <label>
              Email
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required />
            </label>

            <label>
              Contraseña
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </label>

            <div className="form-actions">
              <IonButton type="submit">Iniciar sesión</IonButton>
              <IonButton fill="clear" onClick={() => { setEmail(''); setPassword(''); setError(null); }}>Limpiar</IonButton>
            </div>

            <p className="hint">Cuenta demo: <strong>vendor@example.com</strong> / <strong>password123</strong></p>
          </form>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default VendorLogin;
