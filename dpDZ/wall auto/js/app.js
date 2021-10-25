'use strict';

const rootEl = document.getElementById('root');
const updateTime = 5000;

const posts = [];
const apiurl = 'http://127.0.0.1:9999/api/hw36/posts';

const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Данные загружаются';
loaderEl.style.visibility = 'hidden';
rootEl.prepend(loaderEl);

const form = document.createElement('form');
form.dataset.id = 'post-form';
const fieldset = document.createElement('fieldset');
fieldset.dataset.id = 'post-fields';
const hiddenInp = document.createElement('input');
hiddenInp.dataset.input = 'id';
hiddenInp.type = 'hidden';
hiddenInp.value = '0';
fieldset.appendChild(hiddenInp);
const dataAuthor = document.createElement('input');
dataAuthor.dataset.input = 'author';
fieldset.appendChild(dataAuthor);
const dataText = document.createElement('input');
dataText.dataset.input='text';
fieldset.appendChild(dataText);
const butAdd = document.createElement('button');
butAdd.dataset.action='add';
butAdd.textContent='Добавить';
fieldset.appendChild(butAdd);
form.appendChild(fieldset);

const errorDiv = document.createElement('div');
errorDiv.dataset.id = 'message';
errorDiv.textContent = '';
form.prepend(errorDiv);

rootEl.appendChild(form);

const postsDiv = document.createElement('div');
postsDiv.dataset.id = 'posts';
rootEl.appendChild(postsDiv);

const loaderSpan = document.createElement('span');
loaderSpan.dataset.id = 'action-loader';
const loadImg = document.createElement('img');
loadImg.src = './img/loader.gif';
loaderSpan.appendChild(loadImg);

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const addFlag = hiddenInp.value === '0' ? true : false;
  
  const id = Number(hiddenInp.value);
  const author = dataAuthor.value.trim();
  const text = dataText.value.trim();
  if (!isValid(author, 'text')) { dataAuthor.focus(); return; }
  if (!isValid(text, 'text')) { dataText.focus(); return; }
  
  const item = addFlag ? { id, author, text, likes: 0, comments: [] } : posts.filter(el => el.id === id)[0];
  
  item.author = author;
  item.text = text;

  ajax('POST',
    apiurl, 
    {'Content-Type':'application/json'},
    {
      onStart: () => {
        loaderEl.style.visibility = 'visible';
        loaderEl.textContent='Отправляем данные...';
        fieldset.disabled = true;
      },
      onError: (error) => errorDiv.textContent=JSON.parse(error),
      onSuccess: (data) => {
        if (addFlag) {
          posts.unshift(JSON.parse(data)); postsDiv.prepend(makePost(JSON.parse(data))); 
        } else {
          const edInd = posts.findIndex(el => el.id === id);
          const newDat = JSON.parse(data);
          posts[edInd].author = newDat.author;
          posts[edInd].text = newDat.text;
          const parNode = postsDiv.querySelector(`[data-post-id="${id}"]`);
          parNode.querySelector('[data-post-part="author"]').textContent = newDat.author;
          parNode.querySelector('[data-post-part="text"]').textContent = newDat.text;
        }
      },
      onFinish: () => {
        loaderEl.style.visibility = 'hidden';
        fieldset.disabled = false;
        form.reset();
        hiddenInp.value = '0';
        dataAuthor.focus();
      } 
    }, JSON.stringify(item));
});

