const input = 1000;

const percentMin = 4;
const percentMax = 6;
const maxMonthly = input * (percentMax/12/100);
const minMonthly = input * (percentMin/12/100);
const maxYearly = input * (percentMax /100);
const minYearly = input * (percentMin /100);

console.log(maxMonthly);
console.log(minMonthly);
console.log(maxYearly);
console.log(minYearly);