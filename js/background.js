var SERVER_URL = 'http://healthtranslator.fe.up.pt:8080';
//var SERVER_URL = 'http://localhost:8080';

var settings = new Store("settings", {
    "mode": "click",
    "definition_filter": "yes",
    "chv_only": "yes",
    "sty_filter": "all",
    "lang_en": true,
    "lang_pt": true,
    "lang_content": "detected",
    "ext_refs": false,
    "concept_color": "#ffff66",
    "sty_5": true,
    "sty_7": true,
    "sty_19": true,
    "sty_20": true,
    "sty_23": true,
    "sty_29": true,
    "sty_30": true,
    "sty_37": true,
    "sty_46": true,
    "sty_47": true,
    "sty_48": true,
    "sty_59": true,
    "sty_60": true,
    "sty_61": true,
    "sty_109": true,
    "sty_116": true,
    "sty_121": true,
    "sty_125": true,
    "sty_126": true,
    "sty_127": true,
    "sty_129": true,
    "sty_130": true,
    "sty_131": true,
    "sty_184": true,
    "sty_190": true,
    "sty_194": true,
    "sty_195": true,
    "sty_200": true,
    "sty_204": true
});

changeExecutionMode();

chrome.contextMenus.create({
    id: "cm",
    contexts: ["selection"],
    title: chrome.i18n.getMessage("suggest_concept")
});

chrome.contextMenus.create({
    id: "cm_en",
    contexts: ["selection"],
    parentId: "cm",
    title: chrome.i18n.getMessage("english")
});

chrome.contextMenus.create({
    id: "cm_pt",
    contexts: ["selection"],
    parentId: "cm",
    title: chrome.i18n.getMessage("portuguese")
});


chrome.contextMenus.onClicked.addListener(function(info, tab){

    data = {};
    data.suggestion = info.selectionText;

    if(info.menuItemId == "cm_en"){
        data.language = "en";
    }else if(info.menuItemId == "cm_pt"){
        data.language = "pt";
    }

    sendSuggestion(data, tab);
});

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {

    if (!request.action) {
        console.log('invalid command: ', request);
        return;
    }

    switch (request.action) {
        case 'processDocument':
            //console.log("PROCESS ON BACKGROUND");
            processDocument(request.data, sender.tab.id, sendResponse);
            return true;
            break;
        case 'details':
            //console.log("DETAILS ON BACKGROUND");
            getDetails(request.data, sendResponse);
            return true;
            break;
        case 'submitRating':
            //console.log("SUBMIT RATING");
            submitRating(request.data, sendResponse);
            return true;
            break;
        case 'getContentLanguage':
            //console.log("GET CONTENT LANGUAGE");
            getContentLanguage(request.data, sendResponse);
            return true;
            break;
        case 'detectLanguage':
            //console.log("DETECT LANGUAGE");
            chrome.tabs.detectLanguage(sender.tab.id, function(language){
                response = {};
                response.language = language;
                if(isSupportedLanguage(language)){
                    response.supported = true;
                }else{
                    response.supported = false;
                }
                sendResponse(response);
            });
            return true;
            break;
        case 'setBadgeText':
            setBadgeText(sender.tab.id, request.count.toString());
            return;
            break;
        case 'ping':
            ping(sender.tab.id, sendResponse);
            return true;
            break;
        case 'getColor':
            sendResponse(settings.get("concept_color"));
            break;
        case 'getExecutionMode':
            var mode = settings.get("mode");
            if(mode == "always"){
                chrome.browserAction.setBadgeText({
                    text: "...", 
                    tabId: sender.tab.id
                });
            }
            sendResponse(mode);
            break;
    }

    return;
});


function ping(tabId, sendResponse){
    $.ajax({
        url: SERVER_URL + "/HealthTranslatorServer/webresources/ping",
        type: "GET",
        success: function(result){
            sendResponse({success: true});
        },
        error: function(error){
            sendResponse({success: false});
        }
    });
}

function processDocument(data, tabId, sendResponse){

    addSettingsData(data);

    /*
    var dt = new Date();
    var time = dt.getHours() + ":" + dt.getMinutes() + ":" + dt.getSeconds() + ":" + dt.getMilliseconds();
    console.log(time);
    */

    $.ajax({
        url: SERVER_URL + "/HealthTranslatorServer/webresources/process",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-16",
        cache: false,
        success: function(result){

            //sendResponse(result);
            
            //console.log("return result");
            //console.log("result conceptCounter: " + result.conceptCounter);
            //var badgeText;
            //var count = result.changes.length;
            //console.log("COUNT: " + count);

            //updateCount(count, true, tabId);

            //setBadgeText(tabId, badgeText);
            sendResponse(result);
            
        },
        error: function(error){
            console.log("ERROR: " + JSON.stringify(error));

            //setBadgeText(tabId, "-");

            sendResponse(error);
        }
    });
}

