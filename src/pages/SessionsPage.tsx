import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import useSessions from '../hooks/useSessions';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionList from '../components/SessionList';

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

export default SessionsPage;
