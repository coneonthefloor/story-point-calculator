/**
 * Checks if the supplied value is an object.
 * 
 * @param {*} value 
 * @returns {boolean}
 */
export function isObject(value) {
    return typeof value == 'object' &&
        !Array.isArray(value) &&
        value !== null
}