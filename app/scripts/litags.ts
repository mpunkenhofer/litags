import {User} from "./user";

const Sortable = require('sortablejs');

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/style.scss');

class LiTags {
  private options = {};

  constructor(element: Element) {
    if(element.matches('.round__app')) {
      new MutationObserver((mutations, observerInstance) => {
        let top = document.querySelector('.ruser-top');
        let bot = document.querySelector('.ruser-bottom');

        this.createAddTagButton(top, top.textContent);
        this.createTagList(top, top.textContent);

        this.createAddTagButton(bot, bot.textContent);
        this.createTagList(bot, bot.textContent);
      }).observe(element, {childList: true, attributes: true, subtree: true, characterData: true});
    } else if (element.matches('.box__top')) {
      let header = document.querySelector('.box__top span');
      if (!header || !header.parentElement || !header.parentElement)
        return;

      // Get rid of title
      const nameWithTitle = header.parentElement.innerText.split(/(\s+)/);

      if(!nameWithTitle)
        return;

      const username = nameWithTitle[nameWithTitle.length - 1];

      this.createAddTagButton(element, username);
      this.createTagList(element, username);
    }
  }

  createTagList(anchor: Element, username: string) {
    if(!anchor || !username)
      return;

    console.log('Litags creating tag list...');
  }

  createAddTagButton(anchor: Element, username: string) {
    if(!anchor || !username)
      return;

    anchor.insertAdjacentHTML('beforeend', '<div class="litags-addtag-button">+</div>');
    console.log('Litags creating add tag button...');
  }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

const app_element = document.querySelector('.round__app');
const header_element = document.querySelector('.box__top');

if(app_element)
  new LiTags(app_element);
else if(header_element)
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