function getDetails(data, sendResponse){

    console.log(data);
    data.includeEnglishRefs = settings.get("ext_refs");
    data.tuid = getTUID();

    $.ajax({
        url: SERVER_URL + "/HealthTranslatorServer/webresources/details",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function(result){
            console.log(data.language);
            if(settings.get("lang_content") == "detected"){
                result.language = data.language;
            }else{
                result.language = settings.get("lang_content");
            }
            
            sendResponse(result);
        },
        error: function(error){
            console.log("ERROR: " + JSON.stringify(error));
            sendResponse(error);
        }
    });
}

function sendSuggestion(data, tab){

    data.tuid = getTUID();

    $.ajax({
        url: SERVER_URL + "/HealthTranslatorServer/webresources/suggest",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function(result){
            result.type = "suggestion";
            chrome.tabs.sendMessage(tab.id, result);
        },
        error: function(error){
            chrome.tabs.sendMessage(tab.id, {type:"suggestion", success: false, reason: "There was an unexpected error on the request."});
            console.log("ERROR: " + JSON.stringify(error));
        }
    });
}

function submitRating(data, sendResponse){

    data.tuid = getTUID();

    $.ajax({
        url: SERVER_URL + "/HealthTranslatorServer/webresources/rating",
        type: "POST",
        data: JSON.stringify(data),
        dataType: 'json',
        contentType: "application/json;charset=UTF-8",
        cache: false,
        success: function(result){
            sendResponse(result);
        },
        error: function(error){
            console.log("ERROR: " + JSON.stringify(error));
            sendResponse(error);
        }
    });
}

function getContentLanguage(data, sendResponse){
    response = {};

    if(settings.get("lang_content") == "detected"){
        response.language = data.language;
    }else{
        response.language = settings.get("lang_content");
    }

    sendResponse(response);
}

function isSupportedLanguage(language){
    if(language == "pt" && settings.get("lang_pt") == true)
        return true;
    if(language == "en" && settings.get("lang_en") == true)
        return true;

    return false;
}

function addSettingsData(data){
    data.styFilter = settings.get("sty_filter");
    data.recognizeOnlyCHV = (settings.get("chv_only") == "yes") ? true : false;
    data.recognizeWithoutDefinition = (settings.get("definition_filter") == "yes") ? true : false;
    var supportedLanguages = []
    if(settings.get("lang_en") == true) supportedLanguages.push("en");
    if(settings.get("lang_pt") == true) supportedLanguages.push("pt");
    data.supportedLanguages = supportedLanguages;
    data.contentLanguage = settings.get("lang_content");
    var semanticTypes = [];
    for(var i = 0; i <= 204; i++){
        var sty = "sty_" + i;
        var accepted = settings.get(sty);
        if(accepted == true)
        {
            sty_format = "T"

            if(i < 10)
                sty_format += "00"
            else if(i < 100)
                sty_format += "0"
            sty_format += i;

            semanticTypes.push(sty_format);
        }
    }
    data.semanticTypes = semanticTypes;
}

function browserActionCallback(tab){

    chrome.browserAction.getBadgeText({tabId: tab.id}, function(result){
        if(result === "" || result === "-"){
            chrome.browserAction.setBadgeText({
                text: "...", 
                tabId: tab.id
            });
            //injectScriptsAndCSS(tab.id);
            chrome.tabs.sendMessage(tab.id, {action: "init"});
        }else{
            chrome.tabs.sendMessage(tab.id, {type:"process", alert: "This page was already processed"});
            //alert("This page was already processed.");
        }

    });
}

function changeExecutionMode(){
    //console.log("MODE CHANGED: " + settings.get("mode"));
    var mode = settings.get("mode");
    if(mode == 'click'){
        chrome.browserAction.setTitle({
            title: chrome.i18n.getMessage("manualProcess")
        });
        //chrome.tabs.onUpdated.removeListener(tabUpdatedCallback);
        chrome.browserAction.onClicked.addListener(browserActionCallback);
    }else if(mode == 'always'){
        chrome.browserAction.setTitle({
            title: chrome.i18n.getMessage("automaticProcess")
        });
        chrome.browserAction.onClicked.removeListener(browserActionCallback);
        //chrome.tabs.onUpdated.addListener(tabUpdatedCallback);
    }
}

function getTUID(){

    var id = settings.get("tuid");
    if(typeof id === "undefined"){
        tuid(function(tuid){
          settings.set("tuid", tuid);
          return tuid;
        });
    }

    return id; 
}

function setBadgeText(tabId, text){
    if(parseInt(text) < 0)
        text = "0";

    chrome.browserAction.setBadgeText({
        text: text, 
        tabId: tabId
    });
}
