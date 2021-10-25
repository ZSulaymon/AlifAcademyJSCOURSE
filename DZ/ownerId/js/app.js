'use strict';
function extractOwnerId(postId) {
  const ownerId = document.querySelector('[data-id="'+ postId + '"]');

  //const ownerId = document.querySelector('[data-id="${postId}"]');


  const res = ownerId.dataset.ownerid;
  return res;

}

 
extractOwnerId(24234);

