import { useQuery } from 'react-query';
import { getSession } from "../api/stirTrek";
import { Session } from '../api/types/stirTrek';
import { QueryResult } from "../types/results";

interface UseSessionResult extends QueryResult {
    session: Session;
    refresh: () => Promise<void>;
}

const useSession = (id: string): UseSessionResult => {
    const { data, isSuccess, isLoading, isError, refetch } = useQuery(['session', id], () => getSession(id));

    const refresh = async () => {
        await refetch()
    };

    return {
        session: data || {},
        isSuccess,
        isLoading,
        isError,
        refresh
    } as UseSessionResult;
};

export default useSession;
