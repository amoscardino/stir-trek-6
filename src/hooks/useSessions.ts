import { useQuery } from 'react-query';
import { getSessions } from "../api/stirTrek";
import { TimeSlot } from "../api/types/stirTrek";
import { QueryResult } from "../types/results";

interface UseSessionsResult extends QueryResult {
    timeSlots: TimeSlot[];
    refresh: () => Promise<void>;
}

const useSessions = (): UseSessionsResult => {
    const {
        data,
        isSuccess,
        isLoading,
        isError,
        refetch
    } = useQuery('sessions', () => getSessions());

    const refresh = async() => {
        await refetch();
    };

    return {
        timeSlots: data || [],
        isSuccess,
        isLoading,
        isError,
        refresh
    } as UseSessionsResult;
};

export default useSessions;
