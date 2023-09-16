import { it, describe, expect } from 'bun:test'
import { camelToKebab, isObject, kebabToCamel , isTruthy} from './utils'

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