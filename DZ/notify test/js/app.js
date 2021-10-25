// Every
//Пример: проверка размера всех элементов массива

function isBigEnough(element, index, array) {
    return element >= 10;
}

const every1 = [12, 5, 8, 130, 44].every(isBigEnough);   // false
const every2 = [12, 54, 18, 130, 44].every(isBigEnough); // true

console.log(every1);
console.log(every2);

//Пример: использование стрелочных функций

const every3 = [12, 5, 8, 130, 44].every(elem=> elem >=10); // true
const every4 = [12, 54, 18, 130, 44].every(elem=> elem >=10); // true
console.log(every3);
console.log(every4);

// Some
//Пример: проверка размера всех элементов массива

function isBiggerThan10(element, index, array) {
    return element > 10;
  }
const some1 =  [2, 5, 8, 1, 4].some(isBiggerThan10);  // false
const some2 =  [12, 5, 8, 1, 4].some(isBiggerThan10); // true
console.log(some1);
console.log(some2);
//Проверка элементов массива с использованием стрелочных функций
const some3 = [2, 5, 8, 1, 4].some(elem => elem > 10);  // false
const some4 = [12, 5, 8, 1, 4].some(elem => elem > 10); // true  
console.log(some3);
console.log(some4);

//DZ with SOME and with arrow functions //стрелочные функции 

function hasUnread(items) {
    return items.some(item => item.read )
    
}

const posts = [
    {
        id:1,
        read:true,
    },
    {
        id:2,
        read:true,
    },
    {
        id:3,
        read:false,
    },
];

const notify = hasUnread(posts);
console.log(notify);

//DZ with EVERY 
function hasUnread(items) {
    return items.every(function (item) {      
     return item.read 
    });
    
}

const posts1 = [
    {
        id:1,
        read:true,
    },
    {
        id:2,
        read:true,
    },
    {
        id:3,
        read:false,
    },
];

const notify1 = hasUnread(posts1);
console.log(notify1);




//
function hasUnread1(items1) {
    //return items.function (item) {      
     return items1.read 
   // });
    
}
const posts1 = [
    {
        id:1,
        read:'cs',
    },
    {
        id:2,
        read:'scs',
    },
    {
        id:3,
        read:'',
    },
].some(hasUnread1);

//const notify = hasUnread(posts);
console.log(posts1);


