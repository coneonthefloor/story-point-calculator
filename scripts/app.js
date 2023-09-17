import * as math from "./math.js"
import { Store } from "./store.js"
import { formDataToObject } from "./utils.js"

const store = new Store({
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

const $greetingCard = store.addDom('#greeting-card')
const [initialState, state] = store.saveState('initial')

store.onUpdate(({ detail: { state, updatedProperties } }) => {
    console.log(updatedProperties, state)
})

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
    store.updateState(formDataToObject(formData))
})
// $greetingForm.addEventListener('input', (e) => {
//     const formData = new FormData($greetingForm)
//     mergeFormDataToStore(formData, store)
// })


console.log(predictedVelocity, velocityAllowingDisruption)
