'use strict';

const obj = {
    tagname: 'div',
    attributes: {
        id: 'first',
        'data-id': 'first',
        'class': 'primary'
    },
    text: 'Hello, love you'
};

function makeElement(el) {
    const element = document.createElement(el.tagname);
    for (const key in el.attributes) {
        element.setAttribute(key, el.attributes[key]);
    }
    element.textContent = el.text;
    return element;
}

console.log(makeElement(obj));