/**
 * Returns the part as a percentage of the whole.
 * 
 * @param {number} part 
 * @param {number} whole 
 * @returns {number} 
 */
export function calculatePercentage(part, whole) {
    if (typeof part !== 'number' || typeof whole !== 'number' || whole === 0) {
        throw new Error('Both "part" and "whole" must be numbers, and "whole" must not be zero.');
    }

    return (part / whole) * 100;
}

/**
 * Returns the percentage value of the supplied number.
 * 
 * @param {number} percentage 
 * @param {number} number 
 * @returns {number}
 */
export function calculatePercentageValue(percentage, number) {
    return number * (percentage / 100);
}

/**
 * Returns the sum of an array of numbers.
 * 
 * @param {number[]} numbers 
 * @returns {number}
 */
export function calculateSumOfNumbers(numbers) {
    return numbers.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
}

/**
 * Returns the average value of an array of numbers.
 * 
 * @param {number[]} numbers
 * @returns {number}
 */
export function calculateAverage(numbers) {
    if (numbers.length === 0) {
        return 0;
    }

    return calculateSumOfNumbers(numbers) / numbers.length;
}