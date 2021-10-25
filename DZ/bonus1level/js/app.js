const rootEl = document.getElementById('root');

const loaderEl = document.createElement('div');
loaderEl.dataset.id = 'loader';
loaderEl.textContent = 'Данные загружаются';
rootEl.appendChild(loaderEl);

const formEll = document.createElement('form');
formEll.method = 'post';
formEll.enctype = 'multipart/form-data';
loaderEl.appendChild(formEll);

const nameEl = document.createElement('input');
nameEl.dataset.id = 'name';
nameEl.name = 'message';
formEll.appendChild(nameEl);

const medaiEl = document.createElement('input');
medaiEl.dataset.id = 'media';
medaiEl.name = 'media';
medaiEl.type = 'file';
formEll.appendChild(medaiEl);

const buttonEl = document.createElement('button');
buttonEl.textContent = 'Отправить';
formEll.appendChild(buttonEl);


// const apiUrl = 'http://127.0.0.1:9999/api';
// const formEl = document.querySelector('form');
// formEl.addEventListener('submit', evt=> {
//     evt.preventDefault();
//     const formData = new FormData(evt.currentTarget);
//     const xhr = new XMLHttpRequest();
//     xhr.open('POST', `${apiUrl}/media`);
//     xhr.addEventListener('loadend', () => {
//         const data = JSON.parse(xhr.responseText);

//         const audioEl = document.createElement('audio');
//         audioEl.controls = true;
//         audioEl.src = data.path;
//         document.body.appendChild(audioEl);
//     });
//     xhr.send(formData);
// });

//автозагрузка файла
const apiUrl = 'http://127.0.0.1:9999/api';
const medaiEll = document.querySelector('[data-id="media"]');
formEll.addEventListener('change', evt=> {
    const file = evt.target.files[0];

     const formData = new FormData();

     formData.append("media", file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', `${apiUrl}/media`);
    xhr.addEventListener('loadend', () => {
        const data = JSON.parse(xhr.responseText);


        evt.target.value = '';

        const audioEl = document.createElement('audio');
        audioEl.controls = true;
        audioEl.src = data.path;
        document.body.appendChild(audioEl);
    });
    xhr.send(formData);
});