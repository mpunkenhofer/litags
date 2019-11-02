import tags from "./configs/tags.config";


export class TagTip {
    // language=HTML
    private html = `
    <div id="litags-tagtip">
        <div class="litags-tag-list">
            <div class="litags-tags-wrap">
                <div class="litags-tags-title">Frequently Used</div>
                <div id="litags-tag-freq-used"></div>
            </div>
            <div class="litags-tags-wrap">
                <div class="litags-tags-title">Available Tags</div>
                <div id="litags-tags-all"></div>
            </div>
        </div>
        <div class="litags-tag-search-wrap">
            <label for="litags-tag-search"></label><input type="text" id="litags-tag-search">
        </div>
    </div>`;

    constructor() {

    }
}

console.log('hello1');

