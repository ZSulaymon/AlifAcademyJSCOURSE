const amount = 1000;
const total = 0;
const maxSum = 5000;
const percent = 0.7;
const minComission = 0.35;
let commission = 0;
function calculateCommission(amount, total) {
  total = total + amount;
  if (total <= maxSum) {
    return commission;
  }
  if (total > maxSum) {
    total = total - maxSum;
    commission = total * (percent / 100);
    if (commission < minComission) {
      return minComission;
    }
  }
  return commission;

}

const result = calculateCommission(amount, total);
console.log(result);