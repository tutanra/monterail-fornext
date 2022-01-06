var { Services } = ChromeUtils.import("resource://gre/modules/Services.jsm");

const fileName = "messenger.css";
const defaultMessageListHeight = "22";
const defaultFolderTreeHeight = "22";
const defaultBackgroundColor = "#1e485b";
const defaultSelectBackgroundColor= "#F07746";

function onLoad(activatedWhileWindowOpen) {
  WL.injectCSS("chrome://MonterailOverlay/content/skin/" + fileName);


  if (Services.appinfo.OS == "WINNT") {
    WL.injectCSS("chrome://MonterailOverlay/content/skin/win/skin/" + fileName);
  } else if (Services.appinfo.OS == "Linux") {
    WL.injectCSS("chrome://MonterailOverlay/content/skin/linux/skin/" + fileName);
  } else if (Services.appinfo.OS == "Darwin") {
    WL.injectCSS("chrome://MonterailOverlay/content/skin/mac/skin/" + fileName);
  }

  var gettingItem = WL.messenger.storage.sync.get(['messageListHeight', 'folderTreeHeight', 'folderTreeColor', 'selectColor']);
  gettingItem.then((res) => {
    document.querySelector(':root').style.setProperty('--message-list-row-height', (res.messageListHeight || defaultMessageListHeight) + "px");
    document.querySelector(':root').style.setProperty('--folder-tree-row-height', (res.folderTreeHeight || defaultFolderTreeHeight) + "px");
    document.querySelector(':root').style.setProperty('--background-color', (res.folderTreeColor || defaultBackgroundColor));
    document.querySelector(':root').style.setProperty('--background-color-inactive', (res.folderTreeColor || defaultBackgroundColor));
    document.querySelector(':root').style.setProperty('--tree-background-color-selected', (res.selectColor || defaultSelectBackgroundColor));
  });
}

function onUnload(deactivatedWhileWindowOpen) {
}