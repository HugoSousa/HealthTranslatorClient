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
            console.log("result conceptCounter: " + result.conceptCounter);
            doInCurrentTab( function(tab){ 
                chrome.browserAction.setBadgeText({
                    text: result.conceptCounter.toString(), 
                    tabId: tab.id
                });
            } );
            
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

function doInCurrentTab(tabCallback) {
    chrome.tabs.query(
        { currentWindow: true, active: true },
        function (tabArray) { tabCallback(tabArray[0]); }
    );
}