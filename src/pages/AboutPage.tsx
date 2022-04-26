import {
    IonCard,
    IonCardContent,
    IonCardHeader,
    IonCardSubtitle,
    IonCardTitle,
    IonItem,
    IonLabel
} from '@ionic/react';
import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import icon from '../assets/icon.png'
import './AboutPage.styles.css';

const AboutPage = () => (
    <StandardPage
        title="About"
    >

        <IonCard>
            <img src={icon} alt="Stir Trek Logo" className="about-icon" />

            <IonCardHeader>
                <IonCardTitle>
                    Stir Trek
                </IonCardTitle>
            </IonCardHeader>

            <IonCardContent>
                <strong>Stir Trek</strong> is a one-day conference focused on teaching software developers, and
                others in the industry, the latest and greatest in technologies, techniques,
                and tools. The full day of content is always concluded with a screening of a
                blockbuster film on its (<em>originally scheduled</em>) opening day. Pretty sweet, huh?
            </IonCardContent>

            <IonItem
                lines="none"
                detail
                href="https://stirtrek.com/"
                target="_blank"
            >
                <IonLabel>
                    Stir Trek Website
                </IonLabel>
            </IonItem>
        </IonCard>

        <IonCard>
            <IonCardHeader>
                <IonCardSubtitle>
                    App Version 6.0.0
                </IonCardSubtitle>
            </IonCardHeader>
            <IonCardContent>
                <p>
                    This app is not affiliated with Stir Trek and is made by someone who simply enjoys going and wanted
                    a way to build a schedule.
                    <br />
                    <br />
                    Stir Trek name and logo are owned by Stir Trek.
                    <br />
                    <br />
                    Session data provided by Stir Trek.
                    <br />
                    <br />
                    App &copy; {new Date().getFullYear()} Andrew Moscardino
                </p>
            </IonCardContent>

            <IonItem
                lines="none"
                detail
                href="https://moscardino.net/"
                target="_blank"
            >
                <IonLabel>
                    moscardino.net
                </IonLabel>
            </IonItem>
        </IonCard>

        <Snowman />
    </StandardPage>
);

export default AboutPage;
