let page, practice = true; 

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
  fade($('#div-infobox'), 0);
  fade(src, 0).then(() => {
    fade(dest, 1); 
  }); 
}

function init() {
  page = $('#div-landing'); 
  fade(page, 1); 

  // Add feedback to clicking on policy lines
  $('.div-policy-inner p:not(.hl-exclude)').forEach(ele => {
    let targetStrings = ele.innerHTML.replace(/\<span .+\>/, '').split('.').map(r => r.trim()).slice(0, -1); 
    for (let str of targetStrings) {
      str += '.';
      ele.innerHTML = ele.innerHTML.replace(str, `<span class='policy-benign action-info' data-onetime='1' data-msg='This sentence looks fine.'>${str}</span>`);
    }
  });

  $('.action').forEach(e => {
    e.onclick = function() {
      if ($('#a-reset').style.opacity === '0') {
        $('#a-reset').style.opacity = '' }
      let dest = $(`#${e.dataset.target}`); 
      transition(page, dest); 
      page = dest; 
    }
  });

  $('.action-info').forEach(e => {
    e.onclick = function() {
      if (e.tagName === 'BUTTON') {
        e.disabled = true;
      } else if (e.tagName === 'SPAN') {
        if (e.dataset.onetime) {
          e.style.opacity = 0.4;
        } else {
          e.style.color = `var(--emphasis-alt-2)`;
        }
      }
      let msg = e.dataset.msg; 
      $('#div-infobox').firstElementChild.innerText = msg; 
      fade($('#div-infobox'), 1);
    }
  });

  $('#btn-closeInfobox').addEventListener('click', () => {
    fade($('#div-infobox'), 0);
  });

  $('.policy-flag').forEach(e => {
    e.onclick = function() {
      fade($('#div-infobox'), 0);
      e.classList.add('emphasized'); 
      $('#div-popup').style.left = `${window.innerWidth/2 + 350}px`; 
      $('#div-popup').style.top = (e.offsetTop + (e.offsetHeight/2) - 70)  + 'px'; 
      setTimeout(() => {
        fade($('#div-popup'), 1);
      }, 800);
    }
  });

  $('#btn-policyFound').onclick = function() {
    if (practice) {
      fade(page, 0); 
      practice = false; 
      page = $('#div-instructions-pt2'); 
      transition($('#div-popup'), page);
      return; 
    }

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