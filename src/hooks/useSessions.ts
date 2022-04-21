import { useQuery } from 'react-query';
import { getSessions } from "../api/stirTrek";
import { TimeSlot } from "../api/types/stirTrek";
import { QueryResult } from "../types/results";

interface UseSessionsResult extends QueryResult {
    timeSlots: TimeSlot[];
}

const useSessions = (): UseSessionsResult => {
    const { data, isSuccess, isLoading, isError } = useQuery('sessions', () => getSessions());

    return {
        timeSlots: data || [],
        isSuccess,
        isLoading,
        isError
    } as UseSessionsResult;
};

export default useSessions;
