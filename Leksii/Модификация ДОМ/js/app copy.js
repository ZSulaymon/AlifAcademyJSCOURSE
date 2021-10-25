'use strict'
////берьём контейнер,тег,элемент. 
const rootEl = document.getElementById('root')
//document.body.appendChild(headingEl);

 ////Создадим Элемент
// const headingEl = document.createElement('h1');
////заполняем элемент
// headingEl.textContent = 'WishList';
////вставляем элемент в нужную местечку.
// rootEl.appendChild(headingEl);
//  VS
rootEl.innerHTML= '<h1>WishList</h1>';


// CREATE FORM 
const formEl = document.createElement('form');
rootEl.appendChild(formEl);

//Div CREATE NAME (Название)
const nameContainerEl = document.createElement('div');
formEl.appendChild(nameContainerEl);

            //createlabel
const nameLabelEl = document.createElement('label');
nameLabelEl.textContent = 'Назвние: ';
nameLabelEl.htmlFor = 'name-input'; //////////////////устнанавливает фокус
nameContainerEl.appendChild(nameLabelEl);

            //create input
const nameEl = document.createElement('input');
nameEl.id = 'name-input';  //////////////////устнанавливает фокус
nameContainerEl.appendChild(nameEl);

//CREATE PRICE (Цена)
const priceContainerEl = document.createElement('div');
formEl.appendChild(priceContainerEl);
            //create label
const priceLabelEl = document.createElement('label');
priceLabelEl.textContent = 'Цена: ';
priceLabelEl.htmlFor = 'price-input'; ///устнанавливает фокус
priceContainerEl.appendChild(priceLabelEl);


            //create input
const priceEl = document.createElement('input');
priceEl.id = 'price-input';  //устнанавливает фокус
priceEl.type = 'Number';
priceContainerEl.appendChild(priceEl);

// CREATE DESCRIPTION TEXTAREA ()
const descriptionContainerEl = document.createElement('div');
formEl.appendChild(descriptionContainerEl);
            //create label
const descriptionLabelEl = document.createElement('label');
descriptionLabelEl.textContent = 'Описание: ';
descriptionLabelEl.htmlFor = 'description-input';
descriptionContainerEl.appendChild(descriptionLabelEl);

            //create imput 
const descriptionEl = document.createElement('textarea');
descriptionEl.id = 'description-imput';
descriptionEl.rows = 5;
descriptionContainerEl.appendChild(descriptionEl);

const addEl = document.createElement('button');
addEl.textContent = 'Добавить';
formEl.appendChild(addEl);

//CREATE FROM WIRH INNERHTML




















// //getElementById
// const id = document.querySelector('#root')
// //getElementByClassName
// const clas = document.querySelector('.root')
//alert(clas)

