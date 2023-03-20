import StandardPage from '../components/StandardPage';
import ListFooter from '../components/ListFooter';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionList from '../components/SessionList';
import useSavedSessions from '../hooks/useSavedSessions';
import { useIonViewDidEnter } from '@ionic/react';
import { RouteComponentProps } from 'react-router';

interface SchedulePageProps extends RouteComponentProps { }

const SchedulePage = ({ match }: SchedulePageProps) => {
    const { timeSlots, isSuccess, isLoading, isError, refresh } = useSavedSessions();

    useIonViewDidEnter(async () => {
        await refresh();
    });

    return (
        <StandardPage
            title="My Schedule"
            onPullToRefresh={refresh}
        >
            <QueryResultDisplay
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                isEmpty={timeSlots.length === 0}
                successRender={() => (
                    <>
                        <SessionList timeSlots={timeSlots} path={match.url} />
                        <ListFooter />
                    </>
                )}
                emptyRender={() => (
                    <>
                        You don't have any saved sessions.
                        <br />
                        <br />
                        Go to the Sessions tab to start building your schedule.
                    </>
                )}
                errorMessage="Unable to load sessions."
            />
        </StandardPage>
    );
};

export default SchedulePage;
