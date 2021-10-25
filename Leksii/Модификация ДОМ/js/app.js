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
/*
const rootEl = document.getElementById('root')
rootEl.innerHTML = `
<h1>WishList</h1> 
<from>
    <div>
        <label for="name-input">Название:</label>
        <input id="name-input"></input>
    </div>
    <div>
         <label for="price-input">Цена:</label>
         <input id="price-input" type="number"></input>
    </div>
    <div>
        <label for="description-input">Описание:</label>
        <textarea id="description-input" rows="5"></textarea> 
    </div>
    <div>
         <button>Добаваить</button>
    </div>

    </form>
 `
*/


//CREATE TOTAL SUM
const totalEl = document.createElement('div');
rootEl.appendChild(totalEl);

//CREATE VOLIDATION VARIABLE
const errorEl = document.createElement('div');
formEl.insertBefore(errorEl, formEl.firstElementChild);

const wishes = [];
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
    //    const price = +priceEl.value; //CONVERT TO INT (NUMBER) WITH + ХАКЕРСИКИЙ КОНВЕРТ
 //   const price = parseInt(priceEl.value); //CONVERT TO INT (NUMBER) WITH parseInt and for float number parseFloat
 const price = Number(priceEl.value);  // COnvert to int (number) with function NUMBER
 if(Number.isNaN(price)){
 //if (price === ''){  
 error = 'Неверно введена цена';
     errorEl.textContent = error;
     priceEl.focus();
     return;
 };

 if(price < 0){
    error = 'Цена не может быть отрицательной';
    errorEl.textContent = error;
    priceEl.focus();
    return;
 };

 const description =descriptionEl.value;
 if (description ===''){
     error = 'Заполните поле описание';
     errorEl.textContent = error;
     descriptionEl.focus();
     return;
 };
 
    const Wish = {
        name,
        price,
        description,
    };

// CREATE LIST AND ADD TO HIM ROOTEL
const listEl = document.createElement('ul');
rootEl.appendChild(listEl);

const rowEl = document.createElement('li');
rowEl.textContent = `Название: ${Wish.name}, стоимость: ${Wish.price} с.`;
listEl.insertBefore(rowEl, listEl.firstElementChild);
//listEl.appendChild(rowEl);

//CREATE BUTTON FOR DELETING DATA FROM DOM
// const removeEl = document.createElement('button');
// removeEl.textContent = 'Удалить';
// removeEl.onclick = () => {
//   //  listEl.removeChild(rowEl);
//     listEl.remove();
// };
// rowEl.appendChild(removeEl);

//CREATE BUTTON FOR DELETING DATA FROM ARRAY WITH SPLICE AND FILTER
//          SPLICE
// const removeEl = document.createElement('button');
// removeEl.textContent = 'Удалить';
// removeEl.onclick = () => {
//     listEl.removeChild(rowEl);
//     const index = wishes.indexOf(Wish);
//     wishes.splice(index, 1);
// };
// rowEl.appendChild(removeEl);
 
//     wishes.unshift(Wish);
//     console.log(Wish);
//     formEl.reset();
//              FILTER
    const removeEl = document.createElement('button');
    removeEl.textContent = 'Удалить';
    removeEl.onclick = () => {
        listEl.removeChild(rowEl);
       wishes = wishes.filter(o => o !== Wish);

       
    };
     


//CREATE FUNCTION WISH , THAT CREATE OBJECT    
// function createWish(name,price,description) {
//     const object = {};
//     object.name = name;
//     object.price = price;
//     object.description = description;
//     return object;
// }

//короче , если ставить перед функции ключевое слова this. то пустой обьект и return за нас создадутсф автоматтом
// function Wish(name,price,description) {
// // const object = {};
//     this.object.name = name;
//     this.object.price = price;
//     this.object.description = description;
// //  return object;
// }

//const wish = new Wish('Core i7', 2400, 'Мощный процессор');

 //первый вариант map + reduce
    // totalEl.textContent = `Необходимо ${sum} c.`;
    //второй вариант reduce
    const sum = wishes.reduce((prev, curr)=> prev + curr.price,0);    
    totalEl.textContent = `Необходимо ${sum} c.`;


    // rowEl.appendChild(removeEl);
     
    
    //     wishes.unshift(Wish);
    //     console.log(Wish);
    //     formEl.reset();
}
// console.log(wishes);




















// //getElementById
// const id = document.querySelector('#root')
// //getElementByClassName
// const clas = document.querySelector('.root')
//alert(clas)

