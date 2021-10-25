// const input = 10000;
//     const maxPercent = 0.06;
//     const maxAmount = input * maxPercent;

// function calculateMaxDeposit() {
  
//     console.log(maxAmount);

// }
function calculateMaxDeposit(input) {
  //  const input = 10000;
    const maxPercent = 0.06;
    const maxAmount = input * maxPercent;
    return maxAmount;
    // console.log(maxAmount);
}

const result = calculateMaxDeposit(1000);
console.log(result);
// calculateMaxDeposit();
// calculateMaxDeposit(20);
// calculateMaxDeposit(589);

function calculateCommission(input) {
    const percent = 0.01;
    const commission = input * percent;
    return commission;
}

// const result1 = calculateCommission(35);
// console.log(result1)

//мин комис 0,35

// function calculateCommission(input) {
//     const percent = 0.01;
//     const minCommission = 0.35;
//     const commission = input * percent;
//     if (commission < minCommission)
//        // commission = minCommission;
//         return minCommission;
//     
//     //const commission = input * percent;
//     return commission;
// }

// const result1 = calculateCommission(24);
// console.log(result1)


//мин комис 0,35

function calculateCommission(input) {
    const percent = 0.01;
    const minCommission = 0.35;

    const commission = input * percent;
    if (commission < minCommission){
       // commission = minCommission;
        return minCommission;
    }
    //const commission = input * percent;
    return commission;
}

const result1 = calculateCommission(24);
console.log(result1)