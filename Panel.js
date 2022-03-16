exportBtn.addEventListener("click", async () => {
    console.log("Notifying Click event from Panel.js");
    let exportConfig = {
        "shouldExport":true
    };
    // chrome.tabs.query({}, tabs => {
    //     tabs.forEach(tab => {
    //     chrome.tabs.sendMessage(tab.id, exportConfig);
    //   });
    // })

    // chrome.devtools.inspectedWindow.eval(
    //     "jQuery.fn.jquery",
    //     function(result, isException) {
    //       if (isException) {
    //         console.log("the page is not using jQuery");
    //       } else {
    //         console.log("The page is using jQuery v" + result);
    //       }
    //     }
    //   );


    //   chrome.devtools.inspectedWindow.getResources(
    //     function(result) {
    //         console.log(result);
    //     }
    //   );
      chrome.devtools.network.getHAR(
        function(result) {
            console.log(result);
        }
      )

    //let csvContent = "data:text/csv;charset=utf-8,";
 
    // chrome.storage.local.get(['keyItems'], function (result) {
    //     //let node = document.querySelector(".content-wrapper"); 
    //     let rows = [];
    //     if (result.keyItems) {
    //         result.keyItems.map((val, index) => {
    //             let dataFormatter = JSON.stringify(val.item, null, " ") ; //keep line breaks, tabs, spaces
    //             rows.push([index + 1, dataFormatter]);
    //         });

    //         var csv = 'Sr No., Item\n';

    //         rows.map((row) => {
    //             csv += row.join(',');
    //             csv += "\n";
    //         });
    //         clearData();
    //         document.write("<b>Preview:</b><hr/>" + csv);

    //         var hiddenElement = document.createElement('a');
    //         hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
    //         hiddenElement.target = '_blank';

    //         //provide the name for the CSV file to be downloaded  
    //         hiddenElement.download = 'data.csv';
    //         hiddenElement.click();



    //     }
    // });


});