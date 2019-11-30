import {User} from "../user/user";
import {selectors} from "../constants/selectors";
import {SortableEvent} from "sortablejs";
import {createTagElement, getTagsFromId} from "../tag/tag";

const Sortable = require('sortablejs');

export class List {
    private user: User;
    private anchor: HTMLElement;
    private list: HTMLElement;
    private listWrap: HTMLElement;
    private trash: HTMLElement;

    constructor(anchor: HTMLElement, user: User) {
        if (!user || !anchor)
            throw new TypeError('invalid user or anchor.');

        this.anchor = anchor;
        this.user = user;

        // create list
        this.list = document.createElement('ul');
        this.list.id = `${selectors.list.tags}-${this.user.username}`;
        this.list.style.display = 'inline-block';

        let dragGhostElement: HTMLElement;
        // make sortable
        const sortableGroup = selectors.list.sortableGroup;
        Sortable.create(this.list, {
            group: sortableGroup,
            animation: 100,
            onChange: (event: SortableEvent) => {
                getTagsFromId(getTagId(event.item)).then(tag => {
                    event.item.style.color = (tag && tag.color.length > 0) ? tag.color : '';
                });
                this.showTrash()
            },
            onChoose: () => this.showTrash(),
            onUnchoose: () => this.hideTrash(),
            setData: (dataTransfer: DataTransfer, draggedElement: HTMLElement) => {
                // Create the clone (with content)
                dragGhostElement = <HTMLElement>draggedElement.cloneNode(true);
                // Stylize it
                dragGhostElement.classList.add(selectors.list.hiddenDragGhost);
                // Place it into the DOM tree
                document.body.appendChild(dragGhostElement);
                // Set the new stylized "drag image" of the dragged element
                dataTransfer.setDragImage(dragGhostElement, 0, 0);
            },
            // Don't forget to remove the ghost DOM object when done dragging
            onEnd: () => dragGhostElement.parentNode.removeChild(dragGhostElement),
            onUpdate: () => {
                const newOrder = [];
                for (let i = 0; i < this.list.children.length; i++) {
                    newOrder.push(getTagId(this.list.children[i]))
                }
                this.user.reArrange(newOrder);
            }
        });

        //create remove element
        const trashList = document.createElement('ul');
        trashList.className = selectors.list.trash;
        this.trash = document.createElement('li');
        this.trash.id = selectors.list.trashSymbol;
        this.trash.innerText = 'L';
        // create trash bin
        Sortable.create(trashList, {
            sort: false,
            group: sortableGroup,
            animation: 100,
            onAdd: (event: SortableEvent) => {
                const element = event.item;
                this.user.removeTag(getTagId(element));
                element.parentElement.removeChild(element);
                this.update();
            },
            onChange: (event: SortableEvent) => {
                event.item.style.color = 'red';
                this.hideTrash();
            }

        });

        trashList.append(this.trash);

        // create wrappers
        this.listWrap = document.createElement('div');
        this.listWrap.className = selectors.list.main;
        this.listWrap.append(this.list);
        this.listWrap.append(trashList);

        this.anchor.append(this.listWrap);

        this.update();
        this.hide();
    }

    public update() {
        if (this.user.tags.length > 0) {
            this.list.innerHTML = '';

            for (const tag of this.user.tags) {
                const tagElement =
                    createTagElement(tag, 'li', `${selectors.list.tag}-${tag.id}`);
                this.list.append(tagElement);
            }

            this.hideTrash();
            this.show();
        } else {
            this.hide();
        }
    }

    public show() {
        if (this.user.tags.length > 0) {
            this.listWrap.style.display = 'block';
        }
    }

    public hide() {
        this.listWrap.style.display = 'none';
        this.hideTrash();
    }

    private showTrash() {
        this.trash.style.display = 'inline-block';
    }

    private hideTrash() {
        this.trash.style.display = 'none';
    }
}

function getTagId(element: Element) {
    const stringID = element.className.match(/\d+/g);
    return stringID.length > 0 ? Number(stringID) : -1;
}
