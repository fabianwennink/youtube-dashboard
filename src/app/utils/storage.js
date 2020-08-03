export function storageSet(key, value) {
    localStorage.setItem(key, value);
}

export function storageGet(key, defaultValue = null) {
    return localStorage.getItem(key) || defaultValue;
}
