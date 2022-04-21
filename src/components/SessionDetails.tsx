import {
     IonCard,
      IonCardContent,
      IonCardHeader, 
      IonCardSubtitle,
      IonCardTitle,
      IonItem,
      IonLabel,
      IonList
    } from "@ionic/react";
import { Session } from "../api/types/stirTrek";
import './SessionDetails.css';

interface SessionDetailsProps {
    session: Session;
}

const SessionDetails = ({ session }: SessionDetailsProps) => (
    <>
        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>
                    {session.categories.join(', ')}
                </IonCardSubtitle>
                <IonCardTitle>
                    {session.title}
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                {session.description}
            </IonCardContent>

            <IonItem lines="none">
                <IonLabel>
                    Room
                </IonLabel>
                <IonLabel className="ion-text-end">
                    {session.room}
                </IonLabel>
            </IonItem>
        </IonCard>

        {session.speakers.map(speaker => (
            <IonCard key={speaker.id}>
                {speaker.pictureUrl.length > 0 && (
                    <img
                        src={speaker.pictureUrl}
                        alt={speaker.name}
                        className="speaker-image"
                    />
                )}

                <IonCardHeader>
                    <IonCardSubtitle>
                        {speaker.title}
                    </IonCardSubtitle>

                    <IonCardTitle>
                        {speaker.name}
                    </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                    {speaker.bio}
                </IonCardContent>

                {speaker.links.length > 0 && (
                    <IonList>
                        {speaker.links.map((link, index) => (
                            <IonItem
                                key={link.url}
                                href={link.url}
                                target="_blank"
                                lines={index === speaker.links.length - 1 ? "none" : undefined}
                            >
                                <IonLabel>
                                    {link.title}
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>
                )}
            </IonCard>
        ))}
    </>
);

export default SessionDetails;
