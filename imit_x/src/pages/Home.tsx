import { IonContent, IonHeader, IonPage, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';

const Home: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className="main-toolbar">
          <div className="brand">AmazON</div>

          <div className="search-wrap">
            <input className="search-input" placeholder="Buscar en AmazON" />
            <button className="search-btn">🔍</button>
          </div>

          <div className="header-actions">
            <a className="action-link" href="/vendor-login">Vendedor</a>
            <button className="action-link">Devoluciones y Pedidos</button>
            <button className="cart">Carrito (0)</button>
          </div>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        <div className="hero-banner">
          <div className="hero-inner">
            <h1>Ofertas en dispositivos</h1>
            <p>Hasta 54% de descuento — Compra ahora</p>
            <button className="cta">Compra ahora</button>
          </div>
        </div>

        <ExploreContainer />
      </IonContent>
    </IonPage>
  );
};

export default Home;
