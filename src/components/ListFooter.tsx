import { IonIcon } from "@ionic/react";
import { sparklesOutline } from "ionicons/icons";
import { clearApiCache } from "../api/stirTrek";

const ListFooter = () => (
    <div
        className="ion-text-center ion-margin ion-padding"
        onClick={async () => await clearApiCache()}
    >
        <IonIcon icon={sparklesOutline} color="primary" style={{ fontSize: '3rem' }} />
    </div >
);

export default ListFooter;
