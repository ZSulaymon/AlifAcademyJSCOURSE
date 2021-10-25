const exchangeRate = 0.147;
const commission = 0.01;

const amount = input / exchangeRate;
const payment = input * (1 + commission);

console.log(amount);
console.log(payment);