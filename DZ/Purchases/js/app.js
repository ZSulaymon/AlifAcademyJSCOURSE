'use strict';
////берьём контейнер,тег,элемент. 
const rootEl = document.getElementById('root');
//document.body.appendChild(headingEl);

// CREATE FORM 
const formEl = document.createElement('form');
formEl.dataset.id = 'purchase-form';
rootEl.appendChild(formEl);

            //create input
const nameEl = document.createElement('input');
nameEl.dataset.input = 'name';
formEl.appendChild(nameEl);

            //create input
const priceEl = document.createElement('input');
priceEl.dataset.input = 'price';   
priceEl.type = 'Number';
formEl.appendChild(priceEl);

const addEl = document.createElement('button');
addEl.dataset.action = 'add';
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);


// CREATE LIST AND ADD TO HIM ROOTEL
const listEl = document.createElement('ul');
listEl.dataset.id = 'purchases-list';
rootEl.appendChild(listEl);

const totalEl = document.createElement('div');
totalEl.textContent = 'Самая дорогая покупка:';
rootEl.appendChild(totalEl);

let sum = 'нет покупок';

const totalCach = document.createElement('span');
totalCach.dataset.id= 'most-expensive';
totalCach.textContent = 'нет покупок';
totalEl.appendChild(totalCach);


//CREATE VOLIDATION VARIABLE // error block

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

 
//let cash = [];
let nextId = 1;
const percent = 0.5;
const purchases = [];
const cash = 0;
formEl.onsubmit = evt => {
    evt.preventDefault();
 //Волидация 
errorEl.textContent = '';
let error = null;   
 
    const name = nameEl.value.trim();
    if (name === ''){
        error = 'Заполните поле Название';
        //console.log(error);
        errorEl.textContent = error;
        nameEl.focus();
        return;
    }
  
 const price = Number(priceEl.value);
 if (Number.isNaN(price)){
 error = 'Укажите цену';
     errorEl.textContent = error;
     priceEl.focus();
     return;
 }

 if (price < 0){
    error = 'Цена не может быть отрицательной';
    errorEl.textContent = error;
    priceEl.focus();
    return;
 }
 
    const purchase = {
        name,
        price,
        id: nextId++,
        cash,
    };

    //console.log(sum)

purchases.unshift(purchase);
purchase.cash = Math.floor(price * percent) / 100;
const rowEl = document.createElement('li');
rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. (кэшбек - ${purchase.cash } с.)`;
rowEl.dataset.purchaseId = purchase.id;
listEl.insertBefore(rowEl, listEl.firstElementChild);
//console.log(cash)

// function getMax(sums){
//     let max;
//     let min = sums[0];
//     for(let i = 0; i < sum.length; i++){
//         if((sum[i]) < min){
//             min = sum[i]; 
//         } else {
//             max = sum[i];
//         }
//     }
//     return max;
// }  

// console.log(getMax(sum));



sum = (purchases.map(o =>o.price).reduce((prev, curr)=> prev + curr));

// function maxElement (sum){
//     return sum.reduce((a,b) => b > a ? a : b );  
//   }

//   maxElement(purchases);

// var numbersPositive = purchases.filter(function findPositive(price){return price >= 0});
// var maxValue = Math.max.apply(Math,numbersPositive); // Максимальное число 
const maxsumm =  price;

let max = (maxsumm , max = maxsumm[0]) => {
    for (let i = 0; i < maxsumm.length; i++){
        if(max < maxsumm[i]) max = maxsumm[i];
    }
    return max;
};

//const arry = [1,2,3,4,0,-3];
 
  console.log(max(maxsumm));

 
totalCach.textContent = maxsumm;
// totalCach.textContent = `${purchase.name} на сумму ${purchase.price} с.`;
 

// const maxsumm = purchases.reduce((acc, value)=> Math.max(acc, value), purchases);
// totalCach.textContent = maxsumm;
//  console.log(maxsumm)
// console.log(sum+sum)

const removeEl = document.createElement('button');
removeEl.dataset.action = 'remove';
removeEl.textContent = 'Удалить';
removeEl.onclick = () => {
    listEl.removeChild(rowEl);
    const index  = purchases.indexOf(purchase);
    purchases.splice(index, 1 );

    const sum = purchases.reduce((prev, curr)=> prev + curr.price,0);    

    // purchases = purchases.filter(o => o !== purchase);
    if (sum <= 0 ){
        totalCach.textContent = 'нет покупок'
    }
    else 
    {
        totalCach.textContent = `${sum}`;
    }
    

     // totalEl.textContent = `Необходимо ${sum} c.`;

    // sum = (purchases.map(o =>o.price).reduce((prev, curr)=> prev + curr));
    // totalCach.textContent = `${sum}`;
 
};


// sum = (purchases.map(o =>o.cash).reduce((prev, curr)=> prev + curr));
 
// totalCach.textContent = `${sum} с.`;
 
rowEl.appendChild(removeEl);

 
        formEl.reset();
        nameEl.focus();

 
};

 
