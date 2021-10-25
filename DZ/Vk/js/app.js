'use strict';
 
setInterval(() => {  
    const count = document.querySelector('[data-id="counter"]');
    count.__counterValue = count.textContent;
    count.textContent =+ count.__counterValue + 10;
    

 }, 1000);
