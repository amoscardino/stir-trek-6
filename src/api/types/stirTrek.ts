export interface TimeSlot {
    time: string;
    sessions: Session[];
}

export interface Session {
    id: string;
    title: string;
    description: string;
    room: string;
    speakers: Speaker[];
    categories: string[];
}

export interface Speaker{
    id: string;
    name: string;
    bio: string;
    title: string;
    pictureUrl: string;
    links: SpeakerLink[];
}

export interface SpeakerLink {
    title: string;
    url: string;
}