function makePost(post) {
    const wrapDiv = document.createElement('div');
    wrapDiv.dataset.type='post';
    wrapDiv.dataset.postId = post.id;

    const authorDiv = document.createElement('div');
    authorDiv.dataset.postPart='author';
    authorDiv.textContent = post.author;
    wrapDiv.appendChild(authorDiv);

    const textDiv = document.createElement('div');
    textDiv.dataset.postPart='text';
    textDiv.textContent = post.text;
    wrapDiv.appendChild(textDiv);

    const secWrapDiv = document.createElement('div');
    secWrapDiv.textContent = '♥ ';
    const likeSpan = document.createElement('span');
    likeSpan.dataset.info = 'likes';
    likeSpan.textContent = `${post.likes}`;
    secWrapDiv.appendChild(likeSpan);

    const plusBut = document.createElement('button');
    plusBut.dataset.action='like';
    plusBut.textContent='+1';
    secWrapDiv.appendChild(plusBut);

    const minusBut = document.createElement('button');
    minusBut.dataset.action='dislike';
    minusBut.textContent='-1';
    secWrapDiv.appendChild(minusBut);

    const editBut = document.createElement('button');
    editBut.dataset.action = 'edit';
    editBut.textContent = 'Изменить';
    editBut.addEventListener('click', editPost);
    secWrapDiv.appendChild(editBut);

    const removeBut = document.createElement('button');
    removeBut.dataset.action='remove';
    removeBut.textContent = 'Удалить';
    secWrapDiv.appendChild(removeBut);
    
    wrapDiv.appendChild(secWrapDiv);
    wrapDiv.addEventListener('click', removePost);
    wrapDiv.addEventListener('click', makeLike);

    const commentForm = document.createElement('form');
    commentForm.dataset.form = 'comment';
    const commentInput = document.createElement('input');
    commentInput.dataset.id = 'text';
    const commentBut = document.createElement('button');
    commentBut.textContent = 'Добавить';
    commentForm.appendChild(commentInput);
    commentForm.appendChild(commentBut);
    commentForm.addEventListener('submit', submitComment);
    wrapDiv.appendChild(commentForm);
    
    const commentDiv = document.createElement('div');
    commentDiv.dataset.postPart = 'comments';
    post.comments.forEach(el => commentDiv.appendChild(renderComment(el)));
    wrapDiv.appendChild(commentDiv);

    return wrapDiv;    
}

function editPost(e) {
  const postNode = e.target.parentNode.parentNode;
  const curId = Number(postNode.dataset.postId);
  const curInd = posts.findIndex(el => el.id === curId);
  
  fieldset.removeChild(butAdd);

  hiddenInp.value = posts[curInd].id;
  dataAuthor.value = posts[curInd].author;
  dataText.value = posts[curInd].text;
  dataAuthor.focus();

  const confirmEdit = document.createElement('button');
  confirmEdit.dataset.action = 'save';
  confirmEdit.textContent = 'Сохранить';
  fieldset.appendChild(confirmEdit);

  const cancelEdit = document.createElement('button');
  cancelEdit.dataset.action = 'cancel';
  cancelEdit.textContent = 'Отмена';
  fieldset.appendChild(cancelEdit);
  cancelEdit.addEventListener('click', (evt) => {
    evt.preventDefault();
    hiddenInp.value='0';
    form.reset();
    fieldset.removeChild(confirmEdit);
    fieldset.removeChild(cancelEdit);
    fieldset.appendChild(butAdd);
  });
}

function renderComment(commentary) {
  const commDiv = document.createElement('div');
  commDiv.dataset.commentId = commentary.id;
  commDiv.textContent = commentary.text;
  return commDiv;
}

function submitComment (e) {
  e.preventDefault();
  const formToHide = e.currentTarget;
  const hiderParent = e.currentTarget.parentNode;
  const text = e.target.querySelector('[data-id="text"]').value.trim();
  const index = posts.findIndex(el => el.id === Number(e.currentTarget.parentNode.dataset.postId));
  if (!isValid(text,'text')) { e.target.querySelector('[data-id="text"]').focus(); return; }
  ajax('POST',
       `${apiurl}/${posts[index].id}/comments`,
       {'Content-Type':'application/json'},
       {
         onStart: () => {
           hiderParent.removeChild(formToHide);
           hiderParent.insertBefore(loaderSpan, hiderParent.lastChild);
         },
         onSuccess: (data) => {
           posts[index].comments.push(JSON.parse(data));
           hiderParent.querySelector('[data-post-part="comments"]').appendChild(renderComment(JSON.parse(data)));
         },
         onFinish: () => {
           hiderParent.removeChild(loaderSpan);
           hiderParent.insertBefore(formToHide, hiderParent.lastChild);
           formToHide.reset();
           formToHide.querySelector('[data-id="text"]').focus();
         }
       },
       JSON.stringify({id: 0, text}));
}

