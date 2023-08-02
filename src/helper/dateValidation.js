export function isBefore(date) {
    const today = new Date();
    const selected = new Date(date)
    if (selected >= today) {
        return "Date cannot be in the future!"
    }
    return true;
}