export function isNumber(errorMsg) {
    return function(number) {
        if (typeof number !== 'number') {
            throw new Error(errorMsg);
        }
    };
}