import { useQuery } from 'react-query';
import { getSavedSessionIds, toggleSavedSession } from '../api/savedSessions';
import queryClient from '../utils/queryClient';

interface UseSavedSessionResult {
    isSaved: boolean;
    toggleSaved: () => Promise<void>;
}

const useSavedSession = (id: string): UseSavedSessionResult => {
    const { data } = useQuery('saved-sessions', () => getSavedSessionIds());

    const toggleSaved = async (): Promise<void> => {
        await toggleSavedSession(id);
        queryClient.invalidateQueries('saved-sessions');
    };

    return {
        isSaved: (data || []).indexOf(id) !== -1,
        toggleSaved
    }
};

export default useSavedSession;
