import { IonIcon, IonItem, IonLabel } from "@ionic/react";
import { bookmark } from "ionicons/icons";
import { Session } from "../api/types/stirTrek";
import useSavedSession from "../hooks/useSavedSession";

interface SessionListItemProps {
    session: Session;
    hideLines: boolean
    showSavedIcon?: boolean;
}

const SessionListItem = ({ session, showSavedIcon, hideLines }: SessionListItemProps) => {
    const { isSaved } = useSavedSession(session.id);

    return (
        <IonItem
            key={session.id}
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

            {showSavedIcon && (
                <IonIcon
                    icon={isSaved ? bookmark : ""}
                    slot="start"
                    color="primary"
                />
            )}
        </IonItem>
    );
};

export default SessionListItem;