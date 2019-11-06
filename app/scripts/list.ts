import {User} from "./user";

const Sortable = require('sortablejs');

export class List {
    private user: User;
    private anchor: HTMLElement;
    private list: HTMLElement;

    constructor(anchor: HTMLElement, user: User) {
        if(!user || !anchor)
            throw new TypeError('invalid user or anchor.');

        this.anchor = anchor;
        this.user = user;

        //create list element
        const wrapperElement = document.createElement('div');
        wrapperElement.className = 'lt-tags';

        this.list = document.createElement('ul');
        this.list.id = `lt-tags-list-${user.username}`;
        Sortable.create(this.list);

        wrapperElement.append(this.list);
        this.anchor.append(wrapperElement);

        this.hide();
    }

    public update() {
        if(this.user.tags.length > 0) {
            this.list.innerHTML = '';
            this.list.style.display = 'block';

            for(const tag of this.user.tags) {
                const listElement = document.createElement('li');
                listElement.title = tag.name;
                listElement.innerHTML = tag.symbol;
                this.list.append(listElement);
            }
        }
    }

    public show() {
        this.update();
        this.list.style.display = 'block';
    }

    public hide() {
        this.list.style.display = 'none';
    }
}