# Contributing

You want to contribute to LiTags? Awesome! Any form of help is greatly appreciated
(contributions, suggestions, tips, bug reports,...), seeing that this was the first time I made a browser extension,
used Typescript, React, Redux, Sass. Pull requests are welcome.

Join the [Litags Discord](https://discord.gg/4d7QWUK) to get in touch.

## I want to report a bug or a problem about LiTags

[__Make an issue__](https://github.com/mpunkenhofer/litags/issues/new). Make sure you list the steps to reproduce the
problem and it is not a trivial problem or demands unrealistic dev time to fix. Issues reports of very minimal effort
may be closed.

## I want to suggest a feature for LiTags

Issue tickets on features that lack potential or effectiveness are not useful and may be closed. Before creating a
ticket, please first try to discuss it on the [Litags Discord](https://discord.gg/4d7QWUK) in appropriate channels to
gauge feedback. When ready: [make an issue ticket](https://github.com/mpunkenhofer/litags/issues/new).

## Building development versions of the extension

### First time installation

1. Install [git](https://git-scm.com/).
2. Install [node.js](https://nodejs.org)
3. Install [npm](https://www.npmjs.com/get-npm)
4. [Clone](https://help.github.com/articles/cloning-a-repository/) this repository
5. Run `npm install` in that folder.

### Build commands

**`npm run dev`** will clean `dist/`, then build LiTags (dev mode), and start a watch task that will rebuild LiTags when
you make changes. Only changed files will be rebuilt.

**`npm run build`** will clean `dist/`, then build LiTags (prod mode)

**`npm run dist`** will clean `dist/`, then build LiTags (prod mode) and create a .zip file in `dist/zip/`

### Lint commands

**`npm run lint`** will verify the code style (and point out any errors) of all `.ts .tsx .js` and files in `src/`
using  [ESLint](http://eslint.org/) with typescript support by
[TypeScript ESLint](https://github.com/typescript-eslint/typescript-eslint).

### Loading LiTags into your browser

#### Chrome

1. `Menu->More tools->Extensions` and tick the `Developer Mode` checkbox.
2. Click `Load unpacked extension` and select the `/dist` folder.
3. On the `Menu->More tools->Extensions` page use `Reload` if you need to.

#### Firefox

1. `about:debugging` and tick the `Enable add-on debugging` checkbox.
2. Click `Load Temporary Add-on` and select `/dist/manifest.json`.
3. On  the `about:debugging` page use `Reload` if you need to.

### Resources

A collection of useful links regarding this project.

- [Building a cross-browser extension](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/Build_a_cross_browser_extension)
- [React+TypeScript Cheatsheets](https://github.com/typescript-cheatsheets/react-typescript-cheatsheet)
- [React & Redux in TypeScript - Complete Guide](https://github.com/piotrwitek/react-redux-typescript-guide)
- [Bootstrap](https://getbootstrap.com/) and [React-Bootstrap](https://react-bootstrap.github.io/)
- [React-Sortable-HOC](https://github.com/clauderic/react-sortable-hoc)
  
### TODO

Here are a few items which I consider important/missing and are still left to do listed roughly by priority.

#### Tests

I tested this extension on the go and as I mentioned above that this was my first extension/typescript/react-redux
project, I didn't have the know-how nor the time research and setup proper testing in this context. The more people
contribute to this project though, the more important becomes testing - making sure new code people add doesn't break
existing code, hence I listed this as a the top priority.  

One example of an browser extension with tests:
[Reddit Enhancement Suite](https://github.com/honestbleeps/Reddit-Enhancement-Suite)

#### Synchronization

Sets, tags, options and users should really be accessible from any device that runs this extension. Currently this data
is stored/created only local to the machine the extension was installed on using
[storage.local api](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local). Browser
provide a possibility to store data in an area which will be synced across all instances the user is logged into, but
this is very limited. [Chrome](https://developer.chrome.com/apps/storage#property-sync) for example, lists that this key
value store - stores up to 512 items with max. 8,192 Bytes each and a total limit of 102,400 Bytes - clearly not enough
if we are to store hundreds of tags and a growing number of tagged users.

Potential solutions include running a server were this data is stored (not feasible imo), storing only the most
used tags/users in the browsers storage.sync area or possibly allowing users to enable sync by using the
[Google Drive API](https://developers.google.com/drive/api/v3/reference).
One example of an extension that uses the gDrive API is
[Reddit Enhancement Suite](https://github.com/honestbleeps/Reddit-Enhancement-Suite).

#### Importing Tag sets

Sets can already be imported using the backup utilities on the options page, however importing set data overwrites all
existing sets data, hence if someone wants to import a set to add to the existing sets, he/she would have to first
generate a current backup file and manually add the set in this file and import it afterwards. Really there should be
a button to import a set to add on the tag sets options page.

#### Documentation (of features)

Currently there is only a bare minimum of documentation. Having something a long the lines of Tooltips, Faq more
descriptions would be beneficial. While I tried to design everything to be as intuitive as possible, some features like
sorting tags in a list, sorting sets in the tag set options for display order in the tag chooser may not be apparent.

The same goes for the code itself, though I believe most of it doesn't really need any additional comments, somethings
may not be obvious at first.

#### Tag Hotkeys

Support hotkeys that assign tags to your opponent. There exists already hotkey support (using the
[browser command api](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/Command))
which brings up the tag chooser for your opponent and implementing more hotkeys along those lines should be trivial,
however it appears we are limited to a max of 4 hotkeys per extension. That would mean there are only 3 more left
for tags and I imagine having more than 3 tags on hotkeys would be nice to have e.g. imagine having tags on
modifier + 1 - 9. Using the command api also decouples hotkeys somewhat from all the other options since those are found
in a different location specific to the browser.  

#### Tag Chooser Look

I would like to use [React-Bootstrap](https://react-bootstrap.github.io/) for its layout and other things, in order
to be consistent with the rest of LiTags and also because I like how it makes the layout of your UI apparent in the code
rather then in a separate css file. Also look & feel needs some touch ups especially in other lichess themes like light.
