window.browser = window.browser.extension.getBackgroundPage().browser;

const defaultMessageListHeight = "22";
const defaultFolderTreeHeight = "22";
const defaultBackgroundColor = "#1e485b";
const defaultSelectBackgroundColor= "#F07746";

var messageListInput = document.querySelector("#messageListHeight");
var folderTreeInput = document.querySelector("#folderTreeHeight");
var backgroundColorInput = document.querySelector("#treeBackgroundColor");
var backgroundSelectColorInput = document.querySelector("#backgroundSelectColor");

function saveOptions(e) {
    browser.storage.sync.set({
        messageListHeight: messageListInput.value,
        folderTreeHeight: folderTreeInput.value,
        folderTreeColor: backgroundColorInput.value,
        selectColor: backgroundSelectColorInput.value
    });
    e.preventDefault();

    if (messageListInput.validationMessage || folderTreeInput.validationMessage){
        document.querySelector("#error").style.display = "block";
        document.querySelector("#error").innerText = messageListInput.validationMessage + "\n" + folderTreeInput.validationMessage;
        document.querySelector("#success").style.display = "none";
    } else {
        document.querySelector("#error").style.display = "none";
        document.querySelector("#success").style.display = "block";
        document.querySelector("#success").innerText = "Settings saved. You must restart Thunderbird to see the changes.";
    }
}

function resetOptions(e) {
    browser.storage.sync.set({
        messageListHeight: defaultMessageListHeight,
        folderTreeHeight: defaultFolderTreeHeight,
        folderTreeColor: defaultBackgroundColor,
        selectColor: defaultSelectBackgroundColor
    });
    e.preventDefault();

    messageListInput.value = defaultMessageListHeight;
    folderTreeInput.value = defaultFolderTreeHeight;
    backgroundColorInput.value = defaultBackgroundColor;
    backgroundSelectColorInput.value = defaultSelectBackgroundColor;

    document.querySelector("#error").style.display = "none";
    document.querySelector("#success").style.display = "block";
    document.querySelector("#success").innerText = "Settings are restored. You must restart Thunderbird to see the changes.";
}

function restoreOptions() {
    var gettingItem = browser.storage.sync.get(['messageListHeight', 'folderTreeHeight', 'folderTreeColor', 'selectColor']);
    gettingItem.then((res) => {
        messageListInput.value = res.messageListHeight || defaultMessageListHeight;
        folderTreeInput.value = res.folderTreeHeight || defaultFolderTreeHeight;
        backgroundColorInput.value = res.folderTreeColor || defaultBackgroundColor;
        backgroundSelectColorInput.value = res.selectColor || defaultSelectBackgroundColor;
    });
}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("#submit").addEventListener("click", saveOptions);
document.querySelector("#reset").addEventListener("click", resetOptions);