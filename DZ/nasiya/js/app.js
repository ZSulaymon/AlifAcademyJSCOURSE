'use strict';



const but1El = document.querySelector('[data-tab="nasia"]');
const but2El = document.querySelector('[data-tab="alifmobi"]');
document.querySelector('[data-tabpane="alifmobi"]').style.display = 'none';




but1El.onclick = () => {
    if (but1El){
        document.querySelector('[data-tabpane="alifmobi"]').style.display = 'none';
        document.querySelector('[data-tabpane="nasia"]').style.display = 'block';
    }
     
};
but2El.onclick = () => {
    if (but1El){
        document.querySelector('[data-tabpane="nasia"]').style.display = 'none';
        document.querySelector('[data-tabpane="alifmobi"]').style.display = 'block';
    }
     
};
