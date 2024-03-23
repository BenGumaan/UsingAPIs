'use strict';

const STEP_SIZE_PX = 10;
const STEP_INTERVAL_MS = 50;
const DANCE_TIME_MS = 5000;
const WALKING_CAT_URL = 'http://www.anniemation.com/clip_art/images/cat-walk.gif';
const DANCING_CAT_URL = 'https://media1.tenor.com/images/2de63e950fb254920054f9bd081e8157/tenor.gif';
let motionTimer = null;
  

function walk(img, startPos, stopPos) {
  return new Promise((resolve) => {
    
    motionTimer = setInterval(() => {
        startPos += STEP_SIZE_PX;
        img.style.left = `${startPos}px`;
        if (startPos > stopPos) {
            clearInterval(motionTimer);
            resolve("The cat has walked from `startPos` to `stopPos`.");
        }
    }, STEP_INTERVAL_MS);

  });
}

function dance(img) {
  return new Promise((resolve) => {

      img.src = DANCING_CAT_URL;
      setTimeout(() => {
        img.src = WALKING_CAT_URL;
        resolve("The cat danced for 5 secs.");
      }, DANCE_TIME_MS);
  });
}

async function catWalk() {
    const img = document.querySelector('img');
    const startPos = -img.width;
    const centerPos = (window.innerWidth - img.width) / 2;
    const stopPos = window.innerWidth;

    try {
      await walk(img, startPos, centerPos);
      await dance(img);
      await walk(img, centerPos, stopPos)
      await catWalk();
    } catch (error) {
      console.log('Oops, something went wrong!', error);
    }
}

window.addEventListener('load', catWalk);