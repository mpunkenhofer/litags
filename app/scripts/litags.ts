import {TagTip} from "./tagtip";
import {Selectors} from "./selectors";

const Sortable = require('sortablejs');
const browser = require("webextension-polyfill/dist/browser-polyfill.min");

require('../styles/font.scss');
require('../styles/layout.scss');
require('../styles/styles.scss');

class LiTags {
  private options = {};
  private tagTip: TagTip;

  constructor() {
    //this.tagTip = new TagTip();

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

    if (element && false /* TODO REMOVE FALSE*/) {
      let header = document.querySelector(Selectors.header + ' span');
      if (!header || !header.parentElement || !header.parentElement.innerText)
        return;

      // Get rid of title
      const nameWithTitle = header.parentElement.innerText.split(/(\s+)/);

      if(!nameWithTitle)
        return;

      const username = nameWithTitle[nameWithTitle.length - 1];
      this.createLiTagsElements(element, username);
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
  }

  createAddTagButton(anchor: Element, username: string) {
    // if(!this.tagTip)
    //   this.tagTip = new TagTip();
    // TODO: fix tagtip
    const button = document.createElement('div');
    button.setAttribute('class', 'litags-addtag-button-wrap');
    const button_title = browser.i18n.getMessage("appAddTagButtonTitle");
    button.innerHTML = `<button class="litags-addtag-button" title="${button_title}">O</button>`;
    // button.addEventListener('click', (ev) => {
    //   this.tagTip.showTagTipElement(ev.clientX, ev.clientY, null)
    // });
    anchor.append(button);
  }

  static checkForAnchor() : boolean {
    return document.querySelector(Selectors.app) != null ||
        document.querySelector(Selectors.header) != null;
  }
}

console.log('LiTags is open source! https://github.com/mpunkenhofer/litags');

// if(LiTags.checkForAnchor())
//   new LiTags();
// else
//   console.log('LiTags found no supported anchors on this page.');
//
// function onGot(item) {
//   console.log(item);
// }
//
// function onError(error: string) {
//   console.log(`Error: ${error}`);
// }
// //
// let gettingItem = browser.storage.sync.get();
// gettingItem.then(onGot, onError);
// //
// // browser.storage.local.clear();
// //
// // browser.storage.local.set({tta: defaultTags});
// //
//
// browser.storage.sync.getBytesInUse().then((num: string) => {
//   console.log(`Bytes in use: ${num}`);
// });
//
// console.log('all done!');
