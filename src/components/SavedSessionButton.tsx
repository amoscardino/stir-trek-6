import { IonButton, IonIcon } from "@ionic/react";
import { bookmark, bookmarkOutline } from "ionicons/icons";
import { toggleSavedSession } from "../api/savedSessions";
import { Session } from "../api/types/stirTrek";

interface SavedSessionButtonProps {
    session: Session;
    onChange: () => void;
}

const SavedSessionButton = ({ session, onChange }: SavedSessionButtonProps) => {
    const handleButtonClick = async (): Promise<void> => {
        await toggleSavedSession(session.id);
        onChange();
    };

    return (
        <IonButton
            title={session.isSaved ? "Remove saved session" : "Add saved session"}
            onClick={handleButtonClick}
        >
            <IonIcon slot="icon-only" icon={session.isSaved ? bookmark : bookmarkOutline} />
        </IonButton>
    );
};

export default SavedSessionButton;
