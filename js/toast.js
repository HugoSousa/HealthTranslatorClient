chrome.runtime.onMessage.addListener(function(request, sender, response) {
	if(request.success){
		toastr.info("The concept was successfully submitted! Thank you for your cooperation.");
	}else{
		toastr.warning(request.reason);
	}
});