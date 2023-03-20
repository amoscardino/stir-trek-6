import {
    appsOutline,
    brushOutline,
    buildOutline,
    bulbOutline,
    businessOutline,
    calendarClearOutline,
    cloudOutline,
    codeSlashOutline,
    extensionPuzzleOutline,
    flaskOutline,
    shieldOutline,
    wifiOutline
} from "ionicons/icons";
import { Session } from "../api/types/stirTrek";

const getIcon = (session: Session): string => {
    if (session.categories.length === 0)
        return calendarClearOutline;

    switch (session.categories[0].toLowerCase()) {
        case 'Application Languages, Frameworks, Fundamentals'.toLowerCase():
            return extensionPuzzleOutline;

        case 'Architecture, Patterns'.toLowerCase():
            return buildOutline;

        case 'Cloud, Infra, DevOps'.toLowerCase():
            return cloudOutline;

        case 'Data, AI, ML'.toLowerCase():
            return bulbOutline;

        case 'Design, Product Strategy'.toLowerCase():
            return brushOutline;

        case 'Full Stack Web Development'.toLowerCase():
            return codeSlashOutline;

        case 'IoT, Home Automation, Maker Topics'.toLowerCase():
            return wifiOutline;

        case 'Mobile & Desktop App Development'.toLowerCase():
            return appsOutline;

        case 'Professional Skills, Leadership, Business'.toLowerCase():
            return businessOutline;

        case 'Security'.toLowerCase():
            return shieldOutline;

        case 'Software Quality - Testing, Process, Code Reviews, etc.'.toLowerCase():
            return flaskOutline;

        default:
            return calendarClearOutline;
    }
};

const sessionSort = (a: Session, b: Session): number => {
    const [aCategory] = a.categories || [''];
    const [bCategory] = b.categories || [''];

    if (aCategory === bCategory)
        return 0;

    return aCategory > bCategory ? 1 : -1;
};

export { getIcon, sessionSort };
