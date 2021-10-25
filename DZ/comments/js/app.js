// 'use strict'
// ////берьём контейнер,тег,элемент. 
// const rootEl = document.getElementById('root')

// // CREATE FORM 
// const formEl = document.createElement('form');
// formEl.dataset.id = "comment-form"
// rootEl.appendChild(formEl);


// const descriptionEl = document.createElement('textarea');
// descriptionEl.dataset.input = 'comment';
// //descriptionEl.rows = 5;
// formEl.appendChild(descriptionEl);

// const addEl = document.createElement('button');
// addEl.dataset.action = 'add';
// addEl.textContent = 'Добавить';
// formEl.appendChild(addEl);
 

// let nextId = 1;

// formEl.onsubmit = evt => {
//     evt.preventDefault();
//  //Волидация 
// errorEl.textContent = '';
// let error = null;   
// let Id = nextId;

//  const description =descriptionEl.value.trim();
//  if (description ===''){
//      error = 'Заполните поле описание';
//     // errorEl.textContent = error;
//      descriptionEl.focus();
//      return;
//  };
 
//     const Wish = {
//         // name,
//         description,
//         Id,
//     };

//     const comments = [
//       {
//         id:nextId++,
//         description:'',
//       },
//     ];

// // CREATE LIST AND ADD TO HIM ROOTEL
// const listEl = document.createElement('ul');
// listEl.dataset.id = 'comment-list';
// rootEl.appendChild(listEl);

// const rowEl = document.createElement('li');
// rowEl.dataset.commentId = Wish.Id;
// rowEl.textContent = ` ${Wish.description}`;
// listEl.insertBefore(rowEl, listEl.firstElementChild);

     
//     comments.unshift(Wish);
//        console.log(comments);
//         formEl.reset();
// }



'use strict';

const rootEl = document.getElementById('root');

// create form
const formEl = document.createElement('form');
formEl.dataset.id = 'comment-form';
rootEl.appendChild(formEl);

// comment field
const descriptionEl = document.createElement('textarea');
descriptionEl.dataset.input = 'comment';
descriptionEl.rows = 3;
formEl.appendChild(descriptionEl);

// button
const buttonEl = document.createElement('button');
buttonEl.dataset.action = 'add';
buttonEl.textContent = 'Добавить';
formEl.appendChild(buttonEl);

// error block
const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

// comments list
const listEl = document.createElement('ul');
listEl.dataset.id = 'comment-list';
rootEl.appendChild(listEl);

let nextId = 1;
const comments = [];

// add comment
formEl.onsubmit = evt => {
  evt.preventDefault();

  errorEl.textContent = '';
  let error = null;

  const description = descriptionEl.value.trim();
  if (description === '') {
    error = 'Значение поля не может быть пустым';
    errorEl.textContent = error;
    descriptionEl.focus();
    return;
  }

  const comment = {
    id: nextId++,
    text: description,
  };

  comments.push(comment);
  formEl.reset();

  const rowEl = document.createElement('li');
  rowEl.dataset.commentId = comment.id;
  rowEl.textContent = comment.text;
  listEl.appendChild(rowEl);

  descriptionEl.focus();
};

