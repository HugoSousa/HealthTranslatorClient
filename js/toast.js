var observer;
var observeMutations;
var disconnectObserver;

toastr.options.preventDuplicates = true;

var title = "HealthTranslator";

toastr.options.onHidden = function() {

	if(typeof observer !== "undefined"){
		disconnectObserver();
	}
	
	$('div#toast-container').remove();

	//sometimes there' a conflict if a tooltip is opened at the same time
	//the timeout allows that the dom change is done before the observe
	if(typeof observer !== "undefined"){
		setTimeout(function () {
			observeMutations();
		}, 0);
	}
};

chrome.runtime.onMessage.addListener(function(request, sender, response) {

	chrome.runtime.sendMessage({action: "getContentLanguage", data: {language: $("body").attr('data-ht-lang')}}, function(response){

		var lang = response.language;

		if(typeof observer !== "undefined")
			disconnectObserver();

		if(request.type == "suggestion"){	
			if(request.success){
				toastr.info(i18n.get("suggestion_success", lang), title);
			}else{
				toastr.warning(i18n.get("suggestion_error", lang), title);
			}
		}else if(request.type == "process"){
			toastr.warning(i18n.get("already_processed", lang), title);
		}

		if(typeof observer !== "undefined")
			observeMutations();
	});

	

});