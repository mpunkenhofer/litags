// import {selectors} from "../constants/selectors";
// import {storageService} from "../util/storage";
// import {ID} from "../util/id";
// import {TagSet} from "../tag/tag-set";
// import {createSortDirection} from "./elements/sortby";
// import {showConfirmModal} from "./elements/modal";
// import {createTagElement, FontTag, IconTag, searchTags, sortByName, Tag} from "../tag/tag";
//
// const browser = require("webextension-polyfill");
// const Sortable = require('sortablejs');
// const debounce = require('debounce-promise');
//
// export function displayTags() {
//     const content = document.getElementById(selectors.options.content);
//     if (!content)
//         return;
//     content.innerHTML = '';
//
//     const wrap = document.createElement('div');
//     wrap.className = selectors.options.tags.wrappers.main;
//
//     const listHeader = document.createElement('div');
//     listHeader.className = selectors.options.tags.setListHeader;
//     listHeader.innerText = browser.i18n.getMessage("tagSets");
//
//     const listWrap = document.createElement('div');
//     listWrap.className = selectors.options.tags.wrappers.setList;
//
//     const setList = createSetList();
//
//     listWrap.append(listHeader);
//     listWrap.append(setList);
//
//     wrap.append(listWrap);
//
//     const setDetails = document.createElement('div');
//     setDetails.id = selectors.options.tags.details;
//
//     wrap.append(setDetails);
//
//     content.append(wrap);
// }
//
// function createSetList() {
//     const list = document.createElement('ul');
//     list.id = selectors.options.tags.setList;
//     storageService.getTagSets().then(sets => {
//         let dragGhostElement: HTMLElement;
//         Sortable.create(list, {
//             animation: 100,
//             setData: (dataTransfer: DataTransfer, draggedElement: HTMLElement) => {
//                 // Create the clone (with content)
//                 dragGhostElement = <HTMLElement>draggedElement.cloneNode(true);
//                 // Stylize it
//                 dragGhostElement.classList.add(selectors.list.hiddenDragGhost);
//                 // Place it into the DOM tree
//                 document.body.appendChild(dragGhostElement);
//                 // Set the new stylized "drag image" of the dragged element
//                 dataTransfer.setDragImage(dragGhostElement, 0, 0);
//             },
//             // Don't forget to remove the ghost DOM object when done dragging
//             onEnd: () => dragGhostElement.parentNode.removeChild(dragGhostElement),
//             onUpdate: () => {
//                 const newOrder = [];
//                 for (let i = 0; i < list.children.length; i++) {
//                     newOrder.push(getSetID(list.children[i]))
//                 }
//                 reArrange(newOrder);
//             },
//             onChoose: event => {
//                 if (event.item) {
//                     storageService.getTagSet(new ID(getSetID(event.item)))
//                         .then(set => displayDetails(set))
//                         .catch(err => console.error(err));
//                 }
//             }
//         });
//
//         for (const set of sets) {
//             const setElement = document.createElement('li');
//             setElement.className = selectors.options.tags.set;
//             setElement.innerText = set.getName();
//             setElement.classList.add(`${selectors.id}-${set.getID().toString()}`);
//             list.append(setElement);
//         }
//
//         if (sets.length > 0)
//             displayDetails(sets[0]);
//     });
//
//     return list;
// }
//
// function reArrange(newOrder: string[]) {
//     console.log(newOrder);
// }
//
// function displayDetails(set: TagSet) {
//     const detailsElement = document.getElementById(selectors.options.tags.details);
//     detailsElement.innerHTML = '';
//
//     const table = <HTMLTableElement>document.createElement('table');
//     table.id = selectors.options.tags.table;
//
//     const header = document.createElement('div');
//     header.className = selectors.options.tags.header;
//
//     const tagCount = document.createElement('div');
//     tagCount.className = selectors.options.tags.count;
//
//     const search = <HTMLInputElement>document.createElement('input');
//     search.className = selectors.options.tags.search;
//     search.autocapitalize = 'off';
//     search.autocomplete = 'off';
//     search.spellcheck = false;
//     search.placeholder = browser.i18n.getMessage("searchTagPlaceholder");
//     search.oninput = e => {
//         const term = (<HTMLInputElement>e.target).value;
//         if (term && term.length > 0) {
//             const searchFunction = debounce(searchTags, 100, {leading: true});
//             searchFunction(term, set.getTags()).then((result: Tag[]) => {
//                 if (!result || result.length < 1)
//                     clearTable(table);
//
//                 createTagsTable(table, result, tagCount, browser.i18n.getMessage('tagsFound'));
//             }).catch(err => console.error(err));
//         } else {
//             createTagsTable(table, set.getTags(), tagCount, browser.i18n.getMessage('tags'));
//         }
//     };
//
//     createTagsTable(table, set.getTags(), tagCount, browser.i18n.getMessage('tags'));
//
//     header.append(tagCount);
//     header.append(search);
//
//     detailsElement.append(header);
//     detailsElement.append(table);
//
//     // tags
// }
//
// function getSetID(element: Element): string {
//     const result = element.className.match(new RegExp(`${selectors.id}-([0-9A-fa-f-]+)`, 'g'));
//     if (result && result.length > 0) {
//         const r = result[0].split(`${selectors.id}-`);
//         return r.length > 0 ? r[1] : '';
//     } else {
//         return '';
//     }
// }
//
// function clearTable(table: HTMLTableElement) {
//     table.innerHTML = '';
// }
//
// function createTagsTable(table: HTMLTableElement, tags: Tag[],
//                          countElement?: HTMLElement, countElementTitle: string = 'Tags') {
//     if (!tags && countElement != undefined)
//         countElement.textContent = `${countElementTitle}: 0`;
//
//     if (countElement != undefined)
//         countElement.textContent = `${countElementTitle}: ${tags.length}`;
//
//     if (tags && tags.length > 0) {
//         createTagTableHeader(tags, table);
//         createTagTableBodyFunction(table)(sortByName(tags));
//     }
// }
//
// function createTagTableHeader(tags: Tag[], table: HTMLTableElement) {
//     if (!tags || tags.length < 1)
//         return;
//
//     if (table.tHead)
//         table.tHead.remove();
//
//     const header = table.createTHead();
//     const headerRow = <HTMLTableRowElement>header.insertRow();
//     const displayFunction = createTagTableBodyFunction(table);
//     // tag
//     headerRow.insertCell(browser.i18n.getMessage('tag'));
//     // name
//     headerRow.insertCell().append(createSortDirection(tags, displayFunction,
//         {label: browser.i18n.getMessage('name'), handler: sortByName}));
//     // aliases
//     headerRow.insertCell().innerText = browser.i18n.getMessage('aliases');
//     // url/color
//     headerRow.insertCell();
//     //remove cell
//     headerRow.insertCell();
// }
//
// function createTagTableBodyFunction(table: HTMLTableElement): (tags: Tag[]) => void {
//     return tags => {
//         if (!tags || tags.length < 1)
//             return;
//
//         if (table.tBodies.length > 0)
//             table.tBodies[0].remove();
//
//         const body = table.createTBody();
//
//         for (const tag of tags) {
//             const newRowElement = <HTMLTableRowElement>body.insertRow();
//             // tag
//             newRowElement.insertCell().append(createTagElement(tag));
//             newRowElement.insertCell().innerText = tag.getName();
//             newRowElement.insertCell().innerText = 'Aliases';
//
//             if (tag instanceof FontTag) {
//                 newRowElement.insertCell().innerText = tag.getColor();
//             } else if (tag instanceof IconTag) {
//                 newRowElement.insertCell().innerText = tag.getURL();
//             }
//
//             const removeButton = document.createElement('div');
//             removeButton.className = selectors.options.users.remove;
//             removeButton.innerHTML = `<span class="${selectors.icons.trash} ${selectors.options.buttonEffect}"></span>`;
//             removeButton.onclick = _ => {
//                 const msg =
//                     browser.i18n.getMessage('deleteTagConfirm').replace('%s', tag.getName());
//                 showConfirmModal(msg, tag.delete.bind(tag));
//             };
//
//             newRowElement.insertCell().append(removeButton);
//         }
//     }
// }
