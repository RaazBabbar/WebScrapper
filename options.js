let page = document.getElementById("buttonDiv");
let selectedClassName = "current";
const presetButtonColors = ["#3aa757", "#e8453c", "#f9bb2d", "#4688f1"];
let currentPage = 1;



// Reacts to a button click by marking the selected button and saving
// the selection


// Add a button to the page for each supplied color


// document.getElementById("confirm").addEventListener('click', function(){
//   let passWord = document.getElementById("pwd").value;
//   if(passWord === "Admin"){
//     document.getElementById("lock").style.display = "none";
//   }else{
//     alert("Wrong password")
//   }
// });



// Initialize the page by constructing the color options


//disable inspect element for security purpose
// document.addEventListener('contextmenu', function(e) {
//   e.preventDefault();
// });

function updateForms() {
  chrome.storage.local.get(['options'], function (result) {
    if (result.options) {
      if (result.options.length === 1) {
        $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of 2');
        console.log(result);
        //set options from 
        //  $("#nameControl").val(result.options[0].name);
        //  $("#urlControl").val(result.options[0].url);
        //  $("#xpathControl").val(result.options[0].xPath);
      } else {
        $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of ' + (result.options.length + 1));
        console.log(result);
        //set options from 
        //  $("#nameControl").val(result.options[0].name);
        //  $("#urlControl").val(result.options[0].url);
        //  $("#xpathControl").val(result.options[0].xPath);
      }

    } else {
      if (result.options) {
        $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of 1');
        console.log(result);
        //set options from 
        $("#nameControl").val(result.options[0].name);
        $("#urlControl").val(result.options[0].url);
        $("#xpathControl").val(result.options[0].xPath);
      }

    }

  });
}
$(document).ready(function () {

  const optionObject = {
    name: "",
    url: "",
    xpaths: []
  }
  $("#nameControl").on("input", function (e) {
    let name = $("#nameControl").val();
    optionObject.name = name;
    console.log(name.length);
    if (name.length > 0) {
      $("#urlForm").removeClass("disable");
    } else {
      $("#urlForm").addClass("disable");
    }
  });

  $("#urlControl").on("input", function (e) {
    let url = $("#urlControl").val();
    optionObject.url = url;
    console.log(url.length);
    if (url.length > 0) {
      $("#xp-title").removeClass("disable");
      $("#xp-path").removeClass("disable");
    } else {
      $("#xp-title").addClass("disable");
      $("#xp-path").addClass("disable");
    }
  });

  $("#xp-path").on("input", function (e) {
    let xppath = $("#xpathControl").val();
    if (xppath.length > 0) {
      $("#xp-type").removeClass("disable");
      $("#addxpbtn").removeClass("disable");
    } else {
      $("#xp-type").addClass("disable");
      $("#addxpbtn").addClass("disable");
    }
  });

  var xpaths = []
  $("#addxpbtn").on("click", function () {
    $(".xpath-table").removeClass("hide");
    let xppath = $("#xpathControl").val();
    let xptype = $("#dropdown").val();
    xpaths.push({ xppath, xptype });
    optionObject.xpaths = xpaths;
    $("#addpage").removeClass("disable");
    $("#xpaths-viewer").append('<tr><th scope="row">' + xppath + '</th><td>' + xptype + '</td><td> <button id="addpage" class="wc-btn">Edit </button><button id="addpage" class="wc-btn">Delete </button></td></tr>');
  });



  // let url = $("#urlControl").val();
  // let name = $("#nameControl").val();
  // let url = $("#urlControl").val();

  $("body").on("click", "#back", function () {
    $(".xpath-table").addClass("hide");
    $(".xpath-table").addClass("hide");
    $("#addxpbtn").addClass("disable");
    $("#xp-type").addClass("disable");
    $("#xp-title").addClass("disable");
    $("#xp-path").addClass("disable");
    $("#urlForm").addClass("disable");
    var praseObject = Number($(this).attr('value')) + 1;
    //use this to data to reset the pagination and forms
    //do it later
    $(".mainpage").html("Main Page");
    $("#editpage").addClass("hide");
    $("#addpage").removeClass("hide");
    $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of ' + (praseObject));
    //set options from 
    $("#nameControl").val("");
    $("#urlControl").val("");
    $("#xpathControl").val("");
  });

  //on refresh
  updateForms();

  $("#pag-next").on("click", function () {
    $("#xpaths-viewer").html("");
    $(".xpath-table").removeClass("hide");
    $("#addxpbtn").removeClass("disable");
    $("#xp-type").removeClass("disable");
    $("#xp-title").removeClass("disable");
    $("#xp-path").removeClass("disable");
    $("#urlForm").removeClass("disable");
    chrome.storage.local.get(['options'], function (result) {
      if (currentPage <= result.options.length) {
        currentPage++;
      }
      if (currentPage <= (result.options.length + 1)) {
        console.log(result.options);
        $(".options-wrapper-pagination > div:nth-child(1)> div").html(currentPage + ' of ' + (result.options.length + 1));
        //set options from 
        $("#nameControl").val(result.options[currentPage - 2].name);
        $("#urlControl").val(result.options[currentPage - 2].url);
        $(".xpath-table").removeClass("hide");
        result.options[currentPage - 2].xpaths.map((val, index) => {
          $("#xpaths-viewer").append('<tr><th scope="row">' + val.xppath + '</th><td>' + val.xptype + '</td><td> <button id="addpage" class="wc-btn">Edit </button><button id="addpage" class="wc-btn">Delete </button></td></tr>');
        });
      }
      $("#editpage").removeClass("hide");
      $("#addpage").addClass("hide");
      $(".mainpage").html("<a id='back' href='#!' value='" + result.options.length + "' >Main Page</a> > " + result.options[currentPage - 2].name);

    });
  });



  $("#pag-prev").on("click", function () {
    $("#xpaths-viewer").html("");
    if (currentPage > 1) {
      currentPage--;
      chrome.storage.local.get(['options'], function (result) {
        if (currentPage <= (result.options.length + 1)) {
          $(".options-wrapper-pagination > div:nth-child(1)> div").html(currentPage + ' of ' + (result.options.length + 1));

          if (currentPage === 1) {
            $(".xpath-table").addClass("hide");
            $(".xpath-table").addClass("hide");
            $("#addxpbtn").addClass("disable");
            $("#xp-type").addClass("disable");
            $("#xp-title").addClass("disable");
            $("#xp-path").addClass("disable");
            $("#urlForm").addClass("disable");
            //reset options from 
            $("#nameControl").val("");
            $("#urlControl").val("");
            $("#xpathControl").val("");
            $(".mainpage").html("Main Page ");
            $("#editpage").addClass("hide");
            $("#addpage").removeClass("hide");
          } else {
            //set options from 
            $("#nameControl").val(result.options[currentPage - 2].name);
            $("#urlControl").val(result.options[currentPage - 2].url);
            $(".xpath-table").removeClass("hide");
            result.options[currentPage - 2].xpaths.map((val, index) => {
              $("#xpaths-viewer").append('<tr><th scope="row">' + val.xppath + '</th><td>' + val.xptype + '</td><td> <button id="addpage" class="wc-btn">Edit </button><button id="addpage" class="wc-btn">Delete </button></td></tr>');
            });
          }
          $(".mainpage").html("<a id='back' href='#!' value='" + result.options.length + "' >Main Page</a> > " + result.options[currentPage - 2].name);
          $("#editpage").removeClass("hide");
          $("#addpage").addClass("hide");
          //$(".mainpage").html("Main Page > "+result.options[currentPage-2].name);
        }
      });
    }

  });

  $("#addpage").on("click", function () {

    // jQuery.post('./client/config.json', { name: "John", time: "2pm" })
    // .done(function( data ) {
    //   alert( "Data Loaded: " + data );
    // });
    // jQuery.get('./client/config.json',function(data){
    //   alert(JSON.stringify(data));
    // });
    
    $("#xpaths-viewer").html("");
    $(".xpath-table").addClass("hide");
    // let name = $("#nameControl").val();
    // let url = $("#urlControl").val();
    // let xPath = ""; //get it from storage
    // let captureType = ""; //get it from storage

    // const optionObject = {
    //   name: name,
    //   url: url,
    //   xPaths: [{xPath, captureType}]
    // }

    let optionsList = [];
    //fetch from existing storage
    console.log(optionObject);
    //append to the storage object
    optionsList.push(optionObject);
    //send it back to background js 
    chrome.runtime.sendMessage({ type: "optionsAdd", optionsList: optionsList },
      function (response) {
        //notification message for active/inactive successful
        console.log(response);
        if (response.status) {
          //update pagination   

          $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of ' + (response.response.length + 1));


          //reset form 
          $("#nameControl").val("");
          $("#urlControl").val("");
          $("#xpathControl").val("");

          notify("XPath has been added successfuly.");



        } else {
          console.error("Something went wrong. Please connect with the administrator.");
        }

      });
  });

  function notify(msg) {

    $(".notify").animate({
      right: "2vw"
    }, function () {
      setTimeout(function () {
        $(".notify").animate({
          right: "-200vw"
        })
      }, 1000);
    });

  }

  $("#deletepage").on("click", function () {

    chrome.storage.local.get(['options'], function (result) {
      //delete this element from 
      console.log(result.options);

      let newArr = result.options[currentPage - 1].splice(currentPage, 1);


      chrome.runtime.sendMessage({ type: "optionsDelete", optionsList: newArr },
        function (response) {
          //   //notification message for active/inactive successful
          //   console.log(response);
          if (response.status) {
            location.reload();
            //     //update pagination 

            // if(currentPage === 1){
            //   $(".options-wrapper-pagination > div:nth-child(1)> div").html('1 of ' + ((response.response.length + 1)-1));
            // }else{
            //   $(".options-wrapper-pagination > div:nth-child(1)> div").html(currentPage-1+' of ' + ((response.response.length + 1)-1));
            // }



            //     //reset form 
            //     $("#nameControl").val("");
            //     $("#urlControl").val("");
            //     $("#xpathControl").val("");




          } else {
            console.error("Something went wrong. Please connect with the administrator.");
          }

        });


      $(".options-wrapper-pagination > div:nth-child(1)> div").html(currentPage + ' of ' + (result.options.length));



      console.log(result);
    });

  });
});