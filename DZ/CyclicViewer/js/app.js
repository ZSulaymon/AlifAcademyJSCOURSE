// 'use strict';
// const photos = [
//   { id: 1, src: './img/1.png', alt: 'first'},
//   { id: 2, src: './img/2.png', alt: 'second'},
//   { id: 3, src: './img/3.png', alt: 'third'},
//   { id: 4, src: './img/4.png', alt: 'fourth'},
// ];

// function bindPhotoToViewer(photosArr, el) {
//   const picture = el.querySelector('[data-id="photo"]');
//   const prev = el.querySelector('[data-action="prev"]');
//   const next = el.querySelector('[data-action="next"]');
//   //prev.disabled = true;
//   let i = 0;
//   picture.src = photosArr[0].src;
//   picture.alt = photosArr[0].alt;
//   next.onclick = () => {
//     i++;
//     picture.src = photosArr[i].src;
//     picture.alt = photosArr[i].alt;
//   // prev.disabled = false;
//     if (i === photosArr.length - 1) {
//       i = -1; 
//     }
//   };
//   prev.onclick = () => {
  
//     picture.src = photosArr[i].src;
//     picture.alt = photosArr[i].alt;
//   //  next.disabled = false;
//     if (i <= 0) {
//       i = 4;
//     } 
//   };
// }
// const viewer = document.querySelector('[data-id="viewer"]');
// bindPhotoToViewer(photos, viewer);

 'use strict';

const photos = [
  { id: 1, src: './img/first.jpg', alt: 'first', },
  { id: 2, src: './img/second.jpg', alt: 'second', },
  { id: 3, src: './img/third.jpg', alt: 'third', },
  { id: 4, src: './img/fourth.jpg', alt: 'fourth', },
];
function bindPhotoToViewer(photo, el) {
  el.dataset.id = photo.id;
  el.src = photo.src;
  el.alt = photo.alt;
}

const imgEl = document.querySelector('[data-id="photo"]');
const prevEl = document.querySelector('[data-action="prev"]');
const nextEl = document.querySelector('[data-action="next"]');



imgEl.dataset.photoId = photos[0].id;
imgEl.src = photos[0].src;
imgEl.alt = photos[0].alt;


nextEl.onclick = () => {
  imgEl.dataset.photoId++;
  if (imgEl.dataset.photoId === String(photos[photos.length-1].id + 1)) {
      imgEl.dataset.photoId = '1';
  }

  bindPhotoToViewer(photos[imgEl.dataset.photoId-1], imgEl);
  
};

prevEl.onclick = () => {
  imgEl.dataset.photoId --;
  if (imgEl.dataset.photoId === '0') {
      imgEl.dataset.photoId = photos[photos.length-1].id;
  }

  bindPhotoToViewer(photos[imgEl.dataset.photoId-1], imgEl);

};