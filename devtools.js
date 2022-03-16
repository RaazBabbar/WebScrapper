chrome.devtools.panels.create("Web Capture",
    "check.png",
    "Panel.html",
    function (panel) {
        // code invoked on panel creation

        var x = new XMLHttpRequest();
        x.open('GET', 'devtools.css');
        x.onload = function () {
            chrome.devtools.panels.applyStyleSheet(x.responseText);
        };
        x.send();

    }
);

