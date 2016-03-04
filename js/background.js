/*chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
   //alert(changeInfo.url);
}); 
*/
chrome.tabs.onActivated.addListener(function(activeInfo) {
  // how to fetch tab url using activeInfo.tabid
  //console.log("TAB ACTIVATED");

  chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { //tabCallback(tabArray[0]);
        	//console.log(JSON.stringify(tabArray[0]));
        }
    );
}); 


chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
	//console.log(JSON.stringify(changeInfo));
    if(changeInfo.status != "complete"){
    	//console.log("do nothing")
    	return; // URL did not change
    }
    // Might be better to analyze the URL to exclude things like anchor changes

    /* ... */
    //console.log("TAB UPDATED");
    //console.log(changeInfo.status);

    var number = Math.random() * (10 - 0) + 0;
    var cenas = parseInt(number).toString();
    chrome.browserAction.setBadgeText({text: cenas, tabId: tabId});
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("here");

    if (!request.action) {
        console.log('invalid command: ', request);
        return;
    }

    switch (request.action) {
        case 'processDocument':
            console.log("PROCESS ON BACKGROUND");
            var result = processDocument(request.data, sendResponse);
            return true;
            break;
        case 'details':
            console.log("DETAILS ON BACKGROUND");
            var result = getDetails(request.data, sendResponse);
            return true;
            break;
    }

    return true;
});


function processDocument(data, sendResponse){

    console.log("DATA: " + JSON.stringify(data));

    $.ajax({
        url: "http://localhost:8080/HealthTranslatorServer/webresources/process",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function(result){
            console.log("return result");
            sendResponse(result);
        },
        error: function(error){
            console.log("ERROR: " + error);
            sendResponse(result);
        }
    });
}

function getDetails(data, sendResponse){

    console.log(data);

    $.ajax({
        url: "http://localhost:8080/HealthTranslatorServer/webresources/details",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function(result){
            console.log("RESULT: \n" + result.result);
            sendResponse(result);
        },
        error: function(error){
            console.log("ERROR: " + error);
            sendResponse(result);
        }
    });
}