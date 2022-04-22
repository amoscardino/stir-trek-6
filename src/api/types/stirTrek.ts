export interface TimeSlot {
    time: string;
    sessions: Session[];
}

export interface Session {
    id: string;
    title: string;
    description: string;
    room: string;
    theatres: number[];
    speakerTheatre?: number;
    speakers: Speaker[];
    categories: string[];
    isSaved: boolean;
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