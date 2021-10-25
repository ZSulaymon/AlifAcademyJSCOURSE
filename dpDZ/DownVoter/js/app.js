'use strict';

// create root element
const rootEl = document.getElementById('root');

// create form element
const formEl = document.createElement('form');
formEl.dataset.id = 'comment-form';
rootEl.appendChild(formEl);

// create input element for product name
const commentEl = document.createElement('textarea');
commentEl.dataset.input = 'text';
commentEl.id = '';
commentEl.name = '';
commentEl.rows = 10;
commentEl.cols = 30;
formEl.appendChild(commentEl);

// create button element to submit the form
const addEl = document.createElement('button');
addEl.textContent = 'Добавить';
addEl.dataset.action = 'add';
formEl.appendChild(addEl);

// create div element to display the error
const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
formEl.insertBefore(errorEl, formEl.firstElementChild);

// create list element
const listEl = document.createElement('ul');
listEl.dataset.id = 'comment-list';
rootEl.appendChild(listEl);

// to store all purchases
let comments = [];
let nextId = 1;
const min = -10;

formEl.onsubmit = evt => {
    evt.preventDefault();
    
    const commentText = commentEl.value.trim();
    // check if text is empty
    if (commentText === '') {
        errorEl.textContent = 'Значение поля не может быть пустым';
        commentEl.focus();
        return;
    }

    // create a comment object
    const comment = {
        id: nextId++,
        text: commentText,
        likes: 0,
    };

    // push comment object to purchases array
    comments.push(comment);

    // create row element for a list
    const rowEl = document.createElement('li');
    rowEl.dataset.commentId = `${comment.id}`;
    listEl.appendChild(rowEl);

    //create span and buttons inside row
    const spanTextEl = document.createElement('span');
    spanTextEl.dataset.info = 'text';
    spanTextEl.textContent = comment.text;
    rowEl.appendChild(spanTextEl);

    const spanLikesEl = document.createElement('span');
    spanLikesEl.dataset.info = 'likes';
    spanLikesEl.textContent = comment.likes;
    rowEl.appendChild(spanLikesEl);

    // like button
    const likeBtn = document.createElement('button');
    likeBtn.textContent = '+';
    likeBtn.dataset.action = 'like';
    likeBtn.onclick = () => {
        comment.likes++;
        spanLikesEl.textContent = comment.likes;
    };
    rowEl.appendChild(likeBtn);

    // dislike button
    const dislikeBtn = document.createElement('button');
    dislikeBtn.textContent = '-';
    dislikeBtn.dataset.action = 'dislike';
    dislikeBtn.onclick = () => {
        comment.likes--;
        if (comment.likes === min) {
            comments = comments.filter(c => c !== comment);
            rowEl.remove();
            return;
        }
        spanLikesEl.textContent = comment.likes;
    };
    rowEl.appendChild(dislikeBtn);

    

    // erase the errorEl
    errorEl.textContent = '';

    formEl.reset();
    commentEl.focus();
};