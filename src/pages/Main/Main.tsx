import { useEffect, useState } from 'react';
import { Beverage, getBeverages } from '../../model/beverages';
import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonModal,
  IonPage,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import './Main.css'
import { ListItem } from './ListItem'
import { FavoritesView } from '../FavoritesView/FavortiesView';


/** Главное меню */
export const Main: React.FC = () => {
  const cPages = [1, 2, 3]

  const [beverages, setBeverages] = useState<Beverage[]>([])
  const [page, setPage] = useState<number>(1)
  const [isOpen, setIsOpen] = useState(false)

  // Загружает данные из API при загрузке страницы
  useEffect(() => {
    const getData = async () => {
      const data = await getBeverages(page)
      setBeverages(data)
    }
    getData()
  }, [page])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Главная</IonTitle>

          <IonButtons slot="primary">
            <IonButton fill="outline" onClick={() => setIsOpen(o => !o)}>Избранное</IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Main</IonTitle>
          </IonToolbar>
        </IonHeader>

        <IonList>
          {beverages.map(b => <ListItem key={b.id} beverage={b} />)}
        </IonList>

        <div
          className={'pagination-container'}
        >
          {cPages.map(pageNumber =>
            <IonButton
              key={pageNumber}
              shape="round"
              size="small"
              disabled={pageNumber === page}
              fill={pageNumber === page ? 'solid' : 'clear'}
              color="dark"
              onClick={() => setPage(pageNumber)}
            >
              {pageNumber}
            </IonButton>
          )}
        </div>

        <IonModal isOpen={isOpen} keepContentsMounted>
          <FavoritesView dismiss={() => setIsOpen(false)} />
        </IonModal>
      </IonContent>
    </IonPage>
  )
}