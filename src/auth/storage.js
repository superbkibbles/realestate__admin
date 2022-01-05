const authKey = "authToken";
const userKey = "qwhivfds3232332";

export const storeToken = authToken => {
    sessionStorage.setItem(authKey, authToken);
}

export const storeUser = user => {
    sessionStorage.setItem(userKey, user);
}

export const getToken = () => {
    return sessionStorage.getItem(authKey);
}

export const getUser = () => {
    return JSON.parse(sessionStorage.getItem(userKey));
}

export const removeToken = () => {
    sessionStorage.removeItem(authKey)
}

export const removeUser = () => {
    sessionStorage.removeItem(userKey);
}

export const removeUserToken = () => {
    sessionStorage.removeItem(userKey);
    sessionStorage.removeItem(authKey);
}