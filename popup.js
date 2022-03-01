// When the button is clicked, inject setPageBackgroundColor into current page
clearBtn.addEventListener("click", async () => {
    clearData();

});

toggleBtn.addEventListener("click", async (e) => {
  let isBtnChecked = e.srcElement.checked;
  chrome.runtime.sendMessage({ appActivator: isBtnChecked, type: "activation" },
  function (response) {
      //notification message for active/inactive successful
  });
});

exportBtn.addEventListener("click", async () => {
    let csvContent = "data:text/csv;charset=utf-8,";
    chrome.storage.local.get(['keyItems'], function (result) {
        //let node = document.querySelector(".content-wrapper"); 
        let rows = [];
        if (result.keyItems) {
            result.keyItems.map((val, index) => {
                let dataFormatter = JSON.stringify(val.item, null, " ") ; //keep line breaks, tabs, spaces
                rows.push([index + 1, dataFormatter]);
            });

            var csv = 'Sr No., Item\n';

            rows.map((row) => {
                csv += row.join(',');
                csv += "\n";
            });
            clearData();
            document.write("<b>Preview:</b><hr/>" + csv);

            var hiddenElement = document.createElement('a');
            hiddenElement.href = 'data:text/csv;charset=utf-8,' + encodeURI(csv);
            hiddenElement.target = '_blank';

            //provide the name for the CSV file to be downloaded  
            hiddenElement.download = 'data.csv';
            hiddenElement.click();



        }
    });


});



window.onload = function () {
    chrome.storage.local.get(['keyItems'], function (result) {
        //let node = document.querySelector(".content-wrapper"); 
        if (result.keyItems) {
            result.keyItems.map((val, index) => {
                document.querySelector(".content-wrapper").innerHTML += "<b>#Item " + (index + 1) + "</b>\n";
                document.querySelector(".content-wrapper").innerHTML += val.elem + "\n\n\n";
            });
        }

    });
}

function clearData() {
    document.querySelector(".content-wrapper").innerHTML = "";
    chrome.runtime.sendMessage({ clearData: true, type: "remove" },
        function (response) {
            //notification message for data clearance successful
        });
}