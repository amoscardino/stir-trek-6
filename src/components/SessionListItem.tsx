import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import { Session } from "../api/types/stirTrek";
import { getIcon } from "../utils/session";

interface SessionListItemProps {
    session: Session;
    hideLines: boolean
    showSavedIcon?: boolean;
    path: string;
}

const SessionListItem = ({ session, showSavedIcon, hideLines, path }: SessionListItemProps) => {
    return (
        <IonItem
            detail
            routerLink={`${path}/${session.id}`}
            lines={hideLines ? "none" : undefined}
        >
            <IonIcon
                icon={getIcon(session)}
                slot="start"
                color="primary"
            />

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