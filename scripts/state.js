import { isObject } from "./utils"

export class StateStore extends EventTarget {
    static UPDATED = 'updated'

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

        this._state = Object.freeze(Object.assign({}, this.getState(), newState))

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
        return Object.assign({}, this._state)
    }
}