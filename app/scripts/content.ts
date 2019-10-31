require('../styles/content-style.scss');
require('jquery');
require('jquery-ui');

console.log('Hello from content.ts!1');
// @ts-ignore
console.log(`jquey.ui.version: ${jQuery.ui.version}`);

const elements = document.getElementsByClassName('ruser');

if (elements.length <= 0) {
  console.log('No user elements found on this page!');
} else {
  new MutationObserver((mutations, observerInstance) => {
    observerInstance.disconnect();
    document.querySelector('.ruser-top').insertAdjacentHTML('beforeend',
      '<div class="litags-addtag-button">+</div><div class="litags-tags">Top</div>');
    document.querySelector('.ruser-bottom').insertAdjacentHTML('beforeend',
      '<div class="litags-addtag-button">+</div>' +
        '<div class="litags-tags">' +
        '<ul id="litags-tag-list">' +
        '<li>A0</li>' +
        '<li>B0</li>' +
        '<li>C0</li>' +
        '<li>D0</li>' +
        '<li>E0</li>' +
        '</ul>' +
        '</div>');

    // @ts-ignore
    $('#litags-tag-list').sortable();
    // @ts-ignore
    $('#litags-tag-list').disableSelection();
  }).observe(document.querySelector('.round__app'),
    {childList: true, attributes: true, subtree: true, characterData: true});
}


