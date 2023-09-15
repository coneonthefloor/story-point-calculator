import { it, describe, expect } from 'bun:test'
import { StateStore } from './state'

describe("state store", () => {
    it('should throw if initial state not supplied', () => {
        expect(() => new StateStore()).toThrow()
    })

    it('should throw if initial state not an object', () => {
        expect(() => new StateStore(1)).toThrow()
        expect(() => new StateStore([])).toThrow()
        expect(() => new StateStore('a')).toThrow()
        expect(() => new StateStore(NaN)).toThrow()
        expect(() => new StateStore(null)).toThrow()
    })

    it('should throw error if state modified directly', () => {
        const testObj = { name: 'hello' }
        const stateStore = new StateStore(testObj)
        expect(() => stateStore._state.name = 'error').toThrow()
    })

    it('should return copy of state', () => {
        const testObj = { name: 'test' }
        const store = new StateStore(testObj)
        const initialName = testObj.name
        testObj.name = 'changed'
        expect(store.getState().name).toBe(initialName)
    })

    it('should throw if new state object not supplied on update', () => {
        const store = new StateStore({})

        expect(() => store.updateState()).toThrow()
        expect(() => store.updateState(1)).toThrow()
        expect(() => store.updateState([])).toThrow()
        expect(() => store.updateState('a')).toThrow()
        expect(() => store.updateState(null)).toThrow()
    })

    it('should update state based off supplied object', () => {
        const store = new StateStore({ name: 'test' })

        expect(store.updateState({ name: 'changed' }).name).toBe('changed')
        expect(store.updateState({ added: true }).added).toBeTrue()
    })

    it('should emit event state updated', async () => {
        await new Promise(resolve => {
            const testObj = { name: 'test' }
            const store = new StateStore({})

            store.onUpdate((event) => {
                expect(event.detail.state).toEqual(testObj)
                resolve()
            })

            store.updateState(testObj)
        })
    })

    it('should specify which properties have updated', async () => {
        await new Promise(resolve => {
            const testObj = { name: 'test' }
            const store = new StateStore({})

            store.onUpdate((event) => {
                expect(event.detail.updatedProperties).toEqual(['name'])
                resolve()
            })

            store.updateState(testObj)
        })
    })

    it('should return state when updated', () => {
        const testObj = { name: 'test' }
        const store = new StateStore({})

        expect(store.updateState(testObj)).toEqual(testObj)
    })
})