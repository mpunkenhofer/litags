import {User} from "./user";
import {Selectors} from "./selectors";
import {Tag} from "./tag";

export class TagTip {
    // language=HTML
    private html = `
        <div class="litags-tagtip-list">
            <div id="litags-tagtip-freq-used-wrap">
                <div class="litags-tagtip-title">Frequently Used</div>
                <div id="litags-tagtip-freq-used"></div>
            </div>
            <div id="litags-tagtip-all-wrap">
                <div class="litags-tagtip-title">Available Tags</div>
                <div id="litags-tagtip-all"></div>
            </div>
        </div>
        <div class="litags-tagtip-search-wrap">
           <label for="litags-tagtip-search"></label><input type="search" id="litags-tagtip-search">
        </div>`;

    constructor() {
        // add tagtip element to dom
        document.body.innerHTML += '<div id="litags-tagtip"></div>';
        const element = TagTip.getTagTipElement();

        if (!element)
            return;

        element.addEventListener('mouseleave', ev => {
            this.hide();
        });
    }

    show(x: number, y: number, user: User) {
        const element = TagTip.getTagTipElement();
        if (element) {
            element.innerHTML = this.html;
            this.colorize(element);

            const all_element = TagTip.getTagTipAllElement();
            //this.hideTagTipFreqUsedElement();
            if(all_element) {
                Tag.getAvailable()
                    .then(tags => {
                        for(const tag of tags) {
                            all_element.insertAdjacentHTML('beforeend',
                                `<div class="litags-tagtip-tag" title="${tag.name}"><span>${tag.symbol}</span></div>`);
                        }
                    })
                    .catch(error => console.log(error));
            }

            element.style.display = 'block';
            this.calculateViewPositions(x, y, 10, element);
        }
    }

    public hide() {
        const element = TagTip.getTagTipElement();
        if (element)
            element.style.display = 'none';
    }

    private colorize(element: HTMLElement) {
        let backgroundColorElement = document.querySelector(Selectors.appTable);
        if(backgroundColorElement) {
            const style = getComputedStyle(backgroundColorElement);
            element.style.background = style.background;
        }
    }

    private calculateViewPositions(clientX: number, clientY: number, constant: number = 0, element: HTMLElement) {
        let newX = clientX;
        let newY = clientY;

        function calc() {
            if((clientY + element.offsetHeight + constant) > window.innerHeight)
                newY = clientY - ((clientY + element.offsetHeight + constant) - window.innerHeight);

            if((clientX + element.offsetWidth + constant) > window.innerWidth)
                newX = clientX - ((clientX + element.offsetWidth + constant) - window.innerWidth);

            element.style.right = element.style.bottom = "auto";
            element.style.top = `${newY - 5}px`;
            element.style.left = `${newX - 20}px`;
        }

        // position the element initially
        calc();

        // observe the dom - the element has the correct dimensions only after the css has been applied - recalculate
        new MutationObserver((mutations, observerInstance) => {
            observerInstance.disconnect();
            calc();
        }).observe(element,{childList: true, attributes: true, subtree: true, characterData: true});
    }

    private static getTagTipElement() {
        return document.getElementById(Selectors.tagTip);
    }

    private static getTagTipSearchElement() {
        return document.getElementById(Selectors.tagTipSearch);
    }

    private static getTagTipFreqUsedElement() {
        return document.getElementById(Selectors.tagTipFreqUsed);
    }

    private static hideTagTipFreqUsedElement() {
        const element = document.getElementById(Selectors.tagTipFreqUsedWrap);
        if (element)
            element.style.display = 'none';
    }

    private static getTagTipAllElement() {
        return document.getElementById(Selectors.tagTipAll);
    }
}
