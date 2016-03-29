$(document).ready(function(){ 

	console.log("The page is ready");
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	var observer = new MutationObserver(function(mutations, observer) {
	    // fired when a mutation occurs
	    //cancel active ajax request and send again
	    console.log("Change in the DOM - Processing the document again");

	    var bodyData = {
			body: LZString.compressToUTF16($('body').find('script').remove().end().html())
		};

		var tx = performance.now();

	    chrome.runtime.sendMessage({action: "processDocumentAgain", data: bodyData}, function(response){
	    	console.log("RECEIVED PROCESS DOCUMENT AGAIN!");
	    	replaceDocument(response);
	    	tz = performance.now();
	    	console.log("Processed document again in " + (tz - tx) + "ms.");
	    });

	});

	observeMutations(observer);

	function observeMutations(observer){
		observer.observe(document, {
			childList: true,
			subtree: true
		});
	}

	function replaceDocument(response){

		console.log("Response is returned after " + (t1 - t0) + "ms.");

		if(typeof response.conceptCounter == "undefined"){
			console.log("An error occurred");
		}else if(response.conceptCounter > 0){

			var t1 = performance.now();

			observer.disconnect();

			var scripts = Array.prototype.slice.call(document.scripts);
			//console.log(scripts);
			//console.log("DATE1: " + new Date().getTime());
			$('body').html(response.body);
		  	$('body').append(modal); 
		  	//console.log("DATE2: " + new Date().getTime());

			for(var i = 0; i < scripts.length; i++){
				//console.log(scripts[i]);
				//console.log(scripts[i].parentNode);
				if( scripts[i].parentNode == null || (scripts[i].parentNode != null && scripts[i].parentNode.localName != 'head')){
					var script = document.createElement('script');
					script.innerHTML = scripts[i].innerHTML;
					script.src = scripts[i].src;
					document.body.appendChild(script);
				}
			}

		  	registerEvents();
		  	var t2 = performance.now();
		  	console.log("Whole processing is finished after " + (t2 - t0) + "ms.");
	  	}

	  	observeMutations(observer);
	}

	function registerEvents(){
		
		console.log("REGISTERING TOOLTIPS");
		var timer;

		$('.medical-term-translate[data-toggle="tooltip"]').tooltip({
		    trigger: 'manual',
		    animation: false,
		    placement: "auto right",
		    container: "body",
		    template: '<div class="health-translator tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
		}).on("mouseenter", function () {
	        var _this = this;

	        timer = setTimeout(function () {
	        	observer.disconnect();
                $(_this).tooltip("show");
                observeMutations(observer);
        	}, 450);
	        
	        
	        $(".tooltip").on("mouseleave", function () {
	        	observer.disconnect();
	            $(_this).tooltip('hide');
	            observeMutations(observer);
	        });

	    }).on("mouseleave", function () {
	        var _this = this;

	        clearTimeout(timer);

	        setTimeout(function () {
	            if (!$(".tooltip:hover").length) {
	            	observer.disconnect();
	                $(_this).tooltip("hide");
	                observeMutations(observer);
	            }
        	}, 300);
	    });


		$('body').on('click', '.tooltip a', function(){

			observer.disconnect();

			$('#health-translator-loading').show();

			console.log("Abri um tooltip");

			var tooltip = $(this).closest('.tooltip')
			var tooltip_id = tooltip.attr('id');
			var conceptSpan = $('.medical-term-translate[aria-describedby="' + tooltip_id + '"]');
			var term = conceptSpan.attr('data-term');
			var cui = conceptSpan.attr('data-cui');
			var lang = conceptSpan.attr('data-lang');
			tooltip.tooltip("hide");

			$('#health-translator-concept-name').text(term);

			var conceptData = {
				cui: cui,
				string: term,
				language: lang
			};

			chrome.runtime.sendMessage({action: "details", data: conceptData}, function(response){

				$('#health-translator-loading').hide();

				//set the semantic types
				console.log(response.stys);
				if(response.stys.length == 1){
					console.log(response.stys[0]);
					$('#health-translator-semantic-type').append(response.stys[0]);
				}else{
					console.log("There's more than 1 semantic type for this CUI.");
				}

				if(response.refs.length == 0){
					console.log("No refs");
					$('#health-translator-references').append("<h4>No external references found.</h4>");
				}else{
					$('#health-translator-references').append("<h4>External References</h4>");
					response.refs.forEach(function(obj) {
						console.log(obj);
						var url = obj.url;
						var label = obj.label;
						var source = obj.source;
						$('#health-translator-references').append("<div><a href=\""+ url + "\" target=\"_blank\">" + source + " - " + label + "</a>");
					});
				}

				observeMutations(observer);
			});
			
		});

		$('#health-translator-modal').on('hidden.bs.modal', function () {

			observer.disconnect();
			console.log("Hidden modal");
			
			//delete modal data
			$('#health-translator-concept-name').empty();
			$('#health-translator-semantic-type').empty();
			$('#health-translator-definition').empty();
			$('#health-translator-references').empty();
			$('#health-translator-relationships').empty();
			$('#health-translator-loading').show();

			observeMutations(observer);
		});
		
	};

	//console.log("BODY: " + $('body').html());
	//console.log($('body').html());
	var bodyData = {
		//remove scripts in order to remove unnecessary chunks of text in request
		//scripts are manually added in the response
		body: LZString.compressToUTF16($('body').find('script').remove().end().html())
		//body: document.documentElement.outerHTML
	};



	//console.log("BODY: " + getDocTypeAsString() + document.documentElement.outerHTML );
	console.log("Start Processing.");
	//console.log("BODY: " + bodyData.body);
	//console.log("DECOMPRESSED BODY: " + LZString.decompress(bodyData.body))
	var t0 = performance.now();
	chrome.runtime.sendMessage({action: "processDocument", data: bodyData}, function(response){
	  	replaceDocument(response);	  	
	});
});

var modal="";
modal += "<!-- Modal -->";
modal += "<div class=\"health-translator\">";
modal += "<div class=\"modal fade\" id=\"health-translator-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"health-translator-modal-label\">";
modal += "  <div class=\"modal-dialog\" role=\"document\">";
modal += "    <div class=\"modal-content\">";
modal += "      <div class=\"modal-header\">";
modal += "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;<\/span><\/button>";
modal += "        <div class=\"modal-title\" id=\"health-translator-modal-label\">";
modal += "			<h4 id=\"health-translator-concept-name\"></h4>";		
modal += "			<h6 id=\"health-translator-semantic-type\"></h6>";	
modal += "        <\/div>";
modal += "      <\/div>";
modal += "      <div class=\"modal-body\">";
modal += "			<div id=\"health-translator-loading\" class=\"text-center\">";
modal += "				<img src=\"" + chrome.extension.getURL("images/loading.gif") + "\">";
modal += "      	<\/div>";
modal += "			<div id=\"health-translator-definition\">";
modal += "      	<\/div>";
modal += "			<br>";
modal += "			<div class=\"text-center\" id=\"health-translator-references\">";
modal += "			<\/div>";
modal += "			<br>";
modal += "			<div class=\"text-center\" id=\"health-translator-relationships\">";
modal += "			<\/div>";
modal += "      <\/div>";
modal += "      <div class=\"modal-footer text-center\">";
modal += "        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close<\/button>";
modal += "      <\/div>";
modal += "    <\/div>";
modal += "  <\/div>";
modal += "<\/div>";
modal += "<\/div>";