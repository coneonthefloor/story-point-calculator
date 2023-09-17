import { it, describe, expect } from 'bun:test'
import { camelToKebab, isObject, kebabToCamel, isTruthy, isFalsy, formDataToObject } from './utils'

describe('is object', () => {
    it('should determine if value is an object', () => {
        expect(isObject({})).toBeTrue()
        expect(isObject(new class { })).toBeTrue()

        expect(isObject()).toBeFalse()
        expect(isObject(1)).toBeFalse()
        expect(isObject('a')).toBeFalse()
        expect(isObject(NaN)).toBeFalse()
        expect(isObject(null)).toBeFalse()
        expect(isObject(Infinity)).toBeFalse()
        expect(isObject(undefined)).toBeFalse()
    })
})

describe('camel to kebab', () => {
    it('should convert camelCase string to kebab-case', () => {
        expect(camelToKebab('camelCase')).toBe('camel-case')
        expect(camelToKebab('-camelCase')).toBe('camel-case')
    })
})

describe('kebab to camel', () => {
    it('should convert kebab-case string to camelCase', () => {
        expect(kebabToCamel('kebab-case')).toBe('kebabCase')
    })
})

describe('is truthy', () => {
    it('should return true for truthy values', () => {
        expect(isTruthy(true)).toBeTrue()
        expect(isTruthy(5)).toBeTrue()
        expect(isTruthy("Hello")).toBeTrue()
        expect(isTruthy([])).toBeTrue() // An empty array is truthy
        expect(isTruthy({})).toBeTrue() // An empty object is truthy
        expect(isTruthy(new Date())).toBeTrue() // A Date object is truthy
    })

    it('should return false for falsy values', () => {
        expect(isTruthy(false)).toBeFalse()
        expect(isTruthy(0)).toBeFalse()
        expect(isTruthy(null)).toBeFalse()
        expect(isTruthy(undefined)).toBeFalse()
        expect(isTruthy("")).toBeFalse() // An empty string is falsy
        expect(isTruthy(NaN)).toBeFalse() // NaN is falsy
    })
})

describe('is falsy', () => {
    it('should return true for falsy values', () => {
        expect(isFalsy(false)).toBeTrue()
        expect(isFalsy(0)).toBeTrue()
        expect(isFalsy(null)).toBeTrue()
        expect(isFalsy(undefined)).toBeTrue()
        expect(isFalsy("")).toBeTrue() // An empty string is falsy
        expect(isFalsy(NaN)).toBeTrue() // NaN is falsy
    })

    it('should return false for truthy values', () => {
        expect(isFalsy(true)).toBeFalse()
        expect(isFalsy(5)).toBeFalse()
        expect(isFalsy("Hello")).toBeFalse()
        expect(isFalsy([])).toBeFalse() // An empty array is truthy
        expect(isFalsy({})).toBeFalse() // An empty object is truthy
        expect(isFalsy(new Date())).toBeFalse() // A Date object is truthy
    })
})

describe('form data to object', () => {
    it('should convert a FormData instance to an object', () => {
        // Create a sample FormData instance
        const formData = new FormData()
        formData.append('name', 'John')
        formData.append('email', 'john@example.com')

        // Call the formDataToObject function
        const formDataObject = formDataToObject(formData)

        // Perform assertions to check if the conversion is correct
        expect(formDataObject).toEqual({
            name: 'John',
            email: 'john@example.com'
        })
    })

    it('should handle multiple values for the same key as an array', () => {
        // Create a sample FormData instance with multiple values for the same key
        const formData = new FormData()
        formData.append('name', 'John')
        formData.append('name', 'Doe')

        // Call the formDataToObject function
        const formDataObject = formDataToObject(formData)

        // Perform assertions to check if the conversion is correct
        expect(formDataObject).toEqual({
            name: ['John', 'Doe']
        })
    })
})