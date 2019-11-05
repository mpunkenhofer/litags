import {User} from "./user";
import {Selectors} from "./selectors";
import {Storage} from "./storage";
import {Tag} from "./tag";

export class TagTip {
    // language=HTML
    private html = `
        <div class="litags-tagtip-list">
            <div class="litags-tagtip-wrap">
                <div class="litags-tagtip-title">Frequently Used</div>
                <div id="litags-tagtip-freq-used"></div>
            </div>
            <div class="litags-tagtip-wrap">
                <div class="litags-tagtip-title">Available Tags</div>
                <div id="litags-tagtip-all"></div>
            </div>
        </div>
        <div class="litags-tagtip-search-wrap">
            <label for="litags-tagtip-search"></label><input type="text" id="litags-tagtip-search">
        </div>`;

    constructor() {
        // add tagtip element to dom
        document.body.innerHTML += '<div id="litags-tagtip"></div>';
        const element = this.getTagTipElement();

        if (!element)
            return;

        element.addEventListener('mouseleave', ev => {
            this.hideTagTipElement();
        });
    }

    showTagTipElement(x: number, y: number, user: User) {
        const element = this.getTagTipElement();
        if (element) {
            element.style.display = 'block';
            let backgroundColorElement = document.querySelector(Selectors.appTable);
            if(backgroundColorElement) {
                const style = getComputedStyle(backgroundColorElement);
                element.style.background = style.background;
            }

            element.innerHTML = this.html;
            element.style.top = `${y - 5}px`;
            element.style.left = `${x - 20}px`;
            element.style.right = element.style.bottom = "auto";

            const all_element = this.getTagTipAllElement();

            if(all_element) {
                Tag.getAvailable()
                    .then(tags => {
                        for(const tag of tags) {
                            all_element.insertAdjacentHTML('beforeend',
                                `<div class="litags-tagtip-tag" title="${tag.name}">${tag.symbol}</div>`);
                        }
                    })
                    .catch(error => console.log(error));
            }
        }
    }

    hideTagTipElement() {
        const element = this.getTagTipElement();
        if (element)
            element.style.display = 'none';
    }

    getTagTipElement() {
        return document.getElementById(Selectors.tagTip);
    }

    getTagTipSearchElement() {
        return document.getElementById(Selectors.tagTipSearch);
    }

    getTagTipFreqUsedElement() {
        return document.getElementById(Selectors.tagTipFreqUsed);
    }

    hideTagTipFreqUsedElement() {
        const element = this.getTagTipFreqUsedElement();
        if (element)
            element.style.display = 'none';
    }

    getTagTipAllElement() {
        return document.getElementById(Selectors.tagTipAll);
    }
}
