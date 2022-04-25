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
import { megaphoneOutline, timeOutline } from 'ionicons/icons';
import { QueryClientProvider } from 'react-query';
import SchedulePage from './pages/SchedulePage';
import SessionPage from './pages/SessionPage';
import SessionsPage from './pages/SessionsPage';
import queryClient from './utils/queryClient';

setupIonicReact({ mode: "ios" });

const App = () => (
    <IonApp>
        <QueryClientProvider client={queryClient}>
            <IonReactRouter>
                <IonTabs>
                    <IonRouterOutlet>
                        <Route path="/:tab(schedule)" component={SchedulePage} exact={true} />
                        <Route path="/:tab(schedule)/:id" component={SessionPage} exact={true} />
                        <Route path="/:tab(sessions)" component={SessionsPage} exact={true} />
                        <Route path="/:tab(sessions)/:id" component={SessionPage} exact={true} />
                        <Redirect exact from="/" to="/schedule" />
                    </IonRouterOutlet>

                    <IonTabBar slot="bottom">
                        <IonTabButton tab="schedule" href="/schedule">
                            <IonIcon icon={timeOutline} />
                            <IonLabel>Schedule</IonLabel>
                        </IonTabButton>

                        <IonTabButton tab="sessions" href="/sessions">
                            <IonIcon icon={megaphoneOutline} />
                            <IonLabel>Sessions</IonLabel>
                        </IonTabButton>
                    </IonTabBar>
                </IonTabs>
            </IonReactRouter>
        </QueryClientProvider>
    </IonApp>
);

export default App;
