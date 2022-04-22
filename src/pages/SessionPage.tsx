import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import { RouteComponentProps } from 'react-router';
import useSession from '../hooks/useSession';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionDetails from '../components/SessionDetails';
import SavedSessionButton from '../components/SavedSessionButton';

interface SessionPageParams {
    id: string;
}

interface SessionPageProps extends RouteComponentProps<SessionPageParams> { }

const SessionPage = ({ match }: SessionPageProps) => {
    const { session, isSuccess, isLoading, isError, refresh } = useSession(match.params.id);

    return (
        <StandardPage
            title="Session"
            showBackButton
            primaryButton={<SavedSessionButton session={session} onChange={refresh} />}
        >
            <QueryResultDisplay
                isSuccess={isSuccess}
                isLoading={isLoading}
                isError={isError}
                successRender={() => (
                    <>
                        <SessionDetails session={session} />

                        <Snowman />
                    </>
                )}
                errorMessage="Unable to load session."
            />
        </StandardPage>
    );
};

export default SessionPage;
