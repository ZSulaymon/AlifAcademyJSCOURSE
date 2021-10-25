 function hasUnread(items) {
    return items.every(item => item.read == 1);     
    
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
        read:true,
    },
];

const notify = hasUnread(posts);
console.log(notify);