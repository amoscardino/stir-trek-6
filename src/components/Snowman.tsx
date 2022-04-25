import { IonText } from "@ionic/react";
import { clearApiCache } from "../api/stirTrek";

const Snowman = () => (
    <div
        className="ion-text-center ion-margin-bottom"
        onClick={async () => await clearApiCache()}
    >
        <IonText color="secondary" style={{ fontSize: '4rem' }}>
            ☃︎
        </IonText>
    </div >
);

export default Snowman;
