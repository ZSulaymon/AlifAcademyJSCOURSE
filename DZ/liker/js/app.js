'use strict';

const likeEl = document.querySelector('[data-action="like"]');

const imgEl = document.querySelector('img');


const post = {
    id: 1,
    userLiked: false,
    dislike:{
        url:'./img/unliked.svg',
        alt:'like Logo',
    },
    img:{
        url:'./img/liked.svg',
        alt:'Unliked logo',
    },
};
 
likeEl.onclick = () => {
  if (!post.userLiked){
    imgEl.src = post.img.url;
    post.userLiked = true;
  } else {
    imgEl.src = post.dislike.url;
    post.userLiked = false;
  } 
};