# LiTags

LiTags is a browser extension which enables you to assign certain tags
to players on [lichess](https://www.lichess.org). The idea was to quickly determine the 
type of player you face (playing for time, defensive, aggresive, 
gives no rematches, ...).

## Installation
1. `git clone` this repository
2. Run `npm install`
3. Run `npm run build`

##### Load the extension in Chrome
1. Open Chrome browser and navigate to chrome://extensions
2. Select "Developer Mode" and then click "Load unpacked extension..."
3. From the file browser, choose `litags/dist/`

## Developing
If you want to start developing the extension and want to enable live reload use 
 
 `npm run debug`

## Packaging
Run `npm run dist` to create a zipped, production-ready extension.

  
