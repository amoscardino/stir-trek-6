import { Storage } from '@capacitor/storage';

const STORAGE_KEY = "ST.SavedSessions";

const getSavedSessionIds = async (): Promise<string[]> => {
    const storageItem = await Storage.get({ key: STORAGE_KEY });

    return JSON.parse(storageItem.value || '[]');
};

const toggleSavedSession = async (id: string): Promise<void> => {
    let savedSessionIds = await getSavedSessionIds();

    if (savedSessionIds.indexOf(id) === -1)
        savedSessionIds = [...savedSessionIds, id];
    else
        savedSessionIds = savedSessionIds.filter(x => x !== id);

    await Storage.set({
        key: STORAGE_KEY,
        value: JSON.stringify(savedSessionIds)
    });
};

export {
    getSavedSessionIds,
    toggleSavedSession
};
