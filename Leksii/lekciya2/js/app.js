
//создаём обьект 
const post = {
    percent : 0.5,
    minComission : 250,
    maxComission : 450,
    text: 'Salom'
}

//создаём массив

const posts = [
    {   id: 1,
        percent : 0.3,
        minComission : 250,
        maxComission : 450,
        text: 'Salom'
    },
    {
        id: 2,
        percent : 0.4,
        minComission : 250,
        maxComission : 450,
        text: 'Salom'
    },
]

// console.log(posts['0']),
// console.log(posts[1]),
// console.log(posts[0])

// for (const post of posts) {
//     console.log(post.percent)
// }

//создаём функцию и передаём в неё массив
function printPost(post){
    console.log(post)
}

posts.forEach(printPost);

//создаём функцию и передаём в неё обьект
function printPost(posts){
    console.log(posts)
}
posts.forEach(printPost);

//АнонимнЫе функøии =функøий, у которýх нет имени.
//Просто удалāем имā у функøии, а саму функøиĀ помеûаем в то место, где она исполþзуетсā:

posts.forEach(function(post){
    console.log(post.percent)
});

//Стрелочные функции

posts.forEach((post) => {
    console.log(post.percent)
});

posts.forEach((post) => console.log(post.percent));

//Если параметр у функøии всего один, то и круглýе скобки вокруг параметра можно не писатþ:
posts.forEach(post => console.log(post.percent));
// const percent = 0.3;
//  const minComission = 250;
// const maxComission = 450;