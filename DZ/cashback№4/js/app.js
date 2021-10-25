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
totalEl.textContent = 'Итоговый кэшбек:';
rootEl.appendChild(totalEl);

let sum = 0;

const totalCach = document.createElement('span');
totalCach.dataset.id= 'total-cashback';
totalCach.textContent = `${0} с.`;
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
  
 const price = Number(priceEl.value.trim());
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
        name:name,
        price:price,
        id: nextId++,
        cash:cash,
    };

    purchases.unshift(purchase);


purchase.cash = Math.floor(price * percent) / 100;


 
 const rowEl = document.createElement('li');

 


rowEl.textContent = `${purchase.name} на сумму ${purchase.price} с. (кэшбек - ${purchase.cash } с.)`;
rowEl.dataset.purchaseId = purchase.id;
listEl.insertBefore(rowEl, listEl.firstElementChild);

 sum = (purchases.map(o =>o.cash).reduce((prev, curr)=> prev + curr));

 
totalCach.textContent = `${sum} с.`;
 


              formEl.reset();
        nameEl.focus();

 
};

