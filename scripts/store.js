import { isObject, isFalsy, isTruthy } from "./utils.js"

export class Store extends EventTarget {
    static UPDATED = 'updated'

    savedStates = new Map()
    $domTarget = null

    constructor(state) {
        if (!isObject(state)) {
            throw new Error('A state object must be supplied when creating a state store.')
        }

        super()

        this.updateState(state)
    }

    addDom(targetCssSelector) {
        const $target = document.querySelector(targetCssSelector)
        if (isFalsy($target)) {
            throw new Error(`No element found matching the supplied CSS selector: ${targetCssSelector}`)
        }

        this.$domTarget = $target
        const state = this.getState()
        this.updateDom(state, Object.keys(state))
        this.onUpdate(({ detail: { state, updatedProperties } }) => {
            this.updateDom(state, updatedProperties)
        })

        return this.$domTarget
    }

    updateDom(state, updatedProperties) {
        if (isFalsy(this.$domTarget)) {
            throw new Error('No DOM target found. Ensure the [addDom] method is called before [updateDom].')
        }

        const { $domTarget } = this
        for (const property of updatedProperties) {
            const value = state[property]

            for (const $element of $domTarget.querySelectorAll(`[x-show="${property}"]`)) {
                if (isTruthy(value)) {
                    $element.style.display = ''
                } else {
                    $element.style.display = 'none'
                }
            }

            for (const $element of $domTarget.querySelectorAll(`[x-text="${property}"]`)) {
                $element.innerText = value
            }

            for (const $element of $domTarget.querySelectorAll(`[x-html="${property}"]`)) {
                $element.innerHTML = value
            }
        }
    }

    onUpdate(callback) {
        this.addEventListener(Store.UPDATED, callback)
    }

    updateState(newState) {
        if (!isObject(newState)) {
            throw new Error('An object must be supplied when updating state.')
        }

        this.state = Object.freeze(Object.assign({}, this.getState(), newState))

        const updatedState = this.getState()
        this.dispatchEvent(new CustomEvent(Store.UPDATED, {
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
        if (isFalsy(name) || typeof name !== 'string') {
            throw new Error('A string value must be supplied as a reference to this state.')
        }

        const state = this.getState()
        this.savedStates.set(name, state)

        return [name, state]
    }

    removeSavedState(name) {
        return this.savedStates.delete(name)
    }

    revertToSavedState(name) {
        if (!this.savedStates.has(name)) {
            throw new Error(`"${name}" does not match an existing state.`)
        }

        return this.updateState(this.savedStates.get(name))
    }
}