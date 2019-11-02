import {User} from "./user";
const Sortable = require('sortablejs');

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/style.scss');

class LiTags {
  private options = {};

  constructor(elements: HTMLCollectionOf<Element>) {
    console.log(elements[0].textContent);
  }

  createTagList(anchor: HTMLCollectionOf<Element>, user: User)
  {

  }

  createAddTagButton(anchor: HTMLCollectionOf<Element>, user: User) {

  }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

const user_elements = document.getElementsByClassName('ruser');
const header_element = document.getElementsByClassName('box__top');

if(user_elements.length > 0)
  new LiTags(user_elements);
else if(header_element.length > 0)
  new LiTags(header_element);
else
  console.log('LiTags found no supported anchors on this page.');

  // new MutationObserver((mutations, observerInstance) => {
  //   observerInstance.disconnect();
  //   const litags_test_html =
  //       '<div class="litags-addtag-button">+</div>' +
  //       '<div class="litags-tags">' +
  //       '<ul id="litags-tag-list">' +
  //       '<li title="Emote1">A</li>' +
  //       '<li>0</li>' +
  //       '<li>1</li>' +
  //       '<li>2</li>' +
  //       '<li>3</li>' +
  //       '</ul>' +
  //       '</div>';
  //   //document.querySelector('.ruser-top').insertAdjacentHTML('beforeend', litags_test_html);
  //   document.querySelector('.ruser-bottom').insertAdjacentHTML('beforeend', litags_test_html);
  //
  //   const litagsLists = document.getElementById('litags-tag-list');
  //   const litagsListSortable = Sortable.create(litagsLists)
  //
  // }).observe(document.querySelector('.round__app'),
  //   {childList: true, attributes: true, subtree: true, characterData: true});


