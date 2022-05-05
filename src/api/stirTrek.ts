import { Storage } from '@capacitor/storage';
import {
    addHours,
    formatISO,
    isAfter,
    parseISO
} from 'date-fns';
import { getSavedSessionIds } from "./savedSessions";
import {
    Session,
    Speaker,
    SpeakerLink,
    TimeSlot
} from "./types/stirTrek";

const CACHE_KEY_DATE = 'ST.Cache.Date';
const CACHE_KEY_SCHEDULE = 'ST.Cache.Schedule';
const CACHE_KEY_SESSIONS = 'ST.Cache.Sessions';
const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_URL || '';
const SESSIONS_URL = process.env.REACT_APP_SESSIONS_URL || '';

const getData = async (): Promise<any[]> => {
    const { value: cacheDate } = await Storage.get({ key: CACHE_KEY_DATE });
    const { value: scheduleCacheData } = await Storage.get({ key: CACHE_KEY_SCHEDULE });
    const { value: sessionCacheData } = await Storage.get({ key: CACHE_KEY_SESSIONS });

    if (cacheDate && cacheDate.length > 0
        && scheduleCacheData && scheduleCacheData.length > 0
        && sessionCacheData && sessionCacheData.length > 0) {
        const parseDate = addHours(parseISO(cacheDate), 1);

        if (isAfter(parseDate, new Date())) {
            return [
                JSON.parse(scheduleCacheData),
                JSON.parse(sessionCacheData)
            ];
        }
    }

    const promises = [fetch(SCHEDULE_URL), fetch(SESSIONS_URL)];
    const [scheduleResponse, sessionsResponse] = await Promise.all(promises);

    if (!scheduleResponse.ok || !sessionsResponse.ok)
        throw new Error('Unable to load data');

    const scheduleData = await scheduleResponse.json();
    const sessionData = await sessionsResponse.json();

    await Storage.set({ key: CACHE_KEY_DATE, value: formatISO(new Date()) });
    await Storage.set({ key: CACHE_KEY_SCHEDULE, value: JSON.stringify(scheduleData) });
    await Storage.set({ key: CACHE_KEY_SESSIONS, value: JSON.stringify(sessionData) });

    return [scheduleData, sessionData];
};

const getTheatres = (room: string): number[] => {
    switch (room.toLowerCase()) {
        case 'cgi':
            return [4, 5, 6, 7, 8, 9];
        case 'upstart':
            return [1, 2, 3];
        case 'revel it':
            return [10, 11, 15];
        case 'cas':
            return [12, 13, 14];
        case 'dmg':
            return [16, 21];
        case 'daugherty':
            return [17, 20];
        case 'impact.com':
            return [23, 24, 25, 26, 27];
        case 'aware':
            return [18, 19, 28];
        default:
            return [];
    }
};

const getSpeakerTheatre = (room: string): number | null => {
    switch (room.toLowerCase()) {
        case 'cgi':
            return 4;
        case 'upstart':
            return 3;
        case 'revel it':
            return 15;
        case 'cas':
            return 14;
        case 'dmg':
            return 16;
        case 'daugherty':
            return 17;
        case 'impact.com':
            return 27;
        case 'aware':
            return 29;
        default:
            return null;
    }
};

const getSessionSpeakers = (sessionData: any, session: any): Speaker[] => {
    return sessionData.speakers
        .filter((speaker: any) => session.speakers.indexOf(speaker.id) !== -1)
        .map((speaker: any) => {
            return {
                id: speaker.id,
                name: speaker.fullName,
                bio: speaker.bio,
                title: speaker.tagLine,
                pictureUrl: speaker.profilePicture,
                links: speaker.links.map((link: any) => {
                    return {
                        title: link.title,
                        url: link.url
                    } as SpeakerLink;
                })
            } as Speaker;
        });
}

const getSessionCategories = (categories: any, session: any): string[] => {
    return categories
        .filter((category: any) => session.categoryItems.indexOf(category.id) !== -1)
        .map((category: any) => category.name);
};

const getSessions = async (): Promise<TimeSlot[]> => {
    const [scheduleData, sessionData] = await getData();

    const savedSessionIds = await getSavedSessionIds();
    const categories = sessionData.categories.map((category: any) => category.items).flat();

    return scheduleData.scheduledSessions.timeSlots.map((timeSlotData: any) => ({
        time: timeSlotData.time,
        sessions: timeSlotData.sessions.map((timeSlotSession: any) => {
            const [session] = sessionData.sessions.filter((x: any) => x.id === timeSlotSession.id);

            return {
                id: timeSlotSession.id,
                title: session.title,
                description: session.description || '',
                room: timeSlotSession.scheduledRoom,
                theatres: getTheatres(timeSlotSession.scheduledRoom),
                speakerTheatre: getSpeakerTheatre(timeSlotSession.scheduledRoom),
                speakers: getSessionSpeakers(sessionData, session),
                categories: getSessionCategories(categories, session),
                isSaved: savedSessionIds.indexOf(timeSlotSession.id) !== -1
            } as Session;
        })
    } as TimeSlot));
};

const getSavedSessions = async (): Promise<TimeSlot[]> => {
    const timeSlots = await getSessions();

    return timeSlots
        .map(timeSlot => {
            return {
                ...timeSlot,
                sessions: timeSlot.sessions.filter(session => session.isSaved)
            }
        })
        .filter(timeSlot => timeSlot.sessions.length > 0);
};

const getSession = async (id: string): Promise<Session> => {
    const timeSlots = await getSessions();

    const [session] = timeSlots
        .map(timeSlot => timeSlot.sessions)
        .flat()
        .filter(session => session.id === id);

    return session;
};

const clearApiCache = async () => {
    await Storage.remove({ key: CACHE_KEY_DATE });
    await Storage.remove({ key: CACHE_KEY_SCHEDULE });
    await Storage.remove({ key: CACHE_KEY_SESSIONS });
};

export {
    getSessions,
    getSavedSessions,
    getSession,
    clearApiCache
};

