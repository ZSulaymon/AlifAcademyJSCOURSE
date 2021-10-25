'use strict';
const rootEl = document.getElementById('root');

// const finalEl = document.createElement('div');
// rootEl.appendChild(finalEl);

// const nameLabelEl = document.createElement('label');
// nameLabelEl.textContent = 'Назвние: ';
// nameLabelEl.htmlFor = 'name-input'; //////////////////устнанавливает фокус
// finalEl.appendChild(nameLabelEl);



//Div CREATE Final Week
// const finalEl = document.createElement('div');
// finalEl.dataset.type = 'text'; 
// finalEl.dataset.id = 3;
// rootEl.appendChild(finalEl);

// const valEl = document.createElement('div');
// valEl.textContent = 'Final Week';
// finalEl.appendChild(valEl);


// //Div CREATE image
// const imageEl = document.createElement('div');
// imageEl.dataset.type = 'image'; 
// imageEl.dataset.id = 2;
// rootEl.appendChild(imageEl);

// const srcElF = document.createElement('img');
// srcElF.src = './img/logo_js.png';
// imageEl.appendChild(srcElF);

// //Div CREATE video
// const videoEl = document.createElement('div');
// videoEl.dataset.type = 'video'; 
// videoEl.dataset.id = 1;
// rootEl.appendChild(videoEl);

// const srcElV = document.createElement('video');
// srcElV.src = './video/video.ogv';
// videoEl.appendChild(srcElV);

const posts = [
  {
    id: 3,
    type:'text',
    content:'Final Week',
  },
  {
    id:2,
    type:'image',
    content:'./img/logo_js.svg',
  },
  {
    id: 1,
    type:'video',
    content:'./video/video.ogv',
  },
];

function  makePostEl(post) {
  //Div CREATE Final Week
const finalEl = document.createElement('div');
finalEl.dataset.type = 'text'; 
finalEl.dataset.id = 3;
rootEl.appendChild(finalEl);

const valEl = document.createElement('div');
valEl.textContent = 'Final Week';
finalEl.appendChild(valEl);


//Div CREATE image
const imageEl = document.createElement('div');
imageEl.dataset.type = 'image'; 
imageEl.dataset.id = 2;
rootEl.appendChild(imageEl);

const srcElF = document.createElement('img');
srcElF.src = './img/logo_js.png';
imageEl.appendChild(srcElF);

//Div CREATE video
const videoEl = document.createElement('div');
videoEl.dataset.type = 'video'; 
videoEl.dataset.id = 1;
rootEl.appendChild(videoEl);

const srcElV = document.createElement('video');
srcElV.src = './video/video.ogv';
videoEl.appendChild(srcElV);
};

function makeWall(el,items) {
  items.map(makePostEl).forEach()
};

makePostEl(rootEl, posts);

alert(imageEl.src)


// const sum = wishes.map(o =>o.price).reduce((prev, curr)=> prev + curr);
// totalEl.textContent = `Необходимо ${sum} c.`;