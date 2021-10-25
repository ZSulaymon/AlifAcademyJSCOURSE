'use strict';

const rootEl = document.getElementById('root')
rootEl.innerHTML = 
`<h1>Wishlist</h1>
<div data-id="loader">Загружаем данные...</div>
<form data-id="wish-form">
<fieldset data-id="wish-fieldset">
    <div data-id="message"></div>
    <div>
        <label for="name-input">Название</label>
        <input data-input="name" id="name-input">
    </div>
    <div>
        <label for="price-input">Цена</label>
        <input data-input="price" id="name-input">
    </div>
    <div>
        <label for="description-input">Описание</label>
        <textarea data-input="description" id="description-input" rows="5"></textarea>
    </div>
    <button>Добавить</button>
    </fieldset>
</form>
<div>Необходимо: <span data-id="total">0</span> с.</div>
<ul data-id="wish-list"></ul>
`;

const loaderEl = rootEl.querySelector('[data-id="loader"]');
const wishesEl = rootEl.querySelector('[data-id="wish-list"]');

// const apiUrl = 'http://127.0.0.1:9999/api/wishlist';
const apiUrl = 'http://127.0.0.1:9999/api/wishes';
// const apiUrl = 'http://127.0.0.1:9999/api/wishes/{id}';

// const apiUrl = 'http://127.0.0.1:9999/demo/api/wishes';

// setTimeout(()=>{
// const xhr = new XMLHttpRequest();
// xhr.open('GET', apiUrl, false); //asuns false
// xhr.send();
// console.log(xhr.response);
// },0);
//асинхронный форма
const state = {
    wishes: [],
};

function loadData(callbacks){
    // loaderEl.style.display = 'block'
    if (typeof callbacks.onStart === 'function'){
        callbacks.onStart();
    }

const xhr = new XMLHttpRequest();
xhr.open('GET', apiUrl);
xhr.onload = () => {
   if(xhr.status < 200 || xhr.status > 299) {
           //произошла ошибка
       const error = JSON.parse(xhr.responseText);
       if(typeof callbacks.onError === 'function'){
           callbacks.onError(error);
       }
    //    console.log(error);
       return;
   }
   const data = JSON.parse(xhr.responseText);
   if (typeof callbacks.onSuccess === 'function'){
       callbacks.onSuccess(data);
   }
    // console.log(data);
//    state.wishes = JSON.parse(xhr.responseText);
};
xhr.onerror = () => {
    //ответ не пришел
    // loaderEl.style.display = 'none'
    // console.log(evt);
    if (typeof callbacks.onError === 'function'){
        callbacks.onError({error: 'network error'});
    }
};
xhr.onloadend = () => {
    //запрос завершился, с ошибкой или без
    // loaderEl.style.display = 'none';
    // loaderEl.style.display = 'none';
    if (typeof callbacks.onFinish === 'function'){
        callbacks.onFinish();
    }
};

xhr.send();
}

loadData({
    onStart: () => loaderEl.style.display = 'block',
    onFinish: () => loaderEl.style.display = 'none',
    onSuccess: data => {
        state.wishes = data;
        renderWishes(wishesEl,state.wishes);
        //TODO: отрисовать данные
    },
     onError: error => console.log(error),
});

 //События 
function renderWishes (wishesEl, wishes){
    const sum = wishes.map(o =>o.price).reduce((prev, curr)=> prev + curr);
    wishesEl.innerHTML = wishes.map(o => `
        <li>
            <div>Название: ${o.name}, цена: ${o.price} c. <button data-itemid="${o.id}" data-action="remove">Удалить</button></div>
            <div data-block="description">${o.description}</div>
         </li>  
       <!-- поле итого --> 
           <div>Итого: ${sum}</div>
        `) .join('');
 }
 
