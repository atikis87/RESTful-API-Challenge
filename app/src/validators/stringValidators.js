const URL_REGEX = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;
const EMAIL_REGEX = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;

export function isString(errorMsg) {
    return function(string) {
        if (typeof string !== 'string') {
            throw new Error(errorMsg);
        }
    };
}

export function isUrl(errorMsg) {
    return function(url) {
        if (!URL_REGEX.test(url)) {
            throw new Error(errorMsg);
        }
    };
}

export function stringRange(min, max, errorMsg) {
    return function(string) {
        if (string.length < min || string.length > max) {
            throw new Error(errorMsg);
        }
    };
}

export function isEmail(errorMsg) {
    return function(email) {
        if (!EMAIL_REGEX.test(email)) {
            throw new Error(errorMsg);
        }
    };
}
