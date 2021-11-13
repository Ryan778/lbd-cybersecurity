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
  $('.policy-flag').forEach(e => {
    e.onclick = function() {
      e.style.backgroundColor = 'var(--emphasis)'; 
      $('#div-popup').style.left = `${window.innerWidth/2 + 350}px`; 
      $('#div-popup').style.top = (e.offsetTop + (e.offsetHeight/2) - 70)  + 'px'; 
      setTimeout(() => {
        fade($('#div-popup'), 1);
      }, 800);
    }
  });

  $('#btn-policyFound').onclick = function() {
    fade($('#div-popup'), 0).then(() => {fade(page, 0)}).then(() => {
      let root = $(':root')[0];
      let css = getComputedStyle(root);
      root.style.setProperty('--background', css.getPropertyValue('--accent-1')); 
      setTimeout(() => {
        root.style.setProperty('--accent-1', css.getPropertyValue('--text-color')); 
        root.style.setProperty('--accent-1-hover', css.getPropertyValue('--text-color')); 
        // root.style.setProperty('--accent-2', css.getPropertyValue('--accent-2')); 
        root.style.setProperty('--accent-3', css.getPropertyValue('--accent-2')); 
        root.style.setProperty('--text-color', css.getPropertyValue('--background')); 
        page = $('#div-policyDetails'); 
        fade(page, 1); 
      }, 1200);
    }); 
  }
}

window.onload = init; 