// wishesEl.onclick = evt => {
//     console.log(evt);
// };
function removeDataById (id, callbacks){
    if (typeof callbacks.onStart === 'function'){
        callbacks.onStart();
    }

    const xhr = new XMLHttpRequest();
xhr.open('DELETE', `${apiUrl}${id}`);
xhr.onload = () => {
   if(xhr.status < 200 || xhr.status > 299) {
           //произошла ошибка
       const error = JSON.parse(xhr.responseText);
       if(typeof callbacks.onError === 'function'){
           callbacks.onError(error);
       }
    //    console.log(error);
       return;
   }
    if (typeof callbacks.onSuccess === 'function'){
       callbacks.onSuccess();
   }
    // console.log(data);
//    state.wishes = JSON.parse(xhr.responseText);
};
xhr.onerror = () => {
    //ответ не пришел
    // loaderEl.style.display = 'none'
    // console.log(evt);
    if (typeof callbacks.onError === 'function'){
        callbacks.onError({error: 'network error'});
    }
};
xhr.onloadend = () => {
    //запрос завершился, с ошибкой или без
    // loaderEl.style.display = 'none';
    // loaderEl.style.display = 'none';
    if (typeof callbacks.onFinish === 'function'){
        callbacks.onFinish();
    }
};
xhr.send();
}

wishesEl.addEventListener('click', evt => {
    if (evt.target.dataset.action !=='remove'){
        return;
    }
    const id = Number(evt.target.dataset.itemid);

    removeDataById (id,{
        onStart: () => loaderEl.style.display = 'block',
        onFinish: () => loaderEl.style.display = 'none',
        onSuccess: () => {
            state.wishes = state.wishes.filter(o => o.id !== id);
            renderWishes(wishesEl,state.wishes);
            //TODO: отрисовать данные
        },
         onError: error => console.log(error),
    })
    // console.log(evt);
}); //для фазы Bubbling

// wishesEl.addEventListener('click', evt => {
//     console.log(evt);
// }, true); //для фазы Capturing

loadData(loaderEl,state);

const formEl  =  rootEl.querySelector('[data-id="wish-form"]');
const fieldsetEl  =  formEl.querySelector('[data-id="wish-fieldset"]');
const nameEl  = formEl.querySelector('[data-input="name"]');
const priceEl = formEl.querySelector('[data-input="price"]');
const descriptionEl = formEl.querySelector('[data-input="description"]');

formEl.onsubmit = evt => {
    evt.preventDefault();

    const id = 0;
    const name = nameEl.value.trim();
    const price = Number(priceEl.value);
    const description = descriptionEl.value.trim();
    //TODO: Проверки из прошлой лекции /\\ валидация с помошью ИФОФ
    const wish = {
        id,
        name,
        price,
        description,
    };
    saveData(wish, {
        onStart: () => {
            loaderEl.style.display = 'block',
            fieldsetEl.disabled = true;
        },
        onFinish: () => {
            loaderEl.style.display = 'none',
            fieldsetEl.disabled = false;
        },
            onSuccess: data => {
            state.wishes = data;
            renderWishes(wishesEl,state.wishes);
            formEl.reset();
            //TODO: отрисовать данные
        },
         onError: error => console.log(error),
    });

}

 

function saveData (item, callbacks) {
    if (typeof callbacks.onStart === 'function'){
        callbacks.onStart();
    }

const xhr = new XMLHttpRequest();
xhr.open('POST', apiUrl);
xhr.onload = () => {
   if(xhr.status < 200 || xhr.status > 299) {
           //произошла ошибка
       const error = JSON.parse(xhr.responseText);
       if(typeof callbacks.onError === 'function'){
           callbacks.onError(error);
       }
    //    console.log(error);
       return;
   }
   const data = JSON.parse(xhr.responseText);
   if (typeof callbacks.onSuccess === 'function'){
       callbacks.onSuccess(data);
   }
    // console.log(data);
//    state.wishes = JSON.parse(xhr.responseText);
};
xhr.onerror = () => {
    //ответ не пришел
    // loaderEl.style.display = 'none'
    // console.log(evt);
    if (typeof callbacks.onError === 'function'){
        callbacks.onError({error: 'network error'});
    }
};
xhr.onloadend = () => {
    //запрос завершился, с ошибкой или без
    // loaderEl.style.display = 'none';
    // loaderEl.style.display = 'none';
    if (typeof callbacks.onFinish === 'function'){
        callbacks.onFinish();
    }
};
xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify(item));
}

 

