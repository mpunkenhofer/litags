require('../styles/font.scss');
require('../styles/litags-layout.scss');
require('../styles/litags-style.scss');

const Sortable = require('sortablejs');

console.log('Hello from content.ts!5');

const elements = document.getElementsByClassName('ruser');

if (elements.length <= 0) {
  console.log('No user elements found on this page!');
} else {
  new MutationObserver((mutations, observerInstance) => {
    observerInstance.disconnect();
    const litags_test_html =
        '<div class="litags-addtag-button">+</div>' +
        '<div class="litags-tags">' +
        '<ul id="litags-tag-list">' +
        '<li title="Emote1">A</li>' +
        '<li>0</li>' +
        '<li>1</li>' +
        '<li>2</li>' +
        '<li>3</li>' +
        '</ul>' +
        '</div>';
    //document.querySelector('.ruser-top').insertAdjacentHTML('beforeend', litags_test_html);
    document.querySelector('.ruser-bottom').insertAdjacentHTML('beforeend', litags_test_html);

    const litagsLists = document.getElementById('litags-tag-list');
    const litagsListSortable = Sortable.create(litagsLists)

  }).observe(document.querySelector('.round__app'),
    {childList: true, attributes: true, subtree: true, characterData: true});
}


