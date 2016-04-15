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

	if(typeof observer !== "undefined")
		disconnectObserver();

	if(request.type == "suggestion"){	
		if(request.success){
			toastr.info("The concept was successfully submitted! Thank you for your cooperation.", title);
		}else{
			toastr.warning(request.reason, title);
		}
	}else if(request.type == "process"){
		toastr.warning(request.alert, title);
	}

	if(typeof observer !== "undefined")
		observeMutations();

});