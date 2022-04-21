import { useQuery } from 'react-query';
import { getSession } from "../api/stirTrek";
import { Session } from '../api/types/stirTrek';
import { QueryResult } from "../types/results";

interface UseSessionResult extends QueryResult {
    session: Session
}

const useSession = (id: string): UseSessionResult => {
    const { data, isSuccess, isLoading, isError } = useQuery(['session', id], () => getSession(id));

    return {
        session: data || {},
        isSuccess,
        isLoading,
        isError
    } as UseSessionResult;
};

export default useSession;
