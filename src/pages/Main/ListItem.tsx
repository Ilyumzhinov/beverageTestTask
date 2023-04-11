import { IonAvatar, IonItem, IonLabel } from "@ionic/react";
import { Beverage } from "../../model/Beverages";


/** Рендерит 1 напиток */
export const ListItem: React.FC<{ beverage: Beverage }> = ({ beverage }) => {
    return (
        <IonItem routerLink={`/beverage/${beverage.id}`} button>
            <IonAvatar slot="start">
                <img alt={beverage.name} src={beverage.image_url} style={{ objectFit: "contain" }} />
            </IonAvatar>
            <IonLabel>
                {beverage.abv}
            </IonLabel>
        </IonItem>
    )
}