let color = '#3aa757';
let srcItems = [];


chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.sync.set({ color });
  console.log('Default background color set to %cgreen', `color: ${color}`);
});

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type === "add"){
    let childWrapper = "";
    childWrapper = "<div class='srcItem' contenteditable='true'>";
    childWrapper += request.srcItem;
    childWrapper += "</div>";
    srcItems.push({
      "item": request.srcItem,
      "elem": childWrapper
    });
    chrome.storage.local.set({ keyItems: srcItems }, function () {
    });
  }else if(request.type === "remove"){
    srcItems = [];
  }
});

