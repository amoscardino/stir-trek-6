import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import useSessions from '../hooks/useSessions';
import QueryResultDisplay from '../components/QueryResultDisplay';
import {
    IonItem,
    IonItemDivider,
    IonLabel,
    IonList
} from '@ionic/react';
import React from 'react';

const SessionsPage = () => {
    const { timeSlots, isSuccess, isLoading, isError } = useSessions();

    return (
        <StandardPage
            title="Sessions"
        >
            <QueryResultDisplay
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                isEmpty={timeSlots.length === 0}
                successRender={() => (
                    <>
                        <IonList>
                            {timeSlots.map(timeSlot => (
                                <React.Fragment key={timeSlot.time}>
                                    <IonItemDivider sticky>
                                        <IonLabel>
                                            {timeSlot.time}
                                        </IonLabel>
                                    </IonItemDivider>

                                    {timeSlot.sessions.map(session => (
                                        <IonItem
                                            key={session.id}
                                            detail
                                            routerLink={`/sessions/${session.id}`}
                                        >
                                            <IonLabel>
                                                {session.title}
                                            </IonLabel>
                                        </IonItem>
                                    ))}
                                </React.Fragment>
                            ))}
                        </IonList>
                        <Snowman />
                    </>
                )}
                emptyRender={() => "No sessions to display."}
                errorMessage="Unable to load sessions."
            />
        </StandardPage>
    );
};

export default SessionsPage;
