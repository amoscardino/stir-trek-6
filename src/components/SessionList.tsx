import {
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList
} from "@ionic/react";
import {Fragment} from "react";
import { TimeSlot } from "../api/types/stirTrek";

interface SessionListProps {
    timeSlots: TimeSlot[];
}

const SessionList = ({ timeSlots }: SessionListProps) => (
    <IonList>
        {timeSlots.map(timeSlot => (
            <Fragment key={timeSlot.time}>
                <IonItemDivider sticky>
                    <IonLabel>
                        {timeSlot.time}
                    </IonLabel>
                </IonItemDivider>

                {timeSlot.sessions.map((session, index) => (
                    <IonItem
                        key={session.id}
                        detail
                        routerLink={`/sessions/${session.id}`}
                        lines={index === timeSlot.sessions.length - 1 ? "none" : undefined}
                    >
                        <IonLabel>
                            {session.title}
                        </IonLabel>
                    </IonItem>
                ))}
            </Fragment>
        ))}
    </IonList>
);

export default SessionList;
