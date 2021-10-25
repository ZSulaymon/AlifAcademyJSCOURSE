'use strict';

let posts = [];

const rootEl = document.getElementById('root');
const apiUrl = 'http://127.0.0.1:9999/api/hw34/posts';

rootEl.innerHTML = `
<div data-id="loader" style="display: none">Загружаем данные...</div>
<form data-id="post-form">
    <fieldset data-id="post-fields">
        <input data-input="author"/>
        <input data-input="text"/>
        <button data-action="add" >Добавить</button>
    <div>
</div>
<div data-id="posts"></div>
<div data-id="message"></div>
`;

const loaderContEl = document.createElement('div');
const loaderPostEl = createFormEl('span', 'data-id', 'action-loader');
const loaderImgEl = createFormEl('img', 'src', './img/loader.gif');
loaderPostEl.appendChild(loaderImgEl);
loaderContEl.appendChild(loaderPostEl);
const loaderEl = rootEl.querySelector('[data-id="loader"]');
const postsEl = rootEl.querySelector('[data-id="posts"]');
const formEl = rootEl.querySelector('[data-id="post-form"]');
const authorEl = rootEl.querySelector('[data-input="author"]');
const textEl = rootEl.querySelector('[data-input="text"]');
const fieldsetEl = rootEl.querySelector('[data-id="post-fields"]');
const messageEl = rootEl.querySelector('[data-id="message"]');

messageEl.textContent = '';
messageEl.dataset.id = 'message';

formEl.onsubmit = evt => {
    evt.preventDefault();
    const id = 0;
    const author = authorEl.value.trim();
    const text = textEl.value.trim();
    if (author.length > 0 && text.length > 0) {
        messageEl.textContent = '';
        const post = {id, author, text, likes: 0};
        ajax('POST', apiUrl, {'Content-Type': 'application/json'}, {
            onStart: () => {
                loaderEl.style.display = 'block';
                fieldsetEl.disabled = true;
            },
            onFinish: () => {
                loaderEl.style.display = 'none';
                fieldsetEl.disabled = false;
                authorEl.focus();
                formEl.reset();
            },
            onSuccess: data => {
                data = JSON.parse(data);
                posts.unshift(data);
                createPost(postsEl, posts, data, true);
                authorEl.focus();
                formEl.reset();
            },
            onError: error => console.log(error)
        }, JSON.stringify(post));

    } else {
        if (author.trim() === '') {
            authorEl.focus();
            messageEl.textContent = 'Значение поля не может быть пустым!';
            return;
        }
        if (text.trim() === '') {
            textEl.focus();
            messageEl.textContent = 'Значение поля не может быть пустым!';
        }
    }
};

function ajax(method, url, headers, callbacks, body) {
    if (typeof callbacks.onStart === 'function') {
        callbacks.onStart();
    }
    headers = headers || {};
    const xhr = new XMLHttpRequest();
    xhr.open(method, url);
    Object.keys(headers).forEach(item => xhr.setRequestHeader(item, headers[item]));
    xhr.onload = () => {
        if (xhr.status < 200 || xhr.status > 299) {
            if (typeof callbacks.onError === 'function') {
                callbacks.onError(xhr.statusText);
            }
            return;
        }
        if (typeof callbacks.onSuccess === 'function') {
            if (method === 'DELETE') {
                callbacks.onSuccess();
            } else {
                callbacks.onSuccess(xhr.responseText);
            }
        }
    };

    xhr.onerror = () => {
        if (typeof callbacks.onError === 'function') {
            callbacks.onError({error: 'network error'});
        }
    };

    xhr.onloadend = () => {
        if (typeof callbacks.onFinish === 'function') {
            callbacks.onFinish();
        }
    };
    if (body) {
        xhr.send(body);
    } else {
        xhr.send();
    }
}

ajax('GET', apiUrl, {}, {
    onStart: () => loaderEl.style.display = 'block',
    onFinish: () => loaderEl.style.display = 'none',
    onSuccess: data => {
        posts = JSON.parse(data);
        renderPosts(postsEl, posts);
    },
    onError: error => console.log(error)
});

function createFormEl(elName, attEl, atrText) {
    const elm = document.createElement(elName);
    elm.setAttribute(attEl, atrText);
    return elm;
}

