import { it, describe, expect } from 'bun:test'
import { camelToKebab, isObject, kebabToCamel } from './utils'

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