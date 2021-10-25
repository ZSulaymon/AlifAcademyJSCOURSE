'use strict'

//CREATE FROM WIRH INNERHTML

////берьём контейнер,тег,элемент. 
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

 



















// //getElementById
// const id = document.querySelector('#root')
// //getElementByClassName
// const clas = document.querySelector('.root')
//alert(clas)

