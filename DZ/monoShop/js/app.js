'use strict';

const nokia = {
    id: 1,
    cost: 239,
    name: 'Nokia 106',
    imgUrl: '',
};

const order = {
    id: 1,
    productId: nokia.id,
    qty: 1,
    productCost: 239,
};

const productNameEl = document.querySelector('[data-id="product-name"]');
const productCostEl = document.querySelector('[data-id="product-cost"]');
const productQuantityEl = document.querySelector('[data-id="qty"]');
const incrementEl = document.querySelector('[data-action="inc"]');
const decrementEl = document.querySelector('[data-action="dec"]');
const totalCostEl = document.querySelector('[data-id="total"]');
const messageEl = document.querySelector('[data-id="message"]');
const maxQty = 10;
const minQty = 1;

productNameEl.textContent = nokia.name;
productCostEl.textContent = order.productCost + ' с.';
productQuantityEl.textContent = order.qty;
totalCostEl.textContent = order.productCost + ' с.';

incrementEl.onclick = () => {
    if (order.qty < maxQty) {
        order.qty++;
        productQuantityEl.textContent = order.qty;

        totalCostEl.textContent = order.productCost * order.qty + ' с.';

        messageEl.textContent = '';
    } else {
        messageEl.textContent = '10 шт - максимум в одни руки';
    }
};

decrementEl.onclick = () => {
    if (order.qty > minQty) {
        order.qty--;
        productQuantityEl.textContent = order.qty;
        
        totalCostEl.textContent = order.productCost * order.qty + ' с.';

        messageEl.textContent = '';
    } else {
        messageEl.textContent = '1 шт - минимальный размер заказа';
    }
};