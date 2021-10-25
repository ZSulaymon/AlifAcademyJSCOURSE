'use strict';

const rootEl = document.getElementById('root');

const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Идет загрузка';
rootEl.appendChild(loaderEl);

const formEl = document.createElement('form');
formEl.dataset.id = 'post-form';
rootEl.appendChild(formEl);

const messageEl = document.createElement('div');
messageEl.dataset.id = 'message';
formEl.appendChild(messageEl);

const fieldsetEl = document.createElement('fieldset');
fieldsetEl.dataset.id = 'post-fields';
formEl.appendChild(fieldsetEl);

const authorEl = document.createElement('input');
authorEl.dataset.input = 'author';
fieldsetEl.appendChild(authorEl);

const textEl = document.createElement('input');
textEl.dataset.input = 'text';
fieldsetEl.appendChild(textEl);

const actionLoaderEl = document.createElement('span');
actionLoaderEl.dataset.id = 'action-loader';
actionLoaderEl.innerHTML = '<img src="./img/loader.gif">';

const addEl = document.createElement('button');
addEl.dataset.action = 'add';
addEl.textContent = 'Добавить';
fieldsetEl.appendChild(addEl);

const postsEl = document.createElement('div');
postsEl.dataset.id = 'posts';
rootEl.appendChild(postsEl);

const apiUrl = 'http://127.0.0.1:9999/api/hw35/posts';

let posts = [];
const two = 2;
const three = 3;

function renderWishes(postsElem, postArr) {
  postsElem.innerHTML = postArr.map(o => {
    const comments = o.comments;
    const commentElem = comments.map(arr =>`<div data-comment-id="${arr.id}">${arr.text}</div>`).join('');
    o = `
    <div data-type="post" data-post-id="${o.id}">
      <div data-post-part="author">${o.author}</div>
      <div data-post-part="text">${o.text}</div>
      <div>
        🖤<span data-info="likes">${o.likes}</span>
        <button data-action="like">+1</button>
        <button data-action="dislike">-1</button>
        <button data-action="edit">Изменить</button>
        <button data-action="remove">Удалить</button>
      </div>
      <form data-form="comment">
        <input data-id="text">
        <button>Добавить</button>
      </form>
      <div data-post-part="comments">
      ${commentElem}
      </div>
    </div>
  `;
  return o;
  }).join('');
}

ajax('GET', apiUrl, {}, {
  onStart: () => loaderEl.style.display = 'block',
  onFinish: () => loaderEl.style.display = 'none',
  onSuccess: data => {
    posts = JSON.parse(data);
    renderWishes(postsEl, posts);
  },
  onError: error => console.log(error),
});

postsEl.addEventListener('click', evt => {
  const id = Number(evt.target.parentNode.parentNode.dataset.postId);

  const isAction = evt.target.dataset.action;
  const formElem = evt.target.parentNode;

  if (isAction === 'remove') {
    ajax('DELETE', `${apiUrl}/${id}`, {}, {
      onStart: () => loaderEl.style.display = 'block',
      onFinish: () => loaderEl.style.display = 'none',
      onSuccess: () => {
        posts = posts.filter(o => o.id !== id);
        renderWishes(postsEl, posts);
      },
      onError: error => console.log(error),
    },);
    return;
  }

  if (isAction === 'like') {
    ajax('POST', `${apiUrl}/${id}/likes`, {}, {
      onStart: () => {
        const loader = document.querySelector(`[data-post-id="${id}"]`);
        const div = loader.children[two];
        div.innerHTML = `
          <span data-id="action-loader"><img src="./img/loader.gif"></span>
        `;
      },
      onFinish: () => {},
      onSuccess: () => {
        posts.map(o => o.id === id ? o.likes++ : o.likes);
        renderWishes(postsEl, posts);
      },
      onError: error => console.log(error),
    },);
    return;
  }

  if (isAction === 'dislike') {
    ajax('DELETE', `${apiUrl}/${id}/likes`, {}, {
      onStart: () => {
        const loader = document.querySelector(`[data-post-id="${id}"]`);
        const div = loader.children[two];
        div.innerHTML = `
          <span data-id="action-loader"><img src="./img/loader.gif"></span>
        `;
      },
      onFinish: () => {},
      onSuccess: data => {
        console.log(data);
        posts.map(o => o.id === id ? o.likes-- : o.likes);
        renderWishes(postsEl, posts);
      },
      onError: error => console.log(error),
    },);
    return;
  }

  if (isAction === 'edit') {
    editPost(formElem, id);
  }

  addComments(formElem, id);
  
});


formEl.onsubmit = evt => {
  evt.preventDefault();

  messageEl.textContent = '';
  let message = null;

  const id = 0;
  const likes = 0;

  const author = authorEl.value.trim();
  if (author === '') {
    message = 'Значение поля не может быть пустым';
    messageEl.textContent = message;
    authorEl.focus();
    return;
  }

  const text = textEl.value.trim();
  if (text === '') {
    message = 'Значение поля не может быть пустым';
    messageEl.textContent = message;
    textEl.focus();
    return;
  }

  const post = {
    id,
    author,
    text,
    likes,
    comments: [],
  };

  ajax('POST', apiUrl, {}, {
    onStart: () => {
      loaderEl.style.display = 'block';
      fieldsetEl.disabled = true;
    },
    onFinish: () => {
      loaderEl.style.display = 'none';
      fieldsetEl.disabled = false;
      authorEl.focus();
    },
    onSuccess: data => {
      posts.unshift(JSON.parse(data));
      renderWishes(postsEl, posts);
      formEl.reset();
    },
    onError: error => console.log(error),
  }, post);

};

