import { describe, it, expect } from 'bun:test'
import { calculateAverage, calculatePercentage, calculatePercentageValue, calculateSumOfNumbers } from './math'

describe('calculate percentage', () => {
    it('should return the correct percentage', () => {
        expect(calculatePercentage(25, 100)).toBe(25)
        expect(calculatePercentage(4, 12).toFixed(2)).toBe("33.33")
        expect(calculatePercentage(-1, 3).toFixed(2)).toBe("-33.33")
        expect(calculatePercentage(2, 1)).toBe(200)
        expect(calculatePercentage(3_000, 12_000)).toBe(25)
        expect(calculatePercentage(3_000_000, 12_000_000)).toBe(25)
        expect(calculatePercentage(3_000_000_000, 12_000_000_000)).toBe(25)
    })

    it('should throw error if invalid arguments', () => {
        expect(() => calculatePercentage('a', 1)).toThrow()
        expect(() => calculatePercentage(1, {})).toThrow()
        expect(() => calculatePercentage(1, 0)).toThrow()
        expect(() => calculatePercentage(0, 0)).toThrow()
    })
})

describe('calculate percentage value', () => {
    it('should return the correct value', () => {
        expect(calculatePercentageValue(0, 0)).toBe(0)
        expect(calculatePercentageValue(0, 100)).toBe(0)
        expect(calculatePercentageValue(10, 90)).toBe(9)
        expect(calculatePercentageValue(-10, 90)).toBe(-9)
        expect(calculatePercentageValue(110, 10)).toBe(11)
        expect(calculatePercentageValue(7.5, 24).toFixed(2)).toBe("1.80")
        expect(calculatePercentageValue(33, 110).toFixed(2)).toBe("36.30")
    })
})

describe('calculate sum', () => {
    it('should return the correct sum', () => {
        expect(calculateSumOfNumbers([])).toBe(0)
        expect(calculateSumOfNumbers([1, 1, 1])).toBe(3)
        expect(calculateSumOfNumbers([-1, 0, 1])).toBe(0)
        expect(calculateSumOfNumbers([1.1, 1.1, 1.1]).toFixed(1)).toBe("3.3")
    })
})

describe('calculate average', () => {
    it('should return the correct average', () => {
        expect(calculateAverage([])).toBe(0)
        expect(calculateAverage([1, 1, 1])).toBe(1)
        expect(calculateAverage([1, 2, 3])).toBe(2)
        expect(calculateAverage([-1, 0, 1])).toBe(0)
        expect(calculateAverage([1.1, 2.2, 3.3]).toFixed(1)).toBe("2.2")
    })
})