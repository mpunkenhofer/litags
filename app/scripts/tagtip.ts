import {User} from "./user";
import {Selectors} from "./selectors";

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
            let backgroundColorElement = document.querySelector(Selectors.moves);
            if(backgroundColorElement) {
                const style = getComputedStyle(backgroundColorElement);
                element.style.background = style.backgroundColor;
            }

            element.innerHTML = this.html;
            element.style.top = `${y - 5}px`;
            element.style.left = `${x - 20}px`;
            element.style.right = element.style.bottom = "auto";
        }
    }

    getTagTipElement() {
        return document.getElementById('litags-tagtip');
    }

    hideTagTipElement() {
        const element = this.getTagTipElement();
        if (element)
            element.style.display = 'none';
    }

    getTagTipInputElement() {
        return document.getElementById('litags-tagtip-search');
    }
}
