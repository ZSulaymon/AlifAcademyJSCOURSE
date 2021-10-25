'use strict';

function thanosEffect(el) {
  const list = el.querySelectorAll('[data-type="post"]');

  const listEl = Array.from(list);
  listEl.filter((item, index) => index % 2 == 0).forEach(function (item) {
    item.style.visibility = 'hidden';

  });
}
const postsEl = document.querySelector('[data-id="posts"]');

thanosEffect(postsEl);