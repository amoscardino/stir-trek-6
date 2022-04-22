import { useQuery } from 'react-query';
import { getSavedSessions } from "../api/stirTrek";
import { TimeSlot } from "../api/types/stirTrek";
import { QueryResult } from "../types/results";

interface UseSavedSessionsResult extends QueryResult {
    timeSlots: TimeSlot[];
    refresh: () => Promise<void>;
}

const useSavedSessions = (): UseSavedSessionsResult => {
    const {
        data: timeSlots,
        isSuccess,
        isLoading,
        isError,
        refetch
    } = useQuery({
        queryKey: ['saved-sessions'],
        queryFn: () => getSavedSessions()
    });

    const refresh = async () => {
        await refetch();
    };

    return {
        timeSlots: timeSlots || [],
        isSuccess,
        isLoading,
        isError,
        refresh
    } as UseSavedSessionsResult;
};

export default useSavedSessions;
