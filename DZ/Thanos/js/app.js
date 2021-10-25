function filterByThanos(items) {
 // if (items % 2 == 0)
    return items.filter(function (num) {
      return num % 2 ===0;
    });  
}

const posts = [1,2,3,4,5,6,7,8,9,10];

const filtered = filterByThanos(posts);

console.log(filtered);

// //№2
// function filterByThanos(items) {

//   return items.filter((item) => item.id % 2 ==0);
  
// }

// const posts =[
//   {
//       id: 2,
//       name: "Raydan",
//   },
//   {
//       id: 5,
//       name: "Sab-Zero",
//   },
//   {
//       id: 6,
//       name: "Kung-Lao",
//   },
//   {
//       id: 10,
//       name: "Scorpion",
//   },
//   {
//       id: 8,
//       name: "Sonya",
//   },
//   {
//       id: 9,
//       name: "Cage",
//   },
// ];
// const filtered = filterByThanos(posts);
// console.log(filtered);
//№2


//возвращает нечетные числа массива
// const posts = [1,2,3,4,5,6,7,8,9,10];
// let filtered = posts.filter(item=> item % 2 !=0)
// console.log(filtered);

//возвращает четные числа массива
// const posts = [1,2,3,4,5,6,7,8,9,10];
// let filtered = posts.filter(item=> item % 2 ==0)
// console.log(filtered);