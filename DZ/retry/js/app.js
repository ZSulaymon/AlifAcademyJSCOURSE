'use strict';

let posts = []

const apiUrl = 'http://127.0.0.1:9999/api/hw30/posts';

const rootEl = document.getElementById('root');

const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Данные загружаются';


const btnEl = document.createElement('button');
btnEl.textContent = 'Загрузить данные';
btnEl.dataset.action = 'load';
rootEl.appendChild(btnEl);

const wallEl = document.createElement('div');
wallEl.dataset.id = 'wall';
rootEl.appendChild(wallEl);


rootEl.addEventListener('click', (evt) => {
    if (evt.target.dataset.action === 'retry') {
        rootEl.innerHTML = '';
        rootEl.appendChild(btnEl);
        rootEl.appendChild(wallEl);
    }
})


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

            rootEl.innerHTML = `<div>
            Произошла ошибка: <span data-id="error">${error.message}</span> <button
            data-action="retry">Повторить запрос</button> </div>`
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

function load() {
    wallEl.innerHTML = '';
    loadData({
        onStart: () => (wallEl.appendChild(loaderEl)),
        onFinish: () => loaderEl.remove(),
        onSuccess: (data) => {
            posts = data;
            makeWall(wallEl, posts);
        },
        onError: (error) => console.log(error),
    });
}

btnEl.onclick = load;