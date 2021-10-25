'use strict';

let nextId = 1;
const tasks = [];
let error = '';

const rootEl = document.getElementById('root');

const formEl = document.createElement('form');
formEl.dataset.id = 'todo-form';
rootEl.appendChild(formEl);


const nameLabel = document.createElement('label');
nameLabel.setAttribute('for','todo-text');
nameLabel.textContent = 'Название ';
const nameInput = document.createElement('input');
nameInput.dataset.input = 'text';
nameInput.id = 'todo-text';
const firstDiv = document.createElement('div');
firstDiv.appendChild(nameLabel);
firstDiv.appendChild(nameInput);
formEl.appendChild(firstDiv);

const prLabel = document.createElement('label');
prLabel.setAttribute('for','todo-priority');
prLabel.textContent = 'Приоритет ';
const prInput = document.createElement('input');
prInput.dataset.input = 'priority';
prInput.id = 'todo-priority';
prInput.type = 'number';
const secDiv = document.createElement('div');
secDiv.appendChild(prLabel);
secDiv.appendChild(prInput);
formEl.appendChild(secDiv);

const btnEl = document.createElement('button');
btnEl.dataset.action = 'add';
btnEl.textContent = 'Добавить';
formEl.appendChild(btnEl);

const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';

formEl.appendChild(errorEl);

rootEl.appendChild(formEl);

const listEl = document.createElement('ul');
listEl.dataset.id = 'todo-list';
rootEl.appendChild(listEl);


formEl.onsubmit = evt => {
    evt.preventDefault();
    const taskText = nameInput.value.trim();
    const taskPrior = Number(prInput.value);
    if (!isValid(taskText, 'text')) { nameInput.focus(); return; }
    if (!isValid(taskPrior, 'number')) { prInput.focus(); return; }
    tasks.push({id: nextId, text: taskText, priority: taskPrior});
    addComment(taskText, taskPrior);
    nameInput.focus();
    formEl.reset();
};

function addComment(string, priority) {
    const item = document.createElement('li');
    item.setAttribute('data-todo-id', nextId);
    item.innerHTML = `${string} (приоритет: <span data-info="priority">${priority}</span>) `;
    item.innerHTML += `<button data-action="inc" onClick="shiftPr(${nextId}, true)">+</button>`;
    item.innerHTML += `<button data-action="dec" onClick="shiftPr(${nextId}, false)">-</button>`;
    const sortedList = tasks.slice().sort((cur, next) => cur.priority - next.priority);
    placeOnTheList(item, sortedList, nextId++);
}

function placeOnTheList(item, sortedArray, targetId) {
    const targetInd = sortedArray.findIndex(el => el.id === targetId);
    const nextEl = typeof(sortedArray[targetInd+1]) === 'undefined' ? null : listEl.querySelector(`[data-todo-id="${sortedArray[targetInd+1].id}"]`);
    listEl.insertBefore(item, nextEl);    
}

function shiftPr(id, op) {
    if (!id) {return;}
    const listBefore = tasks.slice().sort((cur, next) => cur.priority - next.priority);
    const indBefore = listBefore.findIndex(el => el.id === id);
    const pSpan = listEl.querySelector(`[data-todo-id="${id}"]`).querySelector('[data-info="priority"]');
    if (parseInt(pSpan.textContent) === 1 && !op) {return;}
    tasks.map(rec => {if (rec.id === id) { op ? rec.priority++ : rec.priority--; }});
    pSpan.textContent = op ? parseInt(pSpan.textContent)+1 : parseInt(pSpan.textContent)-1;
    const listAfter = tasks.slice().sort((cur, next) => cur.priority - next.priority);
    const indAfter = listAfter.findIndex(el => el.id === id);
    if (indBefore !== indAfter) { 
        const item = listEl.querySelector(`[data-todo-id="${id}"]`);
        listEl.removeChild(item);
        placeOnTheList(item, listAfter, id); 
    }
}

function isValid(value, type) {
    let flag = true;
    switch (type) {
        case 'text':
            error = 'Значение поля не может быть пустым';
            if (value.trim() === '') { flag = false; } 
            break;
        case 'number':
            error = 'Цена должна быть числом больше нуля!';
            if (Number.isNaN(value) || value <= 0) { flag = false; }
            break;
    }
    errorEl.textContent = flag ? '' : error;
    return flag;
}

shiftPr();