function createPost(postsEl2, posts2, item, addToFirst = false) {

    const div = document.createElement('div');
    div.setAttribute('data-type', 'post');
    div.setAttribute('data-post-id', item.id);

    const emptyDiv = document.createElement('div');

    const div1 = createFormEl('div', 'data-post-part', 'author');
    div1.innerHTML = item.author;
    const div2 = createFormEl('div', 'data-post-part', 'text');
    div2.innerHTML = item.text;

    const likesEl = createFormEl('span', 'data-info', 'likes');
    likesEl.textContent = item.likes;
    const btnLikeEl = createFormEl('button', 'data-action', 'like');
    btnLikeEl.textContent = '+1';
    btnLikeEl.onclick = (e) => {
        e.preventDefault();
        ajax('POST', `${apiUrl}/${item.id}/likes`, {}, {
            onStart: () => {
                emptyDiv.style.display = 'none';
                div.appendChild(loaderContEl);
            },
            onFinish: () => {
                item.likes += 1;
                likesEl.textContent = item.likes;
                emptyDiv.style.display = 'block';
                div.removeChild(loaderContEl);
            },
            onSuccess: () => {
            },
            onError: error => console.log(error)
        });
    };

    const btnDislikeEl = createFormEl('button', 'data-action', 'dislike');
    btnDislikeEl.textContent = '-1';
    btnDislikeEl.onclick = (e) => {
        e.preventDefault();
        ajax('DELETE', `${apiUrl}/${item.id}/likes`, {}, {
            onStart: () => {
                emptyDiv.style.display = 'none';
                div.appendChild(loaderContEl);
            },
            onFinish: () => {
                item.likes -= 1;
                likesEl.textContent = item.likes;
                emptyDiv.style.display = 'block';
                div.removeChild(loaderContEl);
            },
            onSuccess: () => {
            },
            onError: error => console.log(error)
        });
    };
    const removeEl = createFormEl('button', 'data-action', 'remove');
    removeEl.textContent = 'Удалить';

    removeEl.onclick = () => {
        ajax('DELETE', apiUrl + '/' + item.id, {}, {
            onStart: () => loaderEl.style.display = 'block',
            onFinish: () => loaderEl.style.display = 'none',
            onSuccess: () => {

            },
            onError: error => console.log(error)
        });
        const index = posts2.find(post => post.id === item.id);
        posts2.splice(index, 1);
        div.parentElement.removeChild(div);
    };

    emptyDiv.appendChild(document.createTextNode('❤ '));
    emptyDiv.appendChild(likesEl);
    emptyDiv.appendChild(btnLikeEl);
    emptyDiv.appendChild(btnDislikeEl);
    emptyDiv.appendChild(removeEl);

    div.appendChild(div1);
    div.appendChild(div2);
    div.appendChild(emptyDiv);
    createComment(item, div);
    if (addToFirst) {
        postsEl2.prepend(div);
    } else {
        postsEl2.appendChild(div);
    }
}

function createComment(item, parentEl) {
    const form = createFormEl('form', 'data-form', 'comment');
    const inputEl = createFormEl('input', 'data-id', 'text');
    const btnEl = document.createElement('button');
    btnEl.innerText = 'Добавить';
    const commentsEl = createFormEl('div', 'data-post-part', 'comments');

    form.appendChild(inputEl);
    form.appendChild(btnEl);
    parentEl.appendChild(form);
    parentEl.appendChild(commentsEl);
    form.insertBefore(messageEl, inputEl);

    item.comments.forEach(item3 => commentsEl.appendChild(renderComment(item3)));

    form.onsubmit = evt => {
        evt.preventDefault();

        let current;
        const text = inputEl.value.trim();
        if (text.length > 0) {
            current = {id: item.comments.length, text: text};
            messageEl.textContent = '';

            ajax('POST', `${apiUrl}/${item.id}/comments`, {}, {
                onStart: () => {
                    parentEl.insertBefore(loaderContEl, form);
                    parentEl.removeChild(form);
                },
                onFinish: () => {

                },
                onSuccess: (data) => {
                    data = JSON.parse(data);
                    parentEl.insertBefore(form, loaderContEl);
                    parentEl.removeChild(loaderContEl);
                    item.comments.push(data);
                    commentsEl.appendChild(renderComment(data));
                },
                onError: error => console.log(error)
            }, JSON.stringify(current));

            inputEl.value = '';
            inputEl.focus();
        } else {
            messageEl.textContent = 'Значение поля не может быть пустым!';
            inputEl.textContent = '';
            inputEl.focus();
        }
        form.reset();
    };

}

function renderComment(item) {
    const dvEl = createFormEl('div', 'data-comment-id', item.id);
    dvEl.innerText = item.text;
    return dvEl;
}

function renderPosts(postsEl2, posts2) {
    posts2.forEach(item => {
        createPost(postsEl2, posts2, item);
    });
}
