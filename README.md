# LiTags

[link-cws]: https://chrome.google.com/webstore/detail/litags/nlboefdopbngegiihopmjfndjojcblmf "Version published on Chrome Web Store"
[link-amo]: https://addons.mozilla.org/en-US/firefox/addon/litags/ "Version published on Mozilla Add-ons"

LiTags (li[chess] tags) is a browser extension which enables you to assign tags
to players on [lichess.org](https://www.lichess.org). The idea was being able to quickly determine the
type of player you face (playing for time, defensive, aggressive, gives no rematches, ...).

![LiTags Demo GIF](assets/promo/promo-github-1.gif)

## LiTags works with all Lichess Themes

![LiTags Themes Example](assets/promo/promo-github-2.png)

## LiTags Options

![LiTags Options Example](assets/promo/promo-github-3.png)

LiTags is written in [Typescript](https://www.typescriptlang.org/), uses [Webpack](https://webpack.js.org/) for module
bundling, relies on [React](https://reactjs.org/) for its user interfaces in combination with
[Redux](https://redux.js.org/) for state management including the additional [React-Redux](https://react-redux.js.org/)
bindings. CSS is generated with [Sass](https://sass-lang.com/) making use of [Bootstrap](https://getbootstrap.com/) in
combination with [React Bootstrap](https://react-bootstrap.github.io/). Sorting tags in a list was implemented with
[React Sortable HOC](https://github.com/clauderic/react-sortable-hoc).

## LiTags in Stores

- [Chrome][link-cws] [<img valign="middle" src="https://img.shields.io/chrome-web-store/v/nlboefdopbngegiihopmjfndjojcblmf?label=%20&style=flat-square">][link-cws]
- [Firefox][link-amo] [<img valign="middle" src="https://img.shields.io/amo/v/litags?label=%20&style=flat-square">][link-amo]

## Building and contributing

See [CONTRIBUTING.md](/CONTRIBUTING.md).

## License

See [LICENSE](/LICENSE).

## Attributions

Files | Author(s) | Licence
---|---|---
assets/fonts/lichess.woff2 | [ornicar/lila](https://github.com/ornicar/lila/blob/master/public/font/lichess.woff2) | [OFL](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL), [MIT](https://github.com/primer/octicons/blob/master/LICENSE), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/), AGPLv3+
assets/images/*.svg | [fontawesome](https://fontawesome.com/) | [OFL](http://scripts.sil.org/cms/scripts/page.php?site_id=nrsi&id=OFL), [MIT](https://github.com/primer/octicons/blob/master/LICENSE), [CC BY 4.0](https://creativecommons.org/licenses/by/4.0/)
