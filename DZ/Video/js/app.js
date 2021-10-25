'use strict';

const videoEl = document.querySelector('[data-id="video"]');
const playEl = document.querySelector('[data-action="play"]');
const pauseEl = document.querySelector('[data-action="pause"]');
const volumePlusEl = document.querySelector('[data-action="volume-plus"]');
const volumeMinusEl = document.querySelector('[data-action="volume-minus"]');

playEl.onclick = () => {
    videoEl.play();
};

pauseEl.onclick = () => {
    videoEl.pause();
};

volumePlusEl.onclick = () => {
    if (videoEl.volume < 1) {
        videoEl.volume += 0.1;
    } 
    videoEl.volume = 1;
};

volumeMinusEl.onclick = () => {
    if (videoEl.volume > 0) {
        videoEl.volume -= 0;
    }
    videoEl.volume = 0;
};