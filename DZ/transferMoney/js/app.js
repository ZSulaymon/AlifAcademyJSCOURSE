const percent = 0.2;
const minComission = 250;
const maxComission = 450;
function calculateCommission(amount, rate) {
    const commission = (amount * rate) * (percent / 100);

    if (commission < minComission) {
        return minComission;
    } if (commission > maxComission) {
        return maxComission;
    }
    return commission;
}

const amount = 15000;
const rate = 11.40;

const result = calculateCommission(amount, rate);
console.log(result);