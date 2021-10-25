'use strict';

const state = {
  posts: []
};

const apiUrl = 'http://127.0.0.1:9999/api/hw29/posts';

const rootEl = document.getElementById('root');

const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Данные загружаются';
rootEl.appendChild(loaderEl);

const loadData = (callbacks) => {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', apiUrl);
  xhr.onloadstart = () => {
    if (typeof callbacks.onStart === 'function') {
      callbacks.onStart();
    }
  };
  xhr.onload = () => {
    if (xhr.status < 200 || xhr.status > 299) {
      const error = JSON.parse(xhr.responseText);
      if (typeof callbacks.onError === 'function') {
        callbacks.onError(error);
      }
      return;
    }

    const data = JSON.parse(xhr.responseText);
    if (typeof callbacks.onSuccess === 'function') {
      callbacks.onSuccess(data);
    }
  };

  xhr.onerror = () => {
    if (typeof callbacks.onError === 'function') {
      callbacks.onError();
    }
  };
  xhr.onloadend = () => {
    if (typeof callbacks.onFinish === 'function') {
      callbacks.onFinish();
    }
  };

  xhr.send();
};

const wallEl = document.createElement('div');
wallEl.dataset.id = 'wall';
rootEl.appendChild(wallEl);

const makePostEl = (post) => {
  let divPost;
  if (post.type === 'text') {
    const div = document.createElement('div');
    div.textContent = post.content;
    divPost = div;
  }
  if (post.type === 'image') {
    const img = document.createElement('img');
    img.src = post.content;
    divPost = img;
  }
  if (post.type === 'video') {
    const video = document.createElement('video');
    video.controls = true;
    video.src = post.content;
    divPost = video;
  }
  const div = document.createElement('div');
  div.setAttribute('data-type', post.type);
  div.setAttribute('data-id', post.id);
  div.appendChild(divPost);
  return div;
};

const makeWall = (el, items) => {
  items
    .map((post) => makePostEl(post))
    .forEach((post) => {
      el.appendChild(post);
    });
};

loadData({
  onStart: () => (loaderEl.style.display = 'block'),
  onFinish: () => loaderEl.remove(),
  onSuccess: (data) => {
    state.posts = data;
    makeWall(wallEl, state.posts);
  },
  onError: (error) => console.log(error),
});