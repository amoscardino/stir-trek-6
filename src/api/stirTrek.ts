import { Session, Speaker, SpeakerLink, TimeSlot } from "./types/stirTrek";

const SCHEDULE_URL = process.env.REACT_APP_SCHEDULE_URL || '';
const SESSIONS_URL = process.env.REACT_APP_SESSIONS_URL || '';

const getSessions = async (): Promise<TimeSlot[]> => {
    const promises = [fetch(SCHEDULE_URL), fetch(SESSIONS_URL)];
    const [scheduleResponse, sessionsResponse] = await Promise.all(promises);

    if (!scheduleResponse.ok || !sessionsResponse.ok)
        throw new Error('Unable to load data');

    var scheduleData = await scheduleResponse.json();
    var sessionData = await sessionsResponse.json();

    console.log(scheduleData);
    console.log(sessionData);

    const categories = sessionData.categories.map((category: any) => category.items).flat();

    return scheduleData.scheduledSessions.timeSlots.map((timeSlotData: any) => {
        return {
            time: timeSlotData.time,
            sessions: timeSlotData.sessions.map((timeSlotSession: any) => {
                const [session] = sessionData.sessions.filter((x: any) => x.id === timeSlotSession.id);

                return {
                    id: timeSlotSession.id,
                    title: session.title,
                    description: session.description || '',
                    room: timeSlotSession.scheduledRoom,
                    speakers: sessionData.speakers
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
                        }),
                    categories: categories
                        .filter((category: any) => session.categoryItems.indexOf(category.id) !== -1)
                        .map((category: any) => category.name)
                } as Session;
            })
        } as TimeSlot;
    });
};

const getSavedSessions = async (ids: string[]): Promise<TimeSlot[]> => {
    const timeSlots = await getSessions();

    return timeSlots
        .map(timeSlot => {
            return {
                ...timeSlot,
                sessions: timeSlot.sessions.filter(session => ids.indexOf(session.id) !== -1)
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

export {
    getSessions,
    getSavedSessions,
    getSession
};
