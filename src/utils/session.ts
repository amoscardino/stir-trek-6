import {
    barChartOutline,
    brushOutline,
    bugOutline,
    calendarClearOutline,
    cloudOutline,
    codeSlashOutline,
    colorPaletteOutline,
    constructOutline,
    diceOutline,
    gitPullRequestOutline,
    hardwareChipOutline,
    infiniteOutline,
    lockClosedOutline,
    peopleOutline,
    phonePortraitOutline
} from "ionicons/icons";
import { Session } from "../api/types/stirTrek";

const getIcon = (session: Session): string => {
    if (session.categories.length === 0)
        return calendarClearOutline;

    switch (session.categories[0].toLowerCase()) {
        case 'app dev':
            return gitPullRequestOutline;
        case 'architecture / patterns':
            return constructOutline;
        case 'cloud / infrastructure':
            return cloudOutline;
        case 'data / ai':
            return barChartOutline;
        case 'design':
            return colorPaletteOutline;
        case 'devops':
            return infiniteOutline;
        case 'iot / maker':
            return hardwareChipOutline;
        case 'misc *.*':
            return diceOutline;
        case 'mobile / client':
            return phonePortraitOutline;
        case 'professional skills / soft skills':
            return peopleOutline;
        case 'security':
            return lockClosedOutline;
        case 'testing / quality':
            return bugOutline;
        case 'web':
            return codeSlashOutline;
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