function editPost(formelem, id) {
  const editBtn = document.querySelector('[data-action="edit"]');
  editBtn.disabled = true;
  const authorValue = formelem.parentNode.children[0];
  const textValue = formelem.parentNode.children[1];
  authorEl.value = authorValue.textContent;
  textEl.value = textValue.textContent;

  fieldsetEl.removeChild(addEl);
  const idHidden = document.createElement('input');
  idHidden.dataset.input = 'id';
  idHidden.type = 'hidden';
  idHidden.value = 0;
  fieldsetEl.insertBefore(idHidden, fieldsetEl.firstElementChild);

  const saveEl = document.createElement('button');
  saveEl.dataset.action = 'save';
  saveEl.textContent = 'Сохранить';
  fieldsetEl.appendChild(saveEl);

  const cancelEl = document.createElement('button');
  cancelEl.dataset.action = 'cancel';
  cancelEl.textContent = 'Отмена';
  fieldsetEl.appendChild(cancelEl);

  saveEl.addEventListener('click', () => {
    formEl.onsubmit = event => {
      event.preventDefault();

      messageEl.textContent = '';
      let message = null;
      const author = authorEl.value.trim();
      if (author === '') {
        message = 'Значение поля не может быть пустым';
        messageEl.textContent = message;
        authorEl.focus();
        return;
      }

      const text = textEl.value.trim();
      if (text === '') {
        message = 'Значение поля не может быть пустым';
        messageEl.textContent = message;
        textEl.focus();
        return;
      }

      const edit = {
        id,
        author,
        text,
      };

      ajax('POST', apiUrl, {}, {
        onStart: () => {
          loaderEl.style.display = 'block';
          fieldsetEl.disabled = true;
        },
        onFinish: () => {
          loaderEl.style.display = 'none';
          fieldsetEl.disabled = false;
          fieldsetEl.innerHTML = '';
          fieldsetEl.appendChild(authorEl);
          fieldsetEl.appendChild(textEl);
          fieldsetEl.appendChild(addEl);
          editBtn.disabled = false;
          authorEl.focus();
        },
        onSuccess: data => {
          const editData = JSON.parse(data);
          posts.find(o => {
            if (o.id === id) {
              o.author = editData.author;
              o.text = editData.text;
              return;
            }
            o;
          });
          renderWishes(postsEl, posts);
          formEl.reset();
        },
        onError: error => console.log(error),
      }, edit);
    };
  });

  cancelEl.addEventListener('click', () => {
    fieldsetEl.disabled = false;
    fieldsetEl.innerHTML = '';
    authorEl.value = '';
    textEl.value = '';
    fieldsetEl.appendChild(authorEl);
    fieldsetEl.appendChild(textEl);
    fieldsetEl.appendChild(addEl);
    editBtn.disabled = false;
  });
}

function addComments(formelem, id) {
  formelem.onsubmit = e => {
    e.preventDefault();
    const commentEl = formelem.children[0];
    messageEl.textContent = '';
    let message = null;

    const text = commentEl.value.trim();
    if (text === '') {
      message = 'Значение поля не может быть пустым';
      messageEl.textContent = message;
      commentEl.focus();
      return;
    }
    
    const comment = {
      id,
      text,
    };
    ajax('POST', `${apiUrl}/${id}/comments`, { 'Content-type': 'application/json' }, {
      onStart: () => {
        const post = document.querySelector(`[data-post-id="${id}"]`);
        const form = post.children[three];
        post.replaceChild(actionLoaderEl, form);
      },
      onFinish: () => {
        authorEl.focus();
      },
      onSuccess: data => {
        posts.find(o => {
          o.id === id ? o.comments.push(JSON.parse(data)) : o;
        });
        renderWishes(postsEl, posts);
        formelem.reset();
      },
      onError: error => console.log(error),
    }, comment);
  };
}

function ajax(method, url, headers, callbacks, body) {

  if (typeof callbacks.onStart === 'function') {
    callbacks.onStart();
  }

  const heads = Object.keys(headers);

  const xhr = new XMLHttpRequest();
  xhr.open(method, url);
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status > 299) {
      const error = JSON.parse(xhr.statusText);
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(error);
      }
      return;
    }

    const data = xhr.responseText;

    if (method === 'DELETE') {
      if (typeof callbacks.onSuccess === 'function') {
        callbacks.onSuccess(data);
        return;
      }
    }

    if (typeof callbacks.onSuccess === 'function') {
      callbacks.onSuccess(data);
    }
    if (typeof callbacks.onFinish === 'function') {
      callbacks.onFinish(body);
    }

  };
  xhr.onerror = () => {
    const error = xhr.statusText;
    if (typeof callbacks.onError === 'function') {
      callbacks.onError(error);
    }
  };
  xhr.onloadend = () => {
    if (typeof callbacks.onFinish === 'function') {
      callbacks.onFinish();
    }
  };

  heads.map(head => {
    if (head) {
      xhr.setRequestHeader(head, headers[head]);
    }
  });
  if (body) {
    xhr.send(JSON.stringify(body));
    return;
  }

  xhr.send();
}