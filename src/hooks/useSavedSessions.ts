import { useQuery } from 'react-query';
import { getSavedSessionIds } from '../api/savedSessions';
import { getSavedSessions } from "../api/stirTrek";
import { TimeSlot } from "../api/types/stirTrek";
import { QueryResult } from "../types/results";

interface UseSavedSessionsResult extends QueryResult {
    timeSlots: TimeSlot[];
    refresh: () => Promise<void>;
}

const useSavedSessions = (): UseSavedSessionsResult => {
    const {
        data: savedSessionIds,
        isLoading: savedSessionsLoading,
        refetch
    } = useQuery('saved-sessions', () => getSavedSessionIds());

    const savedIds = savedSessionIds || [];

    const {
        data: timeSlots,
        isSuccess,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ['saved-sessions', 'with-ids', ...savedIds],
        queryFn: () => getSavedSessions(savedIds),
        enabled: !savedSessionsLoading
    });

    const refresh = async (): Promise<void> => {
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
