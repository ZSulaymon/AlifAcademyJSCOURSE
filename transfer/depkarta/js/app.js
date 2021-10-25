const input = 100000;

const percentMin = 14;
const percentMax = 17;
const maxMonthly = input * (percentMax/12/100);
const minMonthly = input * (percentMin/12/100);
const maxYearly = input * (percentMax /100);
const minYearly = input * (percentMin /100);
const maxMonthly12 = maxMonthly  * 0.12
const minMonthly12 = minMonthly  * 0.12
const maxYearly12 = maxYearly  * 0.12
const minYearly12 = minYearly  * 0.12


console.log(maxMonthly-maxMonthly12);
console.log(maxMonthly);
console.log(minMonthly-minMonthly12);
console.log(minMonthly);
console.log(maxYearly -maxYearly12);
console.log(maxYearly);
console.log(minYearly-minYearly12);
console.log(minYearly);