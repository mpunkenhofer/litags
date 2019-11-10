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
        //L = X

        wrapperElement.append(this.list);
        this.anchor.append(wrapperElement);

        this.update();
        this.hide();
    }

    public update() {
        if(this.user.tags.length > 0) {
            this.list.innerHTML = '';

            for(const tag of this.user.tags) {
                const listElement = document.createElement('li');
                listElement.title = tag.name;
                listElement.innerHTML = tag.symbol;
                this.list.append(listElement);
            }

            this.show();
        }
    }

    public show() {
        if(this.user.tags.length > 0) {
            const wrappers = document.getElementsByClassName('lt-tags');

            for (let i = 0; i < wrappers.length; i++) {
                const element = <HTMLScriptElement>wrappers[i];
                element.style.display = 'block';
            }

            this.list.style.display = 'block';
        }
    }

    public hide() {
        const wrappers = document.getElementsByClassName('lt-tags');

        for(let i = 0; i < wrappers.length; i++) {
            const element = <HTMLScriptElement>wrappers[i];
            element.style.display = 'none';
        }

        this.list.style.display = 'none';
    }
}