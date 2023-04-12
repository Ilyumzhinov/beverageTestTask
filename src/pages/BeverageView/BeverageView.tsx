import React, { useState } from 'react';
import { Beverage, getBeverage } from '../../model/beverages';
import {
  IonBackButton,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFooter,
  IonGrid,
  IonHeader,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonProgressBar,
  IonRow,
  IonToolbar,
  useIonViewWillEnter,
} from '@ionic/react';
import { useParams } from 'react-router';
import './BeverageView.css';
import { Favorites } from '../../model/favorites';


/** Окно для показа подробной информации о напитке */
export const BeverageView: React.FC = () => {
  const [beverage, setBeverage] = useState<Beverage | undefined>()
  const { beverageID } = useParams<{ beverageID: string }>()
  const [isFavorite, setFavorite] = useState<boolean>(false)

  // Загружает данные напитка из API и storage API
  useIonViewWillEnter(() => {
    const getData = async () => {
      const data = await getBeverage(parseInt(beverageID))
      setBeverage(data)
      setFavorite(Favorites.has(parseInt(beverageID)))
    }
    getData()
  })

  /** Добавляет или удаляет из Избранного */
  const handleFavorite = () => {
    if (beverage == undefined)
      return

    setFavorite(v => !v)
    isFavorite ?
      Favorites.delete(beverage.id) :
      Favorites.save(beverage.id)
  }

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton text="Main" defaultHref="/main" />
          </IonButtons>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        {beverage == undefined ? (
          <IonProgressBar type="indeterminate" />
        ) :
          (
            <IonList>
              <div className='beverageImageContainer ion-padding'>
                <img src={beverage.image_url} alt="profile avatar" />
              </div>
              <div className='beverageInfo'>
                <p className="beverageName">{beverage.name}</p>
                <p className="beverageTitle">{beverage.tagline}</p>
              </div>
              <IonItem>
                <IonGrid>
                  <IonRow className="ion-text-center ion-justify-content-between ion-align-self-center ion-align-items-center">
                    <IonCol>
                      <IonRow className="ion-text-center ion-justify-content-between ion-align-items-center ion-align-self-center ion-align">
                        <IonCol size="4" className="ion-text-center">
                          <p className='value'>{beverage.abv}</p>
                          <p className='label'>Крепкость</p>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                          <p className='value'>{beverage.ibu}</p>
                          <p className='label'>IBU</p>
                        </IonCol>
                        <IonCol size="4" className="ion-text-center">
                          <p className='value'>{beverage.first_brewed}</p>
                          <p className='label'>Год создания</p>
                        </IonCol>
                      </IonRow>
                    </IonCol>
                  </IonRow>
                </IonGrid>
              </IonItem>
              <IonItem>
                <IonLabel class="ion-text-wrap">
                  <h5>Описание</h5>
                  <p>{beverage.description}</p>
                </IonLabel>
              </IonItem>
            </IonList>
          )}
      </IonContent>

      {beverage != undefined && (
        <IonFooter collapse="fade" class="ion-no-border">
          <IonToolbar class='ion-padding'>
            <IonButton
              expand="block"
              onClick={handleFavorite}
              fill={isFavorite ? 'clear' : 'solid'}
            >
              {isFavorite ? "Убрать из Избранного" : "Добавить в Избранное"}
            </IonButton>
          </IonToolbar>
        </IonFooter>
      )}
    </IonPage>
  );
}