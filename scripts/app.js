import * as math from "./math.js"
import { Store } from "./store.js"

const store = new Store({
    teamName: '',
    daysOff: 0,
    teamMembers: 0,
    sprintLength: 0,
    averageVelocity: 0,
    disruptionAllowance: 0,
    predictedVelocity: null,
    predictedVelocityWithDisruption: null,
})

const $result = store.addDom('#result')
const [initialState, state] = store.saveState('initial')

store.onUpdate(({ detail: { state, updatedProperties } }) => {
    console.log(updatedProperties, state)
})

const storyPointForm = document.getElementById('story-point-form')
storyPointForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData(storyPointForm)
    const update = {}
    for(const [key, value] of formData) {
        if(key !== 'teamName') {
            update[key] = parseFloat(value)
        } else {
            update[key] = value
        }
    }
    const state = store.updateState(update)
    const predictedVelocity = getPredictedVelocity(state)
    const predictedVelocityWithDisruption = getPredictedVelocityWithDisruption(predictedVelocity, state)
    store.updateState({
        predictedVelocity,
        predictedVelocityWithDisruption
    })
})

function getPredictedVelocity(state) {
    const totalCapacity = state.sprintLength * state.teamMembers
    const percentageOfDaysOff = math.calculatePercentage(state.daysOff, totalCapacity)
    const absenceImpact = math.calculatePercentageValue(percentageOfDaysOff, state.averageVelocity)
    return Math.floor(state.averageVelocity - absenceImpact)
}

function getPredictedVelocityWithDisruption(predictedVelocity, state) {
    const disruptionValue = math.calculatePercentageValue(state.disruptionAllowance, predictedVelocity)
    return Math.floor(predictedVelocity - disruptionValue)
}
