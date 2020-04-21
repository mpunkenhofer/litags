# Changelog

## 1.0.0, TBD (Not released)

### New Features

- Added a options page for frequently used tags that allows you to remove specific ones from freq. used.

### Bug Fixes

- Tags are not showing for imported users (Tag ID issue).
- Correctly display wide images (tags).

### Other

- New LiTags Icon
- Touched up option pages

Addressing changes to [Contributing TODO](https://github.com/mpunkenhofer/litags/blob/75f058196aa10359fd48ee45ad65b871b0721bbc/CONTRIBUTING.md#TODO) since v0.0.0

- **Font Set Support**: Font sets are considered deprecated and are no longer being considered as a feature worth implementing. Even though using fonts for tags is nice for various reasons (e.g. color, scaling), providing the ability to include custom font sets via options requires to much work (implementation and maintaining) for a feature that probably would only be used a *very few* people. That said, font sets can still be used if they are included in the extension directly - the code to support custom font icons exists. If someone comes up with nice icons and provides a font file (e.g. .woff) it can be added quite easily.
- **Tag Aliases**: It is probably enough to find tags just by name (keyword) so a feature to add aliases to tags via an option interface is no longer considered worth the effort. Adding aliases is still possible manually by importing a backup or set file with the aliases added to tags accordingly. If aliases are provided they are already being displayed in the tag sets options and can be removed.
- **Predictable Tag Ids**: Rather than storing just ids of tags when assigning tags to a user and then later try to find existing tags with the corresponding id - store all the relevant data which is required to display the tag at a later time directly. This obviously requires much more storage, but ensures we encounter no issues when importing from backup files.
- **Tag Chooser Look**: One of the main issues was that wide images were not correctly displayed, this was resolved in this update. Using Bootstrap
layouts for the tag chooser does necessarily really add to clarity neither would it fit with the lichess theme. Adjustments to class names, html,tags and css were made to improve clarity and look.

## 0.0.0 Mar, 7, 2020

- Release of [alpha version](https://github.com/mpunkenhofer/litags/releases/tag/v0.0.0)
