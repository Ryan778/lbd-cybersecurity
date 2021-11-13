let page; 

function $(id) {
  if (id.slice(0, 1) === '#') {
    return document.querySelector(id); 
  }
  return document.querySelectorAll(id); 
}

/**
 * Fades in/out the specified element. 
 * @param {object} ele - target element
 * @param {boolean} mode - 1 to show, 0 to hide (default)
 */
async function fade(ele, mode=0, reverse=0) {
  return new Promise(r => {
    if (mode) {
      ele.style.display = 'block'; 
      ele.style.animation = `0.4s 1 ${reverse?'reverse':'normal'} fade-in`; 
      setTimeout(() => {
        ele.style.animation = ''; 
        r(); 
      }, 400); 
    } else {
      ele.style.animation = `0.4s 1 ${reverse?'reverse':'normal'} fade-out`; 
      setTimeout(() => {
        ele.style.animation = ''; 
        ele.style.display = 'none'; 
        r(); 
      }, 400); 
    }
  });
}

/**
 * Transitions one page to another
 * @param {object} src - source element (to fade)
 * @param {object} dest - destination element (to show)
 */
function transition(src, dest) {
  fade(src, 0).then(() => {
    fade(dest, 1); 
  }); 
}

function init() {
  page = $('#div-landing'); 
  fade(page, 1); 
  $('.action').forEach(e => {
    e.onclick = function() {
      let dest = $(`#${e.dataset.target}`); 
      transition(page, dest); 
      page = dest; 
    }
  });
}

window.onload = init; 