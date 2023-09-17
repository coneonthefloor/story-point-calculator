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
    return kebabCaseStr.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase())
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

/**
 * Returns true if the input value is falsy and false if it's truthy.
 * 
 * @param {*} value 
 * @returns {boolean}
 */
export function isFalsy(value) {
    return !value
}

/**
 * Converts supplied FormData instance to a plain object.
 * 
 * @param {FormData} formData 
 * @returns {*}
 */
export function formDataToObject(formData) {
    const object = {};
    formData.forEach((value, key) => {
      // Check if the key already exists in the object
      if (object.hasOwnProperty(key)) {
        // If it's an array, push the new value
        if (Array.isArray(object[key])) {
          object[key].push(value);
        } else {
          // If it's not an array, convert it to an array and push the new value
          object[key] = [object[key], value];
        }
      } else {
        // If the key doesn't exist, simply set the value
        object[key] = value;
      }
    });
    return object;
}