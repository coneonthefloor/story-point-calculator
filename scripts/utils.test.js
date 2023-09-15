import { it, describe, expect } from 'bun:test'
import { isObject } from './utils'

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