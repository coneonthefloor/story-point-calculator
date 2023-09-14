import * as math from "/scripts/math.js";

const daysInSprint = 10;
const team = [
    { daysOff: 0 },
    { daysOff: 0 },
    { daysOff: 3 },
    { daysOff: 0 },
];

const totalDaysOff = team.reduce((accumulator, { daysOff }) => accumulator + daysOff, 0);
const totalCapacity = daysInSprint * team.length;
const percentageOfDaysOff = math.calculatePercentage(totalDaysOff, totalCapacity);

const previousSprintVelocities = [24, 22, 26];

const averageSprintVelocity = math.calculateAverage(previousSprintVelocities);
const absenceImpact = math.calculatePercentageValue(percentageOfDaysOff, averageSprintVelocity);
const predictedVelocity = Math.floor(averageSprintVelocity - absenceImpact);
const predictedDisruptionPercentage = 10;
const disruptionValue = math.calculatePercentageValue(predictedDisruptionPercentage, predictedVelocity);
const velocityAllowingDisruption = Math.floor(predictedVelocity - disruptionValue);

console.log(predictedVelocity, velocityAllowingDisruption);