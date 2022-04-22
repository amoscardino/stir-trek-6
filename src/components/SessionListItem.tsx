import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import { Session } from "../api/types/stirTrek";

interface SessionListItemProps {
    session: Session;
    hideLines: boolean
    showSavedIcon?: boolean;
}

const SessionListItem = ({ session, showSavedIcon, hideLines }: SessionListItemProps) => {
    return (
        <IonItem
            detail
            routerLink={`/sessions/${session.id}`}
            lines={hideLines ? "none" : undefined}
        >
            <IonLabel>
                <h2>
                    {session.title}
                </h2>

                {session.categories.length > 0 && (
                    <p>{session.categories.join(', ')}</p>
                )}
            </IonLabel>

            {showSavedIcon && session.isSaved && (
                <IonIcon
                    icon={bookmark}
                    slot="end"
                    color="primary"
                />
            )}
        </IonItem>
    );
};

export default SessionListItem;