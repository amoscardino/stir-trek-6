import { IonButton, IonIcon } from "@ionic/react";
import { bookmark, bookmarkOutline } from "ionicons/icons";
import useSavedSession from "../hooks/useSavedSession";

interface SavedSessionButtonProps {
    id: string;
}

const SavedSessionButton = ({ id }: SavedSessionButtonProps) => {
    const { isSaved, toggleSaved } = useSavedSession(id);

    const handleButtonClick = async (): Promise<void> => {
        await toggleSaved();
    };

    return (
        <IonButton
            title={isSaved ? "Remove saved session" : "Add saved session"}
            onClick={handleButtonClick}
        >
            <IonIcon slot="icon-only" icon={isSaved ? bookmark : bookmarkOutline} />
        </IonButton>
    );
};

export default SavedSessionButton;