function makeLike(e) {
  if (e.target.dataset.action !== 'like' && e.target.dataset.action !== 'dislike') { return; }
  const id = Number(e.currentTarget.dataset.postId);
  const op = e.target.dataset.action === 'like' ? 'POST' : 'DELETE';
  const hidingNode = e.target.parentNode;
  const postParent = e.currentTarget;
  ajax(op, `${apiurl}/${id}/likes`, {}, {
    onStart: () => {
      postParent.removeChild(hidingNode);
      postParent.insertBefore(loaderSpan, postParent.querySelector('[data-form="comment"]'));
    },
    onSuccess: (data) => { 
      console.log(data);
      const likeSpan = hidingNode.querySelector('[data-info="likes"]');
      if (op === 'POST') {
      posts.forEach(el => {if (el.id === id) { likeSpan.textContent = `${++el.likes}`; }}); 
    } else {
      posts.forEach(el => {if (el.id === id) { likeSpan.textContent = `${--el.likes}`; }});
    }
    },
    onFinish: () => {
      postParent.removeChild(loaderSpan);
      postParent.insertBefore(hidingNode, postParent.querySelector('[data-form="comment"]'));
    }
  }, null);
}

function removePost(e) {
  if (e.target.dataset.action==='remove') {
    const id = Number(e.target.parentNode.parentNode.dataset.postId);
    posts.splice(posts.findIndex(el => el.id === id),1);
    postsDiv.removeChild(e.target.parentNode.parentNode);
    ajax('DELETE', `${apiurl}/${id}`, {}, {
      onStart: () => { loaderEl.style.visibility = 'visible'; loaderEl.textContent = 'Удаляем...'; },
      onFinish: () => loaderEl.style.visibility = 'hidden'
    }, null);
  }
}

function getData() {
  postsDiv.textContent = '';
  ajax('GET', apiurl, {}, {
    onStart: () => {
      loaderEl.style.visibility = 'visible';
      loaderEl.textContent = 'Загружаем данные';
    },
    onError: (error) => console.log(error),
    onSuccess: (data) => {
      const list = JSON.parse(data);
      for (const post of list) {
        posts.push(post);
      }
      postsDiv.textContent = '';
      posts.forEach(el => postsDiv.appendChild(makePost(el)));
    },
    onFinish: () => loaderEl.style.visibility = 'hidden' 
  }, null);
}

function isValid(value, type) {
  form.prepend(errorDiv);
  let flag = true;
  let error = '';
  switch (type) {
      case 'text':
          error = 'Значение поля не может быть пустым!';
          if (value.trim() === '') { flag = false; } 
          break;
      case 'number':
          error = 'Цена должна быть числом больше нуля!';
          if (Number.isNaN(value) || value <= 0) { flag = false; }
          break;
  }
  errorDiv.textContent = flag ? '' : error;
  return flag;
}

function ajax(method, url, headers, callbacks, body) {
  const xhr = new XMLHttpRequest();

  xhr.open(method, url);
  Object.entries(headers).forEach(head => xhr.setRequestHeader(head[0],head[1]));
  if (typeof(callbacks.onStart)==='function') { callbacks.onStart(); }  
  xhr.onload = () => {
    if ((xhr.status < 200 || xhr.status > 299) &&
        typeof(callbacks.onError) === 'function') {
          callbacks.onError(xhr.statusText);
          return;
        }
        
        if (typeof(callbacks.onSuccess) === 'function') {
          callbacks.onSuccess(xhr.responseText);
        }
  };
  
  xhr.onerror = () => {
    if (typeof(callbacks.onError) === 'function') { callbacks.onError('Network error'); }
  };

  xhr.onloadend = () => {
    if (typeof(callbacks.onFinish) === 'function') { callbacks.onFinish(); }
  };
  
  switch (method) {
    case 'POST': 
      xhr.send(body); 
      break;
    default: xhr.send();
  }
}

setInterval(() => {
  const curId = Number(postsDiv.firstChild.dataset.postId);
  
  ajax('GET',`${apiurl}/newer/${curId}`,{},{
    onStart: () => {},
    onSuccess: (data) => {
      const newPosts = JSON.parse(data);
      for (let iter = (newPosts.length-1); iter >= 0; iter--) {
        posts.unshift(newPosts[iter]);
        postsDiv.prepend(makePost(newPosts[iter]));
      }
    },
    onFinish: () => {}
  },null);  
},updateTime);

getData();