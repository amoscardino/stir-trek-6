import { Redirect, Route } from 'react-router-dom';
import {
    IonApp,
    IonIcon,
    IonLabel,
    IonRouterOutlet,
    IonTabBar,
    IonTabButton,
    IonTabs,
    setupIonicReact
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { bookmarkOutline, informationCircleOutline, megaphoneOutline } from 'ionicons/icons';
import { QueryClientProvider } from 'react-query';
import SchedulePage from './pages/SchedulePage';
import SessionPage from './pages/SessionPage';
import SessionsPage from './pages/SessionsPage';
import queryClient from './utils/queryClient';
import AboutPage from './pages/AboutPage';

setupIonicReact();

const App = () => (
    <IonApp>
        <QueryClientProvider client={queryClient}>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/:tab(sessions)" component={SessionsPage} exact={true} />
                        <Route path="/:tab(sessions)/:id" component={SessionPage} exact={true} />
                        <Route path="/:tab(schedule)" component={SchedulePage} exact={true} />
                        <Route path="/:tab(schedule)/:id" component={SessionPage} exact={true} />
                        <Route path="/:tab(about)" component={AboutPage} exact={true} />
                        <Redirect exact from="/" to="/sessions" />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="sessions" href="/sessions">
                            <IonIcon icon={megaphoneOutline} />
                            <IonLabel>Sessions</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="schedule" href="/schedule">
                            <IonIcon icon={bookmarkOutline} />
                            <IonLabel>Schedule</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="about" href="/about">
                            <IonIcon icon={informationCircleOutline} />
                            <IonLabel>About</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </QueryClientProvider>
    </IonApp>
);

export default App;
