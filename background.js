let isAppActive = false;
let srcItems = [];
// // import { jsPDF } from "./jspdf.umd.min.js";
// import {originPDF} from './pdfmake.js';




chrome.runtime.onInstalled.addListener(() => {
  //to do after installation
  //  chrome.devtools.panels.create("Font Picker",
  //  "check.png",
  //  "Panel.html",
  //  function(panel) {  });
});



chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  if (request.type === "add") {
    // let childWrapper = "";
    // childWrapper = "<div class='srcItem' contenteditable='true'>";
    // childWrapper += request.srcItem;
    // childWrapper += "</div>";
    // srcItems.push({
    //   "item": request.srcItem,
    //   "elem": childWrapper
    // });
    chrome.storage.local.set({ keyItems: srcItems }, function () {
    });


    //generate pdf 
    // Default export is a4 paper, portrait, using millimeters for units
    // Landscape export, 2×4 inches


    // const doc = new jsPDF();
    // doc.text("Hello world!", 10, 10);
    // doc.save("a4.pdf");
    // Default export is a4 paper, portrait, using milimeters for units



  } else if (request.type === "remove") {
    srcItems = [];
    chrome.storage.local.set({ keyItems: srcItems }, function () {
      sendResponse("Success");
    });
  } else if (request.type === "optionsAdd") {

    //   "content_scripts": [{
    //     "matches": ["https://13.94.233.140/aap-assement/**","http://13.94.233.140/aap-assement/**"],
    //     "css": ["core.css","jquery-ui.css","jquery-ui.structure.css","jquery-ui.theme.css"],
    //     "js": ["core.js","html2canvas.min.js","html2pdf.bundle.min.js","jquery-1.12.4.js","jquery-ui-1.12.1.js"]
    // }]

    // chrome.scripting.getRegisteredContentScripts(
    // [{ id: "1asdf"}],
    //   (res)=>{
    //     alert(JSON.stringify(res))
    //   }
    // )
    // chrome.scripting.registerContentScripts([{
    //   id: "1asdf",
    //   matches: ['https://developer.servicenow.com/dev.do/**'],
    //   js: ["core.js", "html2canvas.min.js", "html2pdf.bundle.min.js", "jquery-1.12.4.js", "jquery-ui-1.12.1.js"],
    //   css: ["core.css", "jquery-ui.css", "jquery-ui.structure.css", "jquery-ui.theme.css"]
    // }], (res) => {
    //   console.log(res);
    // });



    chrome.storage.local.get(['options'], function (result) {
      if (result.options) {
        let optionsList = result.options;
        optionsList.push(request.optionsList[0]);
        chrome.storage.local.set({ options: optionsList }, function () {
          sendResponse({
            status: true,
            message: "Message received",
            response: optionsList
          });
        });
      } else {
        let optionsList = request.optionsList;
        chrome.storage.local.set({ options: optionsList }, function () {
          sendResponse({
            status: true,
            message: "Message received",
            response: optionsList
          });
        });
      }


    });

  } else if (request.type === "optionsDelete") {

    chrome.storage.local.set({ options: request.optionsList }, function () {
      sendResponse({
        status: true,
        message: "Deleted",
        response: request.optionsList
      });
    });

  } else if (request.type === "notify") {

    chrome.tabs.captureVisibleTab(null, {}, function (image) {
      // You can add that image HTML5 canvas, or Element.
      //base64 image of the entire page
      console.log(image);
    });

    var timestamp = new Date().getTime();
    var id = 'myid' + timestamp;
    chrome.notifications.create(
      id,
      {
        type: "basic",
        iconUrl: "check.png",
        title: "Web Capture Successful",
        message: "PDF is downloading soon...",
      },
      function () {
        // chrome.notifications.clear(id);

      }
    );
  }
  return true; // keep the messaging channel open for sendResponse
});

