'use strict';
const photos = [
  { id: 1, src: './img/1.png', alt: 'first_card'},
  { id: 2, src: './img/2.png', alt: 'second_card'},
  { id: 3, src: './img/3.png', alt: 'third_card'},
  { id: 4, src: './img/4.png', alt: 'fourth_card'},
];

function bindPhotoToViewer(photosArr, el) {
  const picture = el.querySelector('[data-id="photo"]');
  const prev = el.querySelector('[data-action="prev"]');
  const next = el.querySelector('[data-action="next"]');
  prev.disabled = true;
  let i = 0;
  picture.src = photosArr[0].src;
  picture.alt = photosArr[0].alt;
  next.onclick = () => {
    i++;
    picture.src = photosArr[i].src;
    picture.alt = photosArr[i].alt;
    prev.disabled = false;
    if (i === photosArr.length - 1) {
      next.disabled = true;
    } else {
      next.disabled = false;
    }
  };

  prev.onclick = () => {
    i--;
    picture.src = photosArr[i].src;
    picture.alt = photosArr[i].alt;
    next.disabled = false;
    if (i === 0) {
      prev.disabled = true;
    } else {
      prev.disabled = false;
    }
  };
}
const viewer = document.querySelector('[data-id="viewer"]');
bindPhotoToViewer(photos, viewer);
