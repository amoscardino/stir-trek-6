import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonIcon,
    IonItem,
    IonLabel,
    IonList,
    IonNote
} from "@ionic/react";
import ReactMarkdown from 'react-markdown'
import { Session } from "../api/types/stirTrek";
import { getIcon } from "../utils/session";
import './SessionDetails.css';

interface SessionDetailsProps {
    session: Session;
}

const SessionDetails = ({ session }: SessionDetailsProps) => (
    <>
        <IonCard className="session-detail-card">
            <div className="session-icon">
                <IonIcon icon={getIcon(session)} color="primary" />
            </div>

            <IonCardHeader>
                <IonCardSubtitle>
                    {session.categories.join(', ')}
                </IonCardSubtitle>
                <IonCardTitle>
                    {session.title}
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <ReactMarkdown>
                    {session.description}
                </ReactMarkdown>
            </IonCardContent>

            <IonItem lines={session.theatres.length === 0 ? "none" : undefined}>
                <IonLabel>
                    Room
                </IonLabel>
                <IonNote slot="end">
                    {session.room}
                </IonNote>
            </IonItem>

            {session.theatres.length > 0 && (
                <IonItem lines="none">
                    <IonLabel>
                        Theatres
                    </IonLabel>

                    {session.theatres.map(theatre => (
                        <IonNote
                            key={theatre}
                            slot="end"
                            color={theatre === session.speakerTheatre ? "primary" : ""}
                            className={theatre === session.speakerTheatre ? "text-bold text-underline" : ""}
                        >
                            {theatre}
                        </IonNote>
                    ))}
                </IonItem>
            )}
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
                    <ReactMarkdown>
                        {speaker.bio}
                    </ReactMarkdown>
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
