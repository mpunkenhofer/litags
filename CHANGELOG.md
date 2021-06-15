# Changelog

## 1.1.2, Jun, 15, 2021

- Fix: Lichess font icons broken after lichess update.
- Updated dependencies

## 1.1.1, Mar, 12, 2021

- Options: moved the color picker for font tags.
- Updated dependencies

## 1.1.0, Feb, 20, 2021

### New Features

- You can now directly upload images representing tags in options (uploaded to imgur.com).
- Toggle to show/hide frequently used tags in the tag chooser.
- Toggle to show/hide search field in the tag chooser.
- Removed frequently used tag setting and instead provided a way to clear frequently used tags for simplicity.

### Other

- Updated dependencies
- Improved litags options.
- Added a link to litags options in the tag chooser.

## 1.0.2, Oct, 26, 2020

- Updated dependencies

## 1.0.1, Apr, 28, 2020

### Bug Fixes

- [#2](https://github.com/mpunkenhofer/litags/issues/2) Injected stylesheet causes layout issues on lichess.org.
- Tag list remove icon not in line with tags.

## 1.0.0, Apr, 25, 2020

### New Features

- Added a options page for frequently used tags that allows you to remove specific ones from freq. used.
- Added import/export for tag sets on the sets page.

### Bug Fixes

- Tags are not showing for imported users (Tag ID issue).
- Correctly display wide images (tags).

### Other

- Improved Tag Chooser look across all lichess themes.
- New LiTags icon.
- Touched up option pages.

Addressing changes to [Contributing TODO](https://github.com/mpunkenhofer/litags/blob/75f058196aa10359fd48ee45ad65b871b0721bbc/CONTRIBUTING.md#TODO) since v0.0.0

- **Font Set Support**: Font sets are deprecated and are no longer being considered as a feature worth implementing. Even though using fonts for tags is nice for various reasons (e.g. color, scaling), providing the ability to include custom font sets via options requires to much work (implementation and maintaining) for a feature that probably would only be used by *very few* people. That said, font sets can still be used if they are included in the extension directly - the code to support custom font icons exists. If someone comes up with nice icons and provides a font file (e.g. .woff) it can be added quite easily as a new set.
- **Tag Aliases**: It is probably enough to find tags just by name (keyword), hence a feature to add aliases to tags via an option interface is not worth the effort. Adding aliases is still possible manually by importing a backup or set file with the aliases added to the tags accordingly. If aliases are provided, they are shown in the tag sets options and can be removed if necessary.
- **Predictable Tag Ids**: Rather than storing just ids of tags when assigning tags to a user and then later try to find existing tags with the corresponding id - store all the relevant data which is required to display the tag at a later time directly. This obviously requires much more storage, but ensures we encounter no issues when importing from backup files or deleting sets.
- **Tag Chooser Look**: One of the main issues was that wide images were not correctly displayed, this was resolved in this update. Using Bootstrap
layouts for the tag chooser doesn't necessarily add to clarity, neither would it fit with the lichess theme. Adjustments to class names, html, tags and css were made to improve clarity and look.
- **Importing Tag sets**: Implemented.

## 0.0.0 Mar, 7, 2020

- Release of LiTags [alpha version](https://github.com/mpunkenhofer/litags/releases/tag/v0.0.0).
