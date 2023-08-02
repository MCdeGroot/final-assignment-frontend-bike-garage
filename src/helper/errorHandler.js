export function errorHandler(e) {
    if (e.response.status === 400) {
        return "Looks like something went wrong, please fill in the right data";
    } else if (e.response.status === 401) {
        return "Looks like you're not authorized to do this";
    } else if (e.response.status === 403) {
        return "We can not access the page you want to visit, looks like you're not authorized to do so";
    } else if (e.response.status === 404) {
        return (e.response.data);
    } else if (e.response.status >= 500 && e.response.status < 600) {
        return "Server error, sorry we did something wrong, please try again later";
    } else {
        return "Well something went wrong"
    }
}