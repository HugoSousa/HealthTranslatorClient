var current_processing;

var settings = new Store("settings", {
    "mode": "click",
    "chv_only": "yes",
    "sty_filter": "sty_one",
    "lang_en": true,
    "lang_pt": true,
    "lang_content": "detected",
    "ext_refs": false,
    "sty_1": true,
    "sty_2": true
});
changeExecutionMode();

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("here");

    if (!request.action) {
        console.log('invalid command: ', request);
        return;
    }

    switch (request.action) {
        case 'processDocument':
            console.log("PROCESS ON BACKGROUND");
            console.log(sender.tab.id);
            var result = processDocument(request.data, sender.tab.id, sendResponse);
            return true;
            break;
        case 'details':
            console.log("DETAILS ON BACKGROUND");
            var result = getDetails(request.data, sendResponse);
            return true;
            break;
        case 'processDocumentAgain':
            console.log("ABORT PROCESSING");
            if(current_processing && current_processing.readyState != 4)
                current_processing.abort()
            var result = processDocument(request.data, sender.tab.id, sendResponse);
            return true;
            break;
    }

    return true;
});


function processDocument(data, tabId, sendResponse){

    //console.log("DATA: " + JSON.stringify(data));
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ":" + dt.getMilliseconds();
    console.log(time);

    current_processing = $.ajax({
        url: "http://localhost:8080/HealthTranslatorServer/webresources/process",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-16",
        cache: false,
        success: function(result){

            console.log("return result");
            console.log("result conceptCounter: " + result.conceptCounter);

            chrome.browserAction.setBadgeText({
                text: result.conceptCounter.toString(), 
                tabId: tabId
            });
            
            sendResponse(result);
        },
        error: function(error){
            console.log("ERROR: " + JSON.stringify(error));
            sendResponse(error);
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
            console.log("ERROR: " + JSON.stringify(error));
            sendResponse(error);
        }
    });
}

function browserActionCallback(tab){

    chrome.browserAction.getBadgeText({tabId: tab.id}, function(result){
        if(result === ""){
            chrome.browserAction.setBadgeText({
                text: "...", 
                tabId: tab.id
            });
            injectScriptsAndCSS(tab.id);
        }else{
            alert("This page was already processed.");
        }

    });
}

function tabUpdatedCallback(tabId, changeInfo, tab){
    console.log("STATUS:" + JSON.stringify(changeInfo));
    console.log("TAB:" + JSON.stringify(tab));
    if (changeInfo.status == 'complete' && tab.status == 'complete' && tab.url != undefined && tab.url.substring(0, 9) !== 'chrome://') {
        console.log("EXECUTE CONTENT SCRIPT");
        chrome.browserAction.setBadgeText({
            text: "...", 
            tabId: tab.id
        });
        injectScriptsAndCSS(tabId);
    }
}

function injectScriptsAndCSS(tabId){
    console.log("EXECUTED SCRIPTS");

    insertCSS(tabId, [
        { file: "css/contentscript.css" }, 
        { file: "css/scoped-health-translator.css" },
        { file: "css/bootstrap-treeview.min.css" },
    ]);

    executeScripts(tabId, [
        { file: "js/libs/jquery.min.js" },
        { file: "js/libs/bootstrap.js" },
        { file: "js/libs/lz-string.min.js" },
        { file: "js/libs/bootstrap-treeview.min.js" },
        { file: "js/contentscript.js"}
    ]);

    
}

function executeScripts(tabId, injectDetailsArray)
{
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.executeScript(tabId, injectDetails, innerCallback);
        };
    }

    var callback = null;

    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);

    if (callback !== null)
        callback();   // execute outermost function
}

function insertCSS(tabId, injectDetailsArray)
{
    function createCallback(tabId, injectDetails, innerCallback) {
        return function () {
            chrome.tabs.insertCSS(tabId, injectDetails, innerCallback);
        };
    }

    var callback = null;

    for (var i = injectDetailsArray.length - 1; i >= 0; --i)
        callback = createCallback(tabId, injectDetailsArray[i], callback);

    if (callback !== null)
        callback();   // execute outermost function
}

function changeExecutionMode(){
    console.log("MODE CHANGED: " + settings.get("mode"));
    var mode = settings.get("mode");
    if(mode == 'click'){
        chrome.tabs.onUpdated.removeListener(tabUpdatedCallback);
        chrome.browserAction.onClicked.addListener(browserActionCallback);
    }else if(mode == 'always'){
        chrome.browserAction.onClicked.removeListener(browserActionCallback);
        chrome.tabs.onUpdated.addListener(tabUpdatedCallback);
    }
}
