


if (true) {
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

        //text
        let xpath0 = '//*[@id="sections"]';
        //screenshot
        let xpath1 = '//*[@id="chips"]'; 
        //screenshot
        let xpath2 = '//*[@id="container"]';
        //html
        let xpath3 = '//*[@id="gatsby-focus-wrapper"]/div/div/div/div[1]/div/div/div/div/div[1]/div/nav';
        //screenshot
        let xpath4 = '//*[@id="gatsby-focus-wrapper"]/div/div/div/div[1]/div/div/article/div/div[1]/ul[1]';
        //text
        let xpath5 = '//*[@id="gatsby-focus-wrapper"]/div/div/div/div[1]/div/div/article/div/div[1]/p[26]';

        //Send Data to background js

        //data type : text 
        let captureElement = getElementByXpath(xpath1);
        console.log("Capturing elem");
 

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

          //  document.getElementById('container').appendChild(img);

            console.log("pdf print to be exported");
            //download pdf
            var divContents = '$("#dvContainer").html()';
            var printWindow = window.open('', '', 'height=400,width=800');
            printWindow.document.write('<html><head><title>DIV Contents</title>');
            printWindow.document.write('</head><body >');
            printWindow.document.write('<img src="'+image+'">');
            printWindow.document.write('</body></html>');
            printWindow.document.close();
            printWindow.print();



            canvas.remove()
        })

        // console.log(xpathElem.innerText)
        chrome.runtime.sendMessage({ srcItem: captureElement, type: "add" },
            function (response) {

        });//callback will be invoked somewhere in the future
    
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
    alert()
});
function getElementByXpath(path) {
    return document.evaluate(path, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
}



    
}
