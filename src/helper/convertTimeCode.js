export function convertTimeCode(timeCode) {
    const regex = /PT(\d+)H(\d+)M/;
    const match = timeCode.match(regex);

    if (match != null) {
        const hours = parseInt(match[1]);
        const minutes = parseInt(match[2]);
        return `${hours}u ${minutes}m`;
        } else {
        const regex2 = /PT(\d+)M/;
        const match2 = timeCode.match(regex2);
        const minutes2 = parseInt(match2[1]);
        return `${minutes2}m`;
    }

    return '';
}