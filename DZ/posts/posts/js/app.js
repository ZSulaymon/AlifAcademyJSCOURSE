'use strict';

const rootEl = document.getElementById('root');

// loader
const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Идёт загрузка';
rootEl.appendChild(loaderEl);

// form
const formEl = document.createElement('form');
formEl.dataset.id = 'post-form';
rootEl.appendChild(formEl);

// fieldset
const fieldsetEl = document.createElement('fieldset');
fieldsetEl.dataset.id = 'post-fields';
formEl.appendChild(fieldsetEl);

// author field
const authorEl = document.createElement('input');
authorEl.dataset.input = 'author';
fieldsetEl.appendChild(authorEl);

// text field
const textEl = document.createElement('input');
textEl.dataset.input = 'text';
fieldsetEl.appendChild(textEl);

// button
const buttonEl = document.createElement('button');
buttonEl.dataset.action = 'add';
buttonEl.textContent = 'Добавить';
fieldsetEl.appendChild(buttonEl);

// error block
const errorEl = document.createElement('div');
errorEl.dataset.id = 'message';
fieldsetEl.insertBefore(errorEl, fieldsetEl.firstElementChild);

// posts list
const postsEl = document.createElement('div');
postsEl.dataset.id = 'posts';
rootEl.appendChild(postsEl);

let nextId = 1;
let posts = [];
const apiUrl = 'http://127.0.0.1:9999/api/hw32/posts';

// load data
ajax('GET', apiUrl, {}, {
    onStart: () => {
      loaderEl.style.display = 'block';
      fieldsetEl.disabled = true;
    },
    onFinish: () => {
      loaderEl.style.display = 'none';
      fieldsetEl.disabled = false;
      authorEl.focus();

    },
    onError: error => console.error(error),
    onSuccess: data => {
      posts = data;
      console.log(posts);
      renderPosts(postsEl, posts);
    },
  }
);

// remove data
postsEl.addEventListener('click', evt => {
  if (evt.target.dataset.postAction !== 'remove') {
    return;
  }
  const parentNodeEl = evt.target.parentNode;
  const id = Number(parentNodeEl.dataset.postId);
  parentNodeEl.remove();
  ajax('DELETE', `${apiUrl}/${id}`, {}, {
      onStart: () => {
        loaderEl.style.display = 'block';
        fieldsetEl.disabled = true;
      },
      onFinish: () => {
        loaderEl.style.display = 'none';
        fieldsetEl.disabled = false;
        authorEl.focus();
      },
      onError: error => console.error(error),
      onSuccess: () => {
        posts = posts.filter(o => o.id !== id);
        console.log(posts);
        renderPosts(postsEl, posts);
      },
    }
  );
});

// save data
formEl.onsubmit = evt => {
  evt.preventDefault();

  errorEl.textContent = '';
  let error = null;

  const id = nextId++;
  const author = authorEl.value.trim();
  if (author === '') {
    error = 'Значение поля автора не может быть пустым';
    errorEl.textContent = error;
    authorEl.focus();
    return;
  }

  const text = textEl.value.trim();
  if (text === '') {
    error = 'Значение поля текста не может быть пустым';
    errorEl.textContent = error;
    textEl.focus();
    return;
  }

  const post = {
    id,
    author,
    text,
  };

  ajax('POST', apiUrl, {'Content-Type': 'application/json'}, {
      onStart: () => {
        loaderEl.style.display = 'block';
        fieldsetEl.disabled = true;
      },
      onFinish: () => {
        loaderEl.style.display = 'none';
        fieldsetEl.disabled = false;
        authorEl.focus();
      },
      onError: err => console.error(err),
      onSuccess: data => {
        posts.unshift(data);
        console.log(posts);
        renderPosts(postsEl, posts);
        formEl.reset();
      },
    },
    JSON.stringify(post)
  );
};

// render
function renderPosts(el, items) {
  el.innerHTML = items.map(o => `
    <div data-type="post" data-post-id="${o.id}">
      <div data-post-part="author">${o.author}</div>
      <div data-post-part="text">${o.text}</div>
      <div data-post-action="remove">Удалить</div>
    </div>
  `).join('');
}

function ajax(method, url, headers, callbacks, body) {
  const xhr = new XMLHttpRequest();
  xhr.open(method, url);

  function isEmpty(obj) {
    for (const key in obj) {
      return true;
    }
    return false;
  }

  if (isEmpty(headers)) {
    for (const [key, value] of Object.entries(headers)) {
      xhr.setRequestHeader(key, value);
    }
  }

  xhr.onloadstart = () => {
    if (typeof callbacks.onStart === 'function') {
      callbacks.onStart();
    }
  };

  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status > 299) {
      if (typeof callbacks.onError === 'function') {
        const error = xhr.statusText;
        callbacks.onError(error);
        return;
      }
    }
    if (typeof callbacks.onSuccess === 'function') {
      if (xhr.responseText) {
        const data = JSON.parse(xhr.responseText);
        callbacks.onSuccess(data);
      } else {
        callbacks.onSuccess();
      }
    }
  };

  xhr.onerror = () => {
    if (typeof callbacks.onError === 'function') {
      callbacks.onError('Network Error');
    }
  };

  xhr.onloadend = () => {
    if (typeof callbacks.onFinish === 'function') {
      callbacks.onFinish();
    }
  };
  xhr.send(body);
}