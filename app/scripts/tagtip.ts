import {User} from "./user";
import {Selectors} from "./selectors";
import {Storage} from "./storage";
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
            let backgroundColorElement = document.querySelector(Selectors.appTable);
            if(backgroundColorElement) {
                const style = getComputedStyle(backgroundColorElement);
                element.style.background = style.background;
            }
            element.innerHTML = this.html;

            const all_element = this.getTagTipAllElement();
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

    calculateViewPositions(clientX: number, clientY: number, constant: number = 0, element: HTMLElement) {
        let newX = clientX;
        let newY = clientY;

        function calc() {
            if((clientY + element.offsetHeight + constant) > window.innerHeight)
                newY = clientY - ((clientY + element.offsetHeight + constant) - window.innerHeight);

            if((clientX + element.offsetWidth + constant) > window.innerWidth)
                newX = clientX - ((clientX + element.offsetWidth + constant) - window.innerWidth);

            console.log(`oy: ${clientY} ox: ${clientX}`);
            console.log(`ny: ${newY} nx: ${newX}`);
            console.log(`ww: ${window.innerWidth} wh: ${window.innerHeight}`);
            console.log(`ew: ${element.offsetWidth} eh: ${element.offsetHeight}`);

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
        const element = document.getElementById(Selectors.tagTipFreqUsedWrap);
        if (element)
            element.style.display = 'none';
    }

    getTagTipAllElement() {
        return document.getElementById(Selectors.tagTipAll);
    }
}
