import jwt_decode from "jwt-decode";

export function validateToken(token) {

    const decodedToken = jwt_decode(token);
    const currentDate = Date.now();
    const expirationTime = decodedToken.exp * 1000;
    console.log(decodedToken + " : " + expirationTime);

    return currentDate < expirationTime;
}