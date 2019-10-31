require('../styles/content-style.scss');

console.log('Hello from content.ts!12');

const elements = document.getElementsByClassName('ruser');

if (elements.length <= 0) {
  console.log('No user elements found on this page!');
} else {
  new MutationObserver((mutations, observerInstance) => {
    observerInstance.disconnect();
    /*document.querySelector('.ruser-top').insertAdjacentHTML('afterend',
      '<div class="litags-ruser-top ruser">Top</div>');
    document.querySelector('.ruser-bottom').insertAdjacentHTML('afterend',
      '<div class="litags-ruser-bottom ruser">Bot</div>');*/
    document.querySelector('.ruser-top').insertAdjacentHTML('beforeend',
      '<div class="litags-area">Top</div>');
    document.querySelector('.ruser-bottom').insertAdjacentHTML('beforeend',
      '<div class="litags-area">Bot</div>');
  }).observe(document.querySelector('.round__app'),
    {childList: true, attributes: true, subtree: true, characterData: true});
}


