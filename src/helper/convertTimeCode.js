export function convertTimeCode(timeCode) {
    if (typeof timeCode !== 'string') {
        // Handle the case when timeCode is not a string
        return '';
    }

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

// export function convertTimeToString(time) {
//     const timeString = time;
//
//     // Ontleden van de uren en minuten uit de string
//     const [hours, minutes] = timeString.split(":").map(Number);
//
// // Aanmaken van een Duration-object op basis van de uren en minuten
//     const duration = Duration.fromObject({ hours, minutes });
//
// // Omzetten naar het gewenste formaat (PT3H5M)
//     const durationStringFormatted = duration.toISOTime();
//
//     console.log(durationStringFormatted); // Output: PT2H0M
//
// }