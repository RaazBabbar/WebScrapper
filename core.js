


if (true) {
    // debugger;
    // Unique ID for the className.
    var MOUSE_VISITED_CLASSNAME = 'crx_mouse_visited';


    // Previous dom, that we want to track, so we can remove the previous styling.
    var prevDOM = null;

    // Mouse listener for any move event on the current document.
    document.addEventListener('mousemove', function (e) {

        var srcElement = e.srcElement;

        // Lets check if our underlying element is a DIV.
        // if (srcElement.nodeName == 'DIV') {

        // For NPE checking, we check safely. We need to remove the class name
        // Since we will be styling the new one after.
        if (prevDOM != null) {
            prevDOM.classList.remove(MOUSE_VISITED_CLASSNAME);
        }

        // Add a visited class name to the element. So we can style it.
        srcElement.classList.add(MOUSE_VISITED_CLASSNAME);

        // The current element is now the previous. So we can remove the class
        // during the next iteration.
        prevDOM = srcElement;
        //  }
    }, false);


    document.addEventListener('click', function (e) {
        var srcElement = e.srcElement;
        // Lets check if our underlying element is a DIV.
        //console.log(e);
        // console.log("iframe ? "+ srcElement.innerHTML.includes("<iframe"));
        //if (srcElement.nodeName == 'DIV') {
        //  console.log(srcElement.innerHTML)
        // if(srcElement.innerHTML.includes("<iframe")){
        // console.log(srcElement.innerHTML)
        // }else{
        // console.log(srcElement.innerText)
        // chrome.runtime.sendMessage({ srcItem: srcElement.innerText, type: "add" },
        //  function (response) { });//callback will be invoked somewhere in the future
        // }
        // }


        //xpaths

        //screenshot
        let xpath0 = '//*[@id="mat-dialog-0"]"]';
        //screenshot
        let xpath1 = '//*[@id="cdk-overlay-7"]';
        //screenshot
        let xpath2 = '/html/body/app-root/div/app-account-layout/div/div/mat-tab-group"]';
        //text
        let xpath3 = '//*[@id="mat-tab-content-0-0"]/div/app-user-dashboard/div';
        //html
        let xpath4 = '//*[@id="mat-tab-content-0-2"]/div/app-program-dashboard/div/div[4]';


        //Send Data to background js

        //data type : text 
        let captureElement = getElementByXpath(xpath1);
        //console.log("Capturing elem");


        // html2canvas(captureElement)
        //     .then(canvas => {
        //         canvas.style.display = 'none'
        //         document.body.appendChild(canvas)
        //         return canvas
        //     })
        //     .then(canvas => {
        //         const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
        //         const a = document.createElement('a')
        //         // a.setAttribute('download', 'my-image.png')
        //         a.setAttribute('href', image)
        //         // a.click();
        //         var img = document.createElement('img');
        //         img.src = image;

        //         //  document.getElementById('container').appendChild(img);

        //         console.log("pdf print to be exported");
        //         //download pdf
        //         var divContents = '$("#dvContainer").html()';
        //         var printWindow = window.open('', '', 'height=400,width=800');
        //         printWindow.document.write('<html><head><title>DIV Contents</title>');
        //         printWindow.document.write('</head><body >');
        //         printWindow.document.write('<img src="' + image + '">');
        //         printWindow.document.write('</body></html>');
        //         printWindow.document.close();
        //         printWindow.print();



        //         canvas.remove()
        //     })

        // console.log(xpathElem.innerText)
       // chrome.runtime.sendMessage({ srcItem: captureElement, type: "add" },
         //   function (response) {

         //   });//callback will be invoked somewhere in the future

        //data type : html 

        //data type : screenshot 

        //generate pdf 

        // require(["jspdf"], ({ jsPDF }) => {
        //     const doc = new jsPDF();
        //     doc.text("Hello world!", 10, 10);
        //     doc.save("a4.pdf");
        // });


    }, false);

    window.addEventListener('DOMContentLoaded', (event) => {

    });
    chrome.runtime.onMessage.addListener(pdf => {
        if(pdf.shouldExport){
            // get caputures 
            getCaptures().then((res)=>{
                // generate pdf
                generatePDF(res);
            },(err)=>{
                //notify msg
            });

        
        }
    }); 

    function generatePDF(res){
      //  alert("pdf time..."+ res);
     // alert("2");
    }
    async function getCaptures(){
        let myPromise = new Promise(function(resolve) {
           
                //alert("1");
                let responseData; 
                //get options data from storage

                //create canvas 
                let xpath1 = '/html/body/div[3]/div[2]/div/mat-dialog-container/app-account-add/form';
                let captureElement = getElementByXpath(xpath1);
                if(captureElement){
                    html2canvas(captureElement)
                    .then(canvas => {
                        canvas.style.display = 'none'
                        document.body.appendChild(canvas)
                        return canvas
                    })
                    .then(canvas => {
                        const image = canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream')
                        const a = document.createElement('a')
                        // a.setAttribute('download', 'my-image.png')
                        a.setAttribute('href', image)
                        // a.click();
                        var img = document.createElement('img');
                        img.src = image;
                        img.style.width = "100%"; 
        
                        //  document.getElementById('container').appendChild(img);
        
                        console.log("pdf print to be exported");
                        //download pdf
                    
                        // let printWindow = window.open('', '', 'height=400,width=800');
                        // printWindow.document.write('<html><head><title>Preview</title>');
                        // printWindow.document.write('</head><body >');
                        // //printWindow.document.write('<div>');
                        // printWindow.document.write('<img style="width:100%;" src="' + image + '">');
                        // //printWindow.document.write('</div >');
                        // printWindow.document.write('</body></html>');
                        // printWindow.document.close();
    
    
                        //create html 
                         // create a new div element
                        const newDiv = document.createElement("div");
                          // and give it some content
                        const newContent = document.createTextNode("Web Capture");
    
                          // add the text node to the newly created div
                        newDiv.appendChild(newContent);
                        newDiv.appendChild(img);
                        var opt = {
                            margin:       1,
                            filename:     'myfile.pdf',
                            image:        { type: 'jpeg', quality: 0.98 },
                            html2canvas:  { scale: 2 },
                            jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
                          };
    
                          //send background script alert 
                        chrome.runtime.sendMessage({ type: "notify" },
                        function (response) {
                            //notification message for active/inactive successful
                            setTimeout(function() {
                                //printWindow.print();
                                //printWindow.close();
                         
                                html2pdf().set(opt).from(newDiv).save();
                            }, 2000);
                        });
    
                     
                        canvas.remove();
                                //send responseData to the callback ()
                        resolve(responseData);
                    });
            
                }else{
                    //notify the xpath is not detected in the page. 
                }
     
        
        });
        return await myPromise; 
    }

    function getElementByXpath(path) {
        return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
    }


 




}
