import StandardPage from '../components/StandardPage';
import Snowman from '../components/Snowman';
import { RouteComponentProps } from 'react-router';
import useSession from '../hooks/useSession';
import QueryResultDisplay from '../components/QueryResultDisplay';
import SessionDetails from '../components/SessionDetails';

interface SessionPageParams {
    id: string;
}

interface SessionPageProps extends RouteComponentProps<SessionPageParams> { }

const SessionPage = ({ match }: SessionPageProps) => {
    const id = match.params.id;
    const { session, isSuccess, isLoading, isError } = useSession(id);

    return (
        <StandardPage
            title="Session"
            showBackButton
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