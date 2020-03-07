Contributing
============

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

## Project structure

  - `dist/`: build output
  - `locales`: i18n translations
  - `public/`: misc files
  - `public/fonts/`: font files (.woff2, .woff)
  - `public/fonts/files/`: font dev files
  - `public/images/`: images (logos, icons, sample images)
  - `public/manifest/base.json`: base browser extension manifest file
  - `src/`: all LiTags code
  - `src/content.tsx`: **content entry** file
  - `src/background.ts`: **background entry** file
  - `src/options.tsx`: **options entry** file
  - `src/api/`: storage api 
  - `src/app/`: top level react component, redux store config, root reducer
  - `src/components/`: react components
  - `src/components/Options/`: react components relating to extension options page
  - `src/constants/`: i18n constants, other constants defined in files used across the project
  - `src/hooks/`: react reusable hooks
  - `src/slices/`: redux [slice](https://redux-toolkit.js.org/api/createslice/) defs 
  - `src/util/`: utility functions
  - `tsconfig.json`: compiler options
  - `package.json`: package info, dependencies
  - `webpack.dev.config.js`: dev build script
  - `webpack.prod.config.js`: prod build script

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
[Reddit Enchancement Suite](https://github.com/honestbleeps/Reddit-Enhancement-Suite)

#### Synchronization

Sets, tags, options and users should really be accessible from any device that runs this extension. Currently this data 
is stored/created only local to the machine the extension was installed on using 
[storage.local api](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/storage/local). Browser
provide a possibility to store data in an area which will be synced across all instances the user is logged into, but 
this is very limited. [Chrome](https://developer.chrome.com/apps/storage#property-sync) for example, lists that this key 
value store - stores up to 512 items with max. 8,192 Bytes each and a total limit of 102,400 Bytes - clearly not enough 
if we are to store hundreds of tags and a growing number of tagged users. 

Potential solutions include running a own server were this data is stored (not feasible imo), storing only the most 
used tags/users in the browsers storage.sync area or possibly allowing users enable sync by using the 
[Google Drive API](https://developers.google.com/drive/api/v3/reference). 
One example of an extension that uses the gDrive API is 
[Reddit Enchancement Suite](https://github.com/honestbleeps/Reddit-Enhancement-Suite).

#### Importing Tag sets

Sets can already be imported using the backup utilities on the options page, however importing set data overwrites all
existing sets data, hence if someone wants to import a set to add to the existing sets, he/she would have to first 
generate a current backup file and manually add the set in this file and import it afterwards. Really there should be
a button to import a set to add on the tag sets options page. 

#### Font Sets

Support for what I call _font sets_. Currently on the options page you can really only add new _image sets_ 
(set: a collection of tags which are essentially pairs of names and links to images). _Font sets_ are sets were a user
provides a link to a font file e.g. 
[lichess icon font .woff2](https://github.com/ornicar/lila/blob/master/public/font/lichess.chess.woff2) and then defines
the relevant characters with their corresponding names to make up tags. Tags from _font sets_ scale nicely and can be 
colored arbitrarily. One example of a font set is the default _Lichess Tag Set_ included/hardcoded in the extension.

#### Documentation (of features) 

Currently there is only a bare minimum of documentation. Having something a long the lines of Tooltips, Faq more 
descriptions would be beneficial. While I tried to design everything to be as intuitive as possible, some features like
sorting tags in a list, sorting sets in the tag set options for display order in the tag chooser may not be apparent. 

The same goes for the code itself, though I believe most of it doesn't really need any additional comments, somethings
may not be obvious at first.

#### Adding tag aliases in options

A Tag is made of an id, name, link/character and color depending if the set is a font or image set. Additionally tags
also include an array of strings for aliases. Those aliases are used when using the tag search function of the tag 
chooser to provide better search results. Currently tag aliases can only be added to tags manually if a users imports
a backup file with the aliases added to tags accordingly. If aliases are provided they are already being displayed
in the tag sets options (see image below) and can be removed, however adding tags on the options page is currently 
not possible and it is even debatable if this is a feature this extension needs, or if it should remain a power user 
feature gated behind needing to import a custom set def file. 

<img src="https://raw.githubusercontent.com/mpunkenhofer/litags/master/public/images/litags_example_options_tag-view.png" alt="litags_example_options_tag-view"/>

#### Predictable Tag Ids

Tags assigned to users are stored in a list by their IDs. Those IDs are random v4 uuids which are generated once on
the first time the tag sets are requested. This becomes an issue if you want to import a backup file e.g. only import a 
list of users with their tags - those ids won't match with any of the ids stored in your existing sets.

Possible solutions include generating ids using the tag names, aliases, set name as seed (v5 uuids) - potential 
collision risk or storing tags not by id but rather store all relevant tag data: name, image / font urls.  

#### Tag Hotkeys

Support hotkeys that assign tags to your opponent. There exists already hotkey support (using the 
[browser command api](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/commands/Command)) 
which brings up the tag chooser for your opponent and implementing more hotkeys along those lines should be trivial,
however it appears we are limited to a max of 4 hotkeys per extension. That would mean there are only 3 more left
for tags and I imagine having more than 3 tags on hotkeys would be nice to have e.g. imagine having tags on 
modifier + 1 - 9. Using the command api also decouples hotkeys somewhat from all the other options since those are found
in a different place specific to the browser.  

#### Tag Chooser Look

I would like to use [React-Bootstrap](https://react-bootstrap.github.io/) for its layout and other things, in order 
to be consistent with the rest of LiTags and also because I like how it makes the layout of your UI apparent in the code
rather then in a separate css file. Also look & feel needs some touch ups especially in other lichess themes like light.