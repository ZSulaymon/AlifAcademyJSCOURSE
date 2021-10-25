'use strict';


    const rootEl = document.getElementById('root');    
    
    const formEl = document.createElement('form');
    formEl.dataset.id = 'comment-form';
    rootEl.appendChild(formEl);

    const descriptionEl = document.createElement('textarea');
    descriptionEl.dataset.input = 'comment';
    formEl.appendChild(descriptionEl);

    const addEl = document.createElement('button');
    addEl.textContent = 'Добавить';
    addEl.dataset.action = 'add';
    formEl.appendChild(addEl);

    const listEl = document.createElement('ul');
    listEl.dataset.id = 'comment-list';
    rootEl.appendChild(listEl);

    let nextId = 1;
    let id = nextId;

    const errorEl = document.createElement('div');
    formEl.insertBefore(errorEl, formEl.firstElementChild);

const comments = [];

formEl.onsubmit = evt =>{
    evt.preventDefault();
    console.log(evt);

    let error = null;
    const description = descriptionEl.value.trim();
    if(description === ''){
        error = 'Значение поля не может быть пустым';
        errorEl.textContent = error;
        descriptionEl.focus();
        return true;
    };

    const comment = {
        id: nextId++,
        text: description,
      };
    
    comments.push(comment);
    formEl.reset();

    const rowEL = document.createElement('li');
    rowEL.textContent = comment.text;
    rowEL.dataset.commentId = comment.id;
    listEl.insertBefore(rowEL,listEl.firstElementChild);
};



