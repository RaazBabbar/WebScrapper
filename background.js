let isAppActive = false; 
let srcItems = [];
// import { jsPDF } from "jspdf";




chrome.runtime.onInstalled.addListener(() => {
   //to do after installation

});



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if(request.type === "add"){
    // let childWrapper = "";
    // childWrapper = "<div class='srcItem' contenteditable='true'>";
    // childWrapper += request.srcItem;
    // childWrapper += "</div>";
    // srcItems.push({
    //   "item": request.srcItem,
    //   "elem": childWrapper
    // });
    // chrome.storage.local.set({ keyItems: srcItems }, function () {
    // });


    //generate pdf 
    // Default export is a4 paper, portrait, using millimeters for units
    // const doc = new jsPDF();

    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");


  }else if(request.type === "remove"){
    srcItems = [];
    chrome.storage.local.set({ keyItems: srcItems });
  }
});

