'use strict';
 

const postEl = document.querySelector('[data-type="post"]');
const imgEl = postEl.querySelector('[data-id="image"]');
const likesEl = postEl.querySelector('[data-id="likes"]');
const likeEl = postEl.querySelector('[data-action="like"]');
const dislikeEl = postEl.querySelector('[data-action="dislike"]');

// const postWidget = {
//     roorEl:postEl,
//     imgEl: imgEl,
//     likesEl:likesEl,
//     likeEl:likeEl,
//     dislikeEl:dislikeEl,
// };


/*
Обратите внимание, некоторýе свойства пиúутсā вот так: imgEl: imgEl, т.е. имā
свойства и имā переменной, в которой хранитсā знаùение – одинаковý. Но всё
равно приходитсā пеùататþ по два раза. JS в ÿтом плане проделал болþúуĀ работу
и теперþ можно не дублироватþ ÿто всё:
*/ 

const messageEl = postEl.querySelector('[data-id="message"]');

const postWidget = {
    roorEl:postEl,
    imgEl,
    likesEl,
    likeEl,
    dislikeEl,
    messageEl,
};

const post = {
    id: 1,
    title:'JS is Fun',
    img:{
        url:'./img/liked.svg',
        alt:'JS Logo',
    },
    likes: 0,
    voted: false,
};
// postWidget.likeEl.onclick = evt => {
//     console.log('like clicked');
//     console.log(evt);
// };

// postWidget.dislikeEl.onclick = evt => {
//     console.log('dislike clicked');
//     console.log(evt);
// };

// postWidget.likeEl.onclick = evt => {
//     post.likes++;
//    // postWidget.likeEl.onclick = null;
//     postWidget.likeEl.disabled = true;
//     postWidget.dislikeEl.disabled= true;
//     bindPostToEl(post,postWidget);
// };

// postWidget.dislikeEl.onclick = evt => {
//     post.likes--;
// //    postWidget.likeEl.onclick = null;
//     postWidget.likeEl.disabled = true;
//     postWidget.dislikeEl.disabled= true;
//     bindPostToEl(post,postWidget);
// };

    //freezing замораживание //  
// postWidget.likeEl.onclick = evt => {
//     if(post.voted){
//         postWidget.messageEl.textContent = 'you already voted';
//         return;
//     }
//     let counter = 0;
//     for (let i = 0; i < 100_000_000_000; i++) {
//     counter++;  
//     }
//     post.likes++;
//     post.voted =true;
//     bindPostToEl(post,postWidget);
// };

postWidget.likeEl.onclick = evt => {
    if (post.voted){
        postWidget.messageEl.textContent= 'You already voted!';
        return;
    }
    post.likes++;
    post.voted = true;
    bindPostToEl(post,postWidget);
};

postWidget.dislikeEl.onclick = evt => {
    if (post.voted){
        postWidget.messageEl.textContent= 'You already voted!';
        return;
    }
    post.likes--;
    post.voted = true;
    bindPostToEl(post,postWidget);
};


 
//write function witch bind object with widjet 

function bindPostToEl(post, el) {
    el.imgEl.src = post.img.url;
    el.imgEl.alt = post.img.alt;
    el.likesEl.textContent = post.likes;
}

bindPostToEl(post,postWidget)