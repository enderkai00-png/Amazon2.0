import './ExploreContainer.css';
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonButton,
  IonGrid,
  IonRow,
  IonCol,
  IonBadge,
} from '@ionic/react';
import productos from '../data/productos.json';

interface Product {
  _id: string;
  nombre: string;
  precio: number;
  imagenes?: string[];
  descripcion?: string;
  calificacion_promedio?: number;
}

const ExploreContainer: React.FC = () => {
  const list: Product[] = productos as unknown as Product[];

  const fmt = (n: number) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'USD' }).format(n);

  return (
    <div id="catalogue">
      <div className="catalogue-header">
        <h2>Productos destacados</h2>
        <p>Un catálogo simple tipo ecommerce — demo</p>
      </div>

      <IonGrid>
        <IonRow>
          {list.map(p => {
            const img = p.imagenes && p.imagenes.length ? p.imagenes[0] : null;
            const imageSrc = img
              ? (img.startsWith('http') ? img : `/assets/${img}`)
              : `https://via.placeholder.com/300x200?text=${encodeURIComponent(p.nombre)}`;

            return (
            <IonCol size="12" size-sm="6" size-md="4" size-lg="3" key={p._id}>
              <IonCard>
                <div className="card-image">
                  <img src={imageSrc} alt={p.nombre} />
                </div>
                <IonCardHeader>
                  <IonCardTitle>{p.nombre}</IonCardTitle>
                </IonCardHeader>
                <IonCardContent>
                  <div className="price-row">
                    <strong className="price">{fmt(p.precio)}</strong>
                    {p.calificacion_promedio !== undefined && (
                      <IonBadge color="warning">{p.calificacion_promedio.toFixed(1)}</IonBadge>
                    )}
                  </div>
                  <div className="card-actions">
                    <IonButton fill="outline" size="small">Ver</IonButton>
                    <IonButton color="primary" size="small">Añadir</IonButton>
                  </div>
                </IonCardContent>
              </IonCard>
            </IonCol>
            );
          })}
        </IonRow>
      </IonGrid>
    </div>
  );
};

export default ExploreContainer;
