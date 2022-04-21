import {
    IonItemDivider,
    IonLabel,
    IonList
} from "@ionic/react";
import { Fragment } from "react";
import { TimeSlot } from "../api/types/stirTrek";
import SessionListItem from "./SessionListItem";

interface SessionListProps {
    timeSlots: TimeSlot[];
    showSavedIcons?: boolean;
}

const SessionList = ({ timeSlots, showSavedIcons }: SessionListProps) => (
    <IonList>
        {timeSlots.map(timeSlot => (
            <Fragment key={timeSlot.time}>
                <IonItemDivider sticky>
                    <IonLabel>
                        {timeSlot.time}
                    </IonLabel>
                </IonItemDivider>

                {timeSlot.sessions.map((session, index) => (
                    <SessionListItem
                        key={session.id}
                        session={session}
                        hideLines={index === timeSlot.sessions.length - 1}
                        showSavedIcon={showSavedIcons}
                    />
                ))}
            </Fragment>
        ))}
    </IonList>
);

export default SessionList;
