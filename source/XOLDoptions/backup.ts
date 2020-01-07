import {selectors} from "../constants/selectors";
import {createToggle} from "./elements/toggle";
import {exportBackup, importBackup} from "../util/backup";
import {setOptionFactory} from "./options";

const browser = require("webextension-polyfill");

export function displayBackup() {
    const content = document.getElementById(selectors.options.content);
    if (!content)
        return;

    content.innerHTML = `<h1>${browser.i18n.getMessage("backup")}</h1>`;

    const backupElement = document.createElement('div');
    backupElement.className = selectors.options.backup.wrapper;

    const exportElement = document.createElement('div');
    exportElement.className = selectors.options.backup.export;
    const importElement = document.createElement('div');
    importElement.className = selectors.options.backup.import;

    const exportTitle = document.createElement('span');
    exportTitle.className = selectors.options.headerSecondary;
    exportTitle.innerHTML = browser.i18n.getMessage("export");

    exportElement.append(exportTitle);

    exportElement.append(createToggle(setOptionFactory('exportOptions', 'users'), '',
            browser.i18n.getMessage("users")));
    exportElement.append(createToggle(setOptionFactory('exportOptions', 'sets'), '',
            browser.i18n.getMessage("tagSets")));
    exportElement.append(createToggle(setOptionFactory('exportOptions', 'frequentlyUsed'), '',
            browser.i18n.getMessage("frequentlyUsedTags")));
    exportElement.append(createToggle(setOptionFactory('exportOptions', 'settings'), '',
            browser.i18n.getMessage("settings")));

    const importTitle = document.createElement('span');
    importTitle.className = selectors.options.headerSecondary;
    importTitle.innerHTML = browser.i18n.getMessage("import");

    importElement.append(importTitle);

    importElement.append(createToggle(setOptionFactory('importOptions', 'users'), '',
            browser.i18n.getMessage("users")));
    importElement.append(createToggle(setOptionFactory('importOptions', 'sets'), '',
            browser.i18n.getMessage("tagSets")));
    importElement.append(createToggle(setOptionFactory('importOptions', 'frequentlyUsed'), '',
            browser.i18n.getMessage("frequentlyUsedTags")));
    importElement.append(createToggle(setOptionFactory('importOptions', 'settings'), '',
            browser.i18n.getMessage("settings")));


    const exportButton = document.createElement('button');
    exportButton.innerText = browser.i18n.getMessage("export");
    exportButton.onclick = _ => exportBackup().then(backup => {
        const a = document.createElement('a');
        a.download = `litags-backup-${new Date().getTime()}`;
        a.href = URL.createObjectURL(new Blob([backup], {type: 'application/json'}));
        a.onload = _ => URL.revokeObjectURL(a.href);
        a.click();
    }).catch(err => console.error(err));

    const importButton = <HTMLInputElement>document.createElement('input');
    importButton.innerText =  browser.i18n.getMessage("import");
    importButton.type = 'file';
    importButton.accept = '.json';
    importButton.onchange = (ev) => {
        const f = (<HTMLInputElement>ev.target).files[0];
        if (f) {
            const reader = new FileReader();
            reader.onload = (e) => {
                const contents = e.target.result;
                importBackup(contents as string).catch(err => console.error(err));
            };
            reader.readAsText(f);
        }
    };

    exportElement.append(exportButton);
    importElement.append(importButton);

    backupElement.append(exportElement);
    backupElement.append(importElement);

    content.append(backupElement);
}
