import { isObject } from "./utils"

export class StateStore extends EventTarget {
    static UPDATED = 'updated'

    savedStates = new Map()

    constructor(state) {
        if (!isObject(state)) {
            throw new Error('A state object must be supplied when creating a state store.')
        }

        super()
        this.updateState(state)
    }

    onUpdate(callback) {
        this.addEventListener(StateStore.UPDATED, callback)
    }

    updateState(newState) {
        if (!isObject(newState)) {
            throw new Error('An object must be supplied when updating state.')
        }

        this.state = Object.freeze(Object.assign({}, this.getState(), newState))

        const updatedState = this.getState()
        this.dispatchEvent(new CustomEvent(StateStore.UPDATED, {
            detail: {
                state: updatedState,
                updatedProperties: Object.keys(newState),
            }
        }))

        return updatedState
    }

    getState() {
        return Object.assign({}, this.state)
    }

    saveState(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('A string value must be supplied as a reference to this state.')
        }

        this.savedStates.set(name, this.getState())
    }

    removeSavedState(name) {
        this.savedStates.delete(name)
    }

    revertToSavedState(name) {
        if (!this.savedStates.has(name)) {
            throw new Error(`"${name}" does not match an existing state.`)
        }

        this.updateState(this.savedStates.get(name))
    }
}