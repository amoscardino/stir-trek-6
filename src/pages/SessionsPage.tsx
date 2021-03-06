import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import useSessions from '../hooks/useSessions';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionList from '../components/SessionList';
import { useIonViewDidEnter } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface SessionsPageProps extends RouteComponentProps { }

const SessionsPage = ({ match }: SessionsPageProps) => {
    const { timeSlots, isSuccess, isLoading, isError, refresh } = useSessions();

    useIonViewDidEnter(async () => {
        await refresh();
    });

    return (
        <StandardPage
            title="All Sessions"
            onPullToRefresh={refresh}
        >
            <QueryResultDisplay
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                isEmpty={timeSlots.length === 0}
                successRender={() => (
                    <>
                        <SessionList timeSlots={timeSlots} showSavedIcons path={match.url} />
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
