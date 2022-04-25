import {
    IonItemDivider,
    IonLabel,
    IonList
} from "@ionic/react";
import { Fragment } from "react";
import { TimeSlot } from "../api/types/stirTrek";
import { sessionSort } from "../utils/session";
import SessionListItem from "./SessionListItem";

interface SessionListProps {
    timeSlots: TimeSlot[];
    showSavedIcons?: boolean;
    path: string;
}

const SessionList = ({ timeSlots, showSavedIcons, path }: SessionListProps) => (
    <IonList>
        {timeSlots.map(timeSlot => (
            <Fragment key={timeSlot.time}>
                <IonItemDivider sticky>
                    <IonLabel>
                        {timeSlot.time}
                    </IonLabel>
                </IonItemDivider>

                {timeSlot.sessions
                    .sort(sessionSort)
                    .map((session, index) => (
                        <SessionListItem
                            key={session.id}
                            session={session}
                            hideLines={index === timeSlot.sessions.length - 1}
                            showSavedIcon={showSavedIcons}
                            path={path}
                        />
                    ))}
            </Fragment>
        ))}
    </IonList>
);

export default SessionList;
