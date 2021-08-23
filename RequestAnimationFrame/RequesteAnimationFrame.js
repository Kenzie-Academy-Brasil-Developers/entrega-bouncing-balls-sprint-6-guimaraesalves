const element = document.getElementById('test1');
let start, previousTimeStamp;

function step(timestamp) {
  if (start === undefined)
    start = timestamp;
  const elapsed = timestamp - start;

  if (previousTimeStamp !== timestamp) {
    // Math.min() is used here to make sure the element stops at exactly 200px
    const count = Math.min(0.1 * elapsed, 400);
    //const count2 = Math.min(0.1 * elapsed, 100)
    element.style.transform = 'translateX(' + count + 'px)';
    //element.style.transform = 'translateY(' + count2 + 'px)';
  }

  if (elapsed < 4000) { // Stop the animation after 2 seconds
    previousTimeStamp = timestamp
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);