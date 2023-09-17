import { it, describe, expect } from 'bun:test'
import { Store } from './store'

describe("state store", () => {
    it('should throw if initial state not supplied', () => {
        expect(() => new Store()).toThrow()
    })

    it('should throw if initial state not an object', () => {
        expect(() => new Store(1)).toThrow()
        expect(() => new Store([])).toThrow()
        expect(() => new Store('a')).toThrow()
        expect(() => new Store(NaN)).toThrow()
        expect(() => new Store(null)).toThrow()
    })

    it('should throw error if state modified directly', () => {
        const testObj = { name: 'hello' }
        const stateStore = new Store(testObj)
        expect(() => stateStore.state.name = 'error').toThrow()
    })

    it('should return copy of state', () => {
        const testObj = { name: 'test' }
        const store = new Store(testObj)
        const initialName = testObj.name
        testObj.name = 'changed'
        expect(store.getState().name).toBe(initialName)
    })

    it('should throw if new state object not supplied on update', () => {
        const store = new Store({})

        expect(() => store.updateState()).toThrow()
        expect(() => store.updateState(1)).toThrow()
        expect(() => store.updateState([])).toThrow()
        expect(() => store.updateState('a')).toThrow()
        expect(() => store.updateState(null)).toThrow()
    })

    it('should update state based off supplied object', () => {
        const store = new Store({ name: 'test' })

        expect(store.updateState({ name: 'changed' }).name).toBe('changed')
        expect(store.updateState({ added: true }).added).toBeTrue()
    })

    it('should emit event state updated', async () => {
        await new Promise(resolve => {
            const testObj = { name: 'test' }
            const store = new Store({})

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
            const store = new Store({})

            store.onUpdate((event) => {
                expect(event.detail.updatedProperties).toEqual(['name'])
                resolve()
            })

            store.updateState(testObj)
        })
    })

    it('should return state when updated', () => {
        const testObj = { name: 'test' }
        const store = new Store({})

        expect(store.updateState(testObj)).toEqual(testObj)
    })

    it('should save state', () => {
        const store = new Store({})
        store.saveState('test')
        expect(store.savedStates.has('test')).toBeTrue()
    })

    it('should return name and state as tuple when saved', () => {
        const store = new Store({ name: 'test' })
        expect(store.saveState('test')).toEqual(['test', { name: 'test' }])
    })

    it('should remove saved state', () => {
        const store = new Store({})
        store.saveState('test')
        store.removeSavedState('test')
        expect(store.savedStates.has('test')).toBeFalse()
    })

    it('should return true or false on remove state', () => {
        const store = new Store({})
        store.saveState('test')
        expect(store.removeSavedState('test')).toBeTrue()
        expect(store.removeSavedState('test')).toBeFalse()
    })

    it('should not throw error if state does not exist on remove', () => {
        const store = new Store({})
        expect(() => store.removeSavedState('does not exists')).not.toThrow()
    })

    it('should revert to saved state', () => {
        const store = new Store({ count: 1 })
        store.saveState('one')
        store.updateState({ count: 2 })
        store.revertToSavedState('one')
        expect(store.getState().count).toBe(1)
    })

    it('should return state when reverted', () => {
        const store = new Store({ count: 1 })
        store.saveState('one')
        store.updateState({ count: 2 })
        expect(store.revertToSavedState('one')).toEqual({ count: 1 })
    })

    it('should throw error if incorrect name given on save', () => {
        const store = new Store({})
        expect(() => store.saveState()).toThrow()
        expect(() => store.saveState('')).toThrow()
        expect(() => store.saveState(null)).toThrow()
    })

    it('should throw error if incorrect name given on revert', () => {
        const store = new Store({})
        expect(() => store.revertToSavedState()).toThrow()
        expect(() => store.revertToSavedState('')).toThrow()
        expect(() => store.revertToSavedState(null)).toThrow()
        expect(() => store.revertToSavedState('Does not exist')).toThrow()
    })
})