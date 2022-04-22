import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionList from '../components/SessionList';
import useSavedSessions from '../hooks/useSavedSessions';
import { useIonViewDidEnter } from '@ionic/react';

const SchedulePage = () => {
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
                        <SessionList timeSlots={timeSlots} />
                        <Snowman />
                    </>
                )}
                emptyRender={() => "No sessions to display."}
                errorMessage="Unable to load sessions."
            />
        </StandardPage>
    );
};

export default SchedulePage;
