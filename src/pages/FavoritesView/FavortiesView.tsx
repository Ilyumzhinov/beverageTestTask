import { IonAvatar, IonButton, IonButtons, IonContent, IonHeader, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonTitle, IonToolbar } from "@ionic/react"
import React, { useEffect, useState } from "react"
import { Favorites } from "../../model/Favorites"
import { Beverage } from "../../model/Beverages"
import { useHistory } from "react-router"
import './FavoritesView.css'

/** Модальное окно для Избранных элементов */
export const FavoritesView: React.FC<{ dismiss: () => void }> = ({ dismiss }) => {
    const [favorites, setFavorites] = useState<Beverage[]>([])
    const history = useHistory()

    useEffect(() => {
        const getData = async () => {
            const data = await Favorites.get()
            setFavorites(data)
        }
        getData()
    }, [favorites])

    /** Открывает детали напитка и закрывает модальное окно */
    const handleClick = (beverage: Beverage) => {
        history.push(`/beverage/${beverage.id}`)
        dismiss()
    }

    /** Удаляет напиток из списка избранного */
    const handleDelete = (beverage: Beverage) => {
        Favorites.delete(beverage.id)
        setFavorites([])
    }

    return (
        <>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Избранное</IonTitle>
                    <IonButtons slot="end">
                        <IonButton onClick={dismiss}>Закрыть</IonButton>
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {favorites.length == 0 ?
                    <div className='placeholder'>Ничего не добавлено</div> : (
                        <IonList>
                            {favorites.map(beverage => (
                                <IonItemSliding key={beverage.id}>
                                    <IonItem button onClick={() => handleClick(beverage)}>
                                        <IonAvatar slot="start">
                                            <img alt={beverage.name} src={beverage.image_url} style={{ objectFit: "contain" }} />
                                        </IonAvatar>
                                        <IonLabel>
                                            {beverage.abv}
                                        </IonLabel>
                                    </IonItem>
                                    <IonItemOptions>
                                        <IonItemOption color="danger" onClick={() => handleDelete(beverage)}>Удалить</IonItemOption>
                                    </IonItemOptions>
                                </IonItemSliding>
                            ))}
                        </IonList>
                    )}
            </IonContent>
        </>
    )
}