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

/**
 * Converts camelCase string to kebab-case.
 *  
 * @param {string} camelCaseStr 
 * @returns {string}
 */
export function camelToKebab(camelCaseStr) {
    // Use a regular expression to find all occurrences of a capital letter
    // followed by a lowercase letter and replace them with "-lowercaseLetter"
    const kebabCaseStr = camelCaseStr.replace(/([A-Z])/g, "-$1").toLowerCase()

    // If the string starts with "-", remove it
    if (kebabCaseStr.charAt(0) === "-") {
        return kebabCaseStr.slice(1)
    }

    return kebabCaseStr
}

/**
 * Converts kebab-case to camelCase.
 * 
 * @param {string} kebabCaseStr 
 * @returns {string}
 */
export function kebabToCamel(kebabCaseStr) {
    // Use a regular expression to find hyphens followed by lowercase letters
    // and replace them with the uppercase version of the letter
    const camelCaseStr = kebabCaseStr.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())

    return camelCaseStr
}

/**
 * Returns true if the input value is truthy and false if it's falsy.
 * 
 * @param {*} value 
 * @returns {boolean}
 */
export function isTruthy(value) {
    return !!value
}