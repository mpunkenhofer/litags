import {User} from "./user";
import {TagTip} from "./tagtip";
import {Selectors} from "./selectors";

const Sortable = require('sortablejs');

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/styles.scss');

class LiTags {
  private options = {};
  private tagTip: TagTip;

  constructor() {
    this.tagTip = new TagTip();

    let element = document.querySelector(Selectors.app);

    if(element) {
      new MutationObserver((mutations, observerInstance) => {
        observerInstance.disconnect();

        let top = document.querySelector(Selectors.userTop);
        let bot = document.querySelector(Selectors.userBot);

        this.createLiTagsElements(top, top.textContent);
        this.createLiTagsElements(bot, bot.textContent);
      }).observe(element,{childList: true, attributes: true, subtree: true, characterData: true});

      return;
    }

    element = document.querySelector(Selectors.header);

    if (element && false) {
      let header = document.querySelector(Selectors.header + ' span');
      if (!header || !header.parentElement || !header.parentElement)
        return;

      // Get rid of title
      const nameWithTitle = header.parentElement.innerText.split(/(\s+)/);

      if(!nameWithTitle)
        return;

      const username = nameWithTitle[nameWithTitle.length - 1];

      this.createAddTagButton(element, username);
      this.createTagList(element, username);

      return;
    }
  }

  createLiTagsElements(anchor: Element, username: string) {
    console.log(`Litags creating elements for user: ${username}`);

    if(!anchor || !username)
      return;

    this.createAddTagButton(anchor, username);
  }

  createTagList(anchor: Element, username: string) {


  }

  createAddTagButton(anchor: Element, username: string) {
    const button = document.createElement('div');
    button.setAttribute('class', 'litags-addtag-button-wrap');
    button.innerHTML = '<button class="litags-addtag-button" title="__MSG_appAddTagButtonTitle__">O</button>';
    button.addEventListener('click', (ev) => {
      this.tagTip.showTagTipElement(ev.clientX, ev.clientY, null);
    });
    //button.addEventListener('mouseout', (ev => this.tagTip.hideTagTipElement()));
    anchor.append(button);
  }

  static checkForAnchor() : boolean {
    return document.querySelector(Selectors.app) != null ||
        document.querySelector(Selectors.header) != null;
  }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

if(LiTags.checkForAnchor())
  new LiTags();
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


