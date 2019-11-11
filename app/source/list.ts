import {User} from "./user";
import {litags} from "./constants";
import {SortableEvent} from "sortablejs";

const Sortable = require('sortablejs');

export class List {
    private user: User;
    private anchor: HTMLElement;
    private list: HTMLElement;
    private trash: HTMLElement;

    constructor(anchor: HTMLElement, user: User) {
        if (!user || !anchor)
            throw new TypeError('invalid user or anchor.');

        this.anchor = anchor;
        this.user = user;

        // create wrapper
        const wrapperElement = document.createElement('div');
        wrapperElement.className = litags.selectors.list.main;

        // create list
        this.list = document.createElement('ul');
        this.list.id = `${litags.selectors.list.tags}-${user.username}`;
        // make sortable
        const sortableGroup = 'lt-tags-sortable';
        Sortable.create(this.list, {
            group: sortableGroup,
            onChange: () => this.showTrash(),
            onChoose: () => this.showTrash(),
            onUnchoose: () => this.hideTrash()
        });

        //create remove element
        const trashList = document.createElement('ul');
        trashList.className = `${litags.selectors.list.trash}`;
        this.trash = document.createElement('li');
        this.trash.id = litags.selectors.list.trashSymbol;
        this.trash.innerText = 'L';
        // create trash bin
        Sortable.create(trashList, {
            sort: false,
            group: sortableGroup,
            onAdd: (event: SortableEvent) => {
                const element = event.item;
                this.user.removeTag(Number(element.id));
                element.parentElement.removeChild(element);
            },
            onChange: () => this.hideTrash()
        });

        trashList.append(this.trash);

        wrapperElement.append(this.list);
        wrapperElement.append(trashList);

        this.anchor.append(wrapperElement);

        this.update();
        this.hide();
    }

    public update() {
        if (this.user.tags.length > 0) {
            this.list.innerHTML = '';

            for (const tag of this.user.tags) {
                const listElement = document.createElement('li');
                listElement.title = tag.name;
                listElement.innerHTML = tag.symbol;
                listElement.id = `${tag.id}`;
                this.list.append(listElement);
            }

            this.hideTrash();
            this.show();
        }
    }

    public show() {
        if (this.user.tags.length > 0) {
            const wrappers = document.getElementsByClassName(litags.selectors.list.main);

            for (let i = 0; i < wrappers.length; i++) {
                const element = <HTMLScriptElement>wrappers[i];
                element.style.display = 'block';
            }

            this.list.style.display = 'inline-block';
        }
    }

    public hide() {
        const wrappers = document.getElementsByClassName(litags.selectors.list.main);

        for (let i = 0; i < wrappers.length; i++) {
            const element = <HTMLScriptElement>wrappers[i];
            element.style.display = 'none';
        }

        this.list.style.display = 'none';
    }

    private showTrash() {
        this.trash.style.display = 'inline-block';
    }

    private hideTrash() {
        this.trash.style.display = 'none';
    }
}