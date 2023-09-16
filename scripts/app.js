import * as math from "./math.js"
import { StateStore } from "./state.js"
import { isTruthy } from "./utils.js"

const store = new StateStore({
    daysInSprint: 10,
    previousSprintVelocities: [24, 22, 26],
    predictedDisruptionPercentage: 10,
    team: [
        { daysOff: 0 },
        { daysOff: 0 },
        { daysOff: 3 },
        { daysOff: 0 },
    ],
    name: ''
})

store.onUpdate(({ detail: { state, updatedProperties } }) => {
    for (const property of updatedProperties) {
        for (const $element of document.querySelectorAll(`[x-show="${property}"]`)) {
            if (isTruthy(state[property])) {
                $element.style.display = ''
            } else {
                $element.style.display = 'none'
            }
        }

        for (const $element of document.querySelectorAll(`[data-${property}]`)) {
            const target = $element.dataset[property]
            $element[target] = state[property]
        }
    }
    console.log(updatedProperties, state)
})

const [initialState, state] = store.saveState('initial')


const totalDaysOff = state.team.reduce((accumulator, { daysOff }) => accumulator + daysOff, 0)
const totalCapacity = state.daysInSprint * state.team.length
const percentageOfDaysOff = math.calculatePercentage(totalDaysOff, totalCapacity)
const averageSprintVelocity = math.calculateAverage(state.previousSprintVelocities)
const absenceImpact = math.calculatePercentageValue(percentageOfDaysOff, averageSprintVelocity)
const predictedVelocity = Math.floor(averageSprintVelocity - absenceImpact)
const predictedDisruptionPercentage = 10
const disruptionValue = math.calculatePercentageValue(predictedDisruptionPercentage, predictedVelocity)
const velocityAllowingDisruption = Math.floor(predictedVelocity - disruptionValue)

const $greetingForm = document.getElementById('greeting-form')
$greetingForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const formData = new FormData($greetingForm)
    mergeFormDataToStore(formData, store)
})
// $greetingForm.addEventListener('input', (e) => {
//     const formData = new FormData($greetingForm)
//     mergeFormDataToStore(formData, store)
// })

function mergeFormDataToStore(formData, store) {
    const update = {}
    for (const [key, value] of formData) {
        update[key] = value
    }
    store.updateState(update)
}

console.log(predictedVelocity, velocityAllowingDisruption)
