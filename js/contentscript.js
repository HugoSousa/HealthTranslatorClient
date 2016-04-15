$(document).ready(function(){ 

	console.log("The page is ready");
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

	
	observer = new MutationObserver(function(mutations, observer) {

	    console.log("Change in the DOM - Processing the document again");
	    console.log(mutations);

		for(var i = 0; i < mutations.length; i++){

	    	if(mutations[i].addedNodes.length > 0){

		    	var jq = $(mutations[i].addedNodes);
			    if(! jq.is("script")){
				    console.log(jq);

				    var data = {
						body: LZString.compressToUTF16($('body').clone().find('script').remove().end().html()),
						language: $("body").attr('health-translator-lang')
					};
					console.log("DATA REPLACE AGAIN");
					console.log(data);


					var tx = performance.now();

				    chrome.runtime.sendMessage({action: "processDocumentAgain", data: data}, function(response){
				    	console.log("RECEIVED PROCESS DOCUMENT AGAIN!");
				    	replaceDocument(response);
				    	tz = performance.now();
				    	console.log("Processed document again in " + (tz - tx) + "ms.");
				    });
				}
			}
		}

	});

	observeMutations = function (){
		observer.observe(document.body, {
			childList: true,
			subtree: true
		});
		//console.log("Observing mutations");

	}

	disconnectObserver = function (){
		observer.disconnect();
		//console.log("Disconnected Observer");
	}

	observeMutations();

	function replaceDocument(response, selector){

		console.log("Response is returned after " + (t1 - t0) + "ms.");

		if(response.processed == false){
			console.log(response.exception);
		}

		if(typeof response.conceptCounter == "undefined"){
			console.log("An error occurred");
		}else if(response.conceptCounter > 0){

			var t1 = performance.now();

			disconnectObserver();

			var scripts = Array.prototype.slice.call(document.scripts);

			//var head_scripts = Array.prototype.slice.call(document.getElementsByTagName('head')[0].scripts);

			$('body').html(response.body);
		  	$('body').append(modal); 
		  	$('body').append(modalRating);
		  	$('body').attr('health-translator-lang', response.language);


		  	/*
		  	for(var i = 0; i < scripts.length; i++){
		  		if(scripts[i].parentNode != null && scripts[i].parentNode.localName == 'head'){
		  			document.getElementsByTagName('head')[0].removeChild(scripts[i]);
		  		}
		  	}
		  	*/
		  	//$('head script').remove();
			for(var i = 0; i < scripts.length; i++){
				//console.log(scripts[i]);
				/*
				var script = document.createElement('script');
				script.innerHTML = scripts[i].innerHTML;
				if(scripts[i].src){
					script.src = scripts[i].src;
				}

				//console.log("Append to body");
				document.body.appendChild(script);
				*/
				if( scripts[i].parentNode == null || (scripts[i].parentNode != null && scripts[i].parentNode.localName != 'head')){
					var script = document.createElement('script');
					script.innerHTML = scripts[i].innerHTML;
					if(scripts[i].src){
						script.src = scripts[i].src;

					}
				}

				//disconnectObserver();
				if(scripts[i].parentNode != null && scripts[i].parentNode.localName == 'head'){
					var script = document.createElement('script');
					script.innerHTML = scripts[i].innerHTML;
					if(scripts[i].src){
						script.src = scripts[i].src;
					}

					//remove the old script and add the new one
					document.getElementsByTagName('head')[0].removeChild(scripts[i]);
					document.getElementsByTagName('head')[0].appendChild(script);
				}
				
			}

	  		registerEvents();

		  	var t2 = performance.now();
		  	console.log("Whole processing is finished after " + (t2 - t0) + "ms.");

		  	//the scripts in head make invisible DOM changes later
		  	setTimeout(function(){observeMutations();}, 50);

	  	}
	}

	function registerEvents(){
		console.log("REGISTER EVENTS");
		
		var timer;

		$('#health-translator-modal').on('show.bs.modal hide.bs.modal', function (e) {
			disconnectObserver();
		});

		$('#health-translator-modal').on('shown.bs.modal hidden.bs.modal', function (e) {
			observeMutations();
		});

		$('#health-translator-rating-modal').on('show.bs.modal', function (e) {
			disconnectObserver();

			$('#ht-rating-concept-name').text($('#health-translator-concept-name').text());

			if($('#health-translator-definition').children().length > 0){
				$('#ht-def-qual').show();
			}

			if($('#health-translator-references').children().length > 0){
				$('#ht-ext-refs-qual').show();
			}

			if($('#health-translator-relationships').children().length > 0){
				$('#ht-def-rels-qual').show();
			}
		});

		$('#health-translator-rating-modal').on('hidden.bs.modal', function (e) {

			$('ht-def-qual').hide();
			$('ht-def-ext-refs-qual').hide();
			$('ht-def-rels-qual').hide();
			$('ht-sel1').barrating('clear');
			$('ht-sel2').barrating('clear');
			$('ht-sel3').barrating('clear');
			$('ht-sel4').barrating('clear');

			observeMutations();
		});

		$('#ht-sel1').barrating({theme: 'bootstrap-stars'});
		$('#ht-sel2').barrating({theme: 'bootstrap-stars'});
		$('#ht-sel3').barrating({theme: 'bootstrap-stars'});
		$('#ht-sel4').barrating({theme: 'bootstrap-stars'});

		$('#ht-submit-rating').on('click', function (e) {

			var data = {};

			($('#ht-def-qual').css('display') == 'none') ? data.definition = -1 : data.definitions = parseInt($('#ht-sel1').val());
			($('#ht-refs-qual').css('display') == 'none') ? data.externalReferences = -1 : data.externalReferences = parseInt($('#ht-sel2').val());
			($('#ht-rels-qual').css('display') == 'none') ? data.relationships = -1 : data.relationships = parseInt($('#ht-sel3').val());
			data.general = parseInt($('#ht-sel4').val());
			data.language = $("body").attr('health-translator-lang');
			data.cui = $('#health-translator-modal').attr('data-cui');

			
			chrome.runtime.sendMessage({action: "submitRating", data: data}, function(response){
				if(response.success){
					$('#health-translator-rating-modal').modal('toggle');
					$('#health-translator-footer').empty();
					//delete the button
				}
				//on success, delete the button from the previous modal
		    });

			//observeMutations();
		});

		$('body').tooltip({
		    delay: {show: 300, hide: 350},
		    animation: false,
		    placement: 'auto right',
		    template: '<div class="health-translator tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		    selector: '.medical-term-translate'
		})

	    $('body').on('hidden.bs.tooltip shown.bs.tooltip', function () {
			observeMutations();
		});

		$('body').on('hide.bs.tooltip show.bs.tooltip', function () {
			disconnectObserver();
		});

		$('body').on('click', '.tooltip a', function(){

			$('#health-translator-loading').show();

			console.log("Abri um tooltip");

			var tooltip = $(this).closest('.tooltip')
			var tooltip_id = tooltip.attr('id');
			var conceptSpan = $('.medical-term-translate[aria-describedby="' + tooltip_id + '"]');
			var term = conceptSpan.attr('data-term');
			var cui = conceptSpan.attr('data-cui');
			var lang = $("body").attr('health-translator-lang')
			tooltip.tooltip("hide");

			disconnectObserver();
			$('#health-translator-concept-name').text(term);
			observeMutations();
			$('#health-translator-modal').attr('data-cui', cui);

			var conceptData = {
				cui: cui,
				string: term,
				language: lang
			};

			chrome.runtime.sendMessage({action: "details", data: conceptData}, function(response){

				disconnectObserver();

				$('#health-translator-loading').hide();

				if(response.definition){
					$('#health-translator-definition').prepend("<h4 class=\"text-center\">Definition</h4>");
				}else{
					$('#health-translator-definition').prepend("<h4 class=\"text-center\">No definition found!</h4>");
				}

				console.log(response.relationships);
				var rels = response.relationships;

				if(! $.isEmptyObject(rels)){
					console.log("append relationships");
					$('#health-translator-relationships').prepend("<h4 class=\"text-center\">Relationships</h4>");

					var tree = [];
					for (var key in rels) {

						console.log("RELATIONSHIP: " + key);
						console.log("TRANSLATION: " + (relationships_dictionary[key] || key));
						var node = { text: key, nodes: [], tags: [], selectable: false };
						tree.push(node);

					    // skip loop if the property is from prototype
					    if (!rels.hasOwnProperty(key)) continue;

					    var relsList = rels[key];
					    node.tags.push(relsList.length);

					    for (var i = 0; i < relsList.length; i++) {

					    	var relationship = relsList[i];
					        var childNode = { text: relationship.concept2, selectable: false };
				        	node.nodes.push(childNode);
					        
					    }				
					}
					console.log(tree);

					$('#health-translator-relationships-tree').treeview({
						data: tree, 
						levels: 0, 
						showBorder: false, 
						showTags: true, 
						collapseIcon: "glyphicon glyphicon-chevron-down",
						expandIcon: "glyphicon glyphicon-chevron-right"
					});

					$('#health-translator-relationships').on('mousedown', function(event) {
						//console.log("CLICK RELATIONSHIPS");
						disconnectObserver();
					});

					$('#health-translator-relationships').on('nodeCollapsed nodeExpanded', function(event) {
						//console.log("NODE COLLAPSED OR EXPANDED");
						//timeout for DOM changes
						setTimeout(function(){ observeMutations(); }, 5);
					});
				}

				var semantic_types_string = "";
				for(var i = 0; i < response.semanticTypes.length; i++){
					semantic_types_string += response.semanticTypes[i];
					if(i < response.semanticTypes.length - 1)
						semantic_types_string += " | ";
				}

				$('#health-translator-semantic-type').text(semantic_types_string);
				

				if(response.references.length == 0){
					console.log("No refs");
					$('#health-translator-references').append("<h4>No external references found.</h4>");
				}else{
					$('#health-translator-references').append("<h4>External References</h4>");
					response.references.forEach(function(obj) {
						//console.log(obj);
						var url = obj.url;
						var label = obj.label;
						var source = obj.source;
						$('#health-translator-references').append("<div><a href=\""+ url + "\" target=\"_blank\">" + source + " - " + label + "</a>");
					});
				}

				
				if(! response.hasRating){
					$('#health-translator-footer').append('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#health-translator-rating-modal">Rate This</button>');
				}
				

				observeMutations();
			});
			
		});

		$('#health-translator-modal').on('hidden.bs.modal', function () {

			disconnectObserver();
			console.log("Hidden modal");
			
			//delete modal data
			$('#health-translator-concept-name').empty();
			$('#health-translator-semantic-type').empty();
			$('#health-translator-definition').empty();
			$('#health-translator-references').empty();
			$('#health-translator-relationships').empty();
			$('#health-translator-loading').show();
			$('#health-translator-footer').empty();
			observeMutations();
		});
	};
	
	var bodyData = {
		//remove scripts in order to remove unnecessary chunks of text in request
		//scripts are manually added in the response
		body: LZString.compressToUTF16($('body').clone().find('script').remove().end().html())
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
modal += "			<div class=\"text-center\" id=\"health-translator-references\">";
modal += "			<\/div>";
modal += "			<div id=\"health-translator-relationships\">";
modal += "				<div id=\"health-translator-relationships-tree\"><\/div>";
modal += "			<\/div>";
modal += "      <\/div>";
modal += "      <div id=\"health-translator-footer\" class=\"modal-footer text-center\">";
//modal += "        <button type=\"button\" class=\"btn btn-primary\">Rate This<\/button>";
modal += "      <\/div>";
modal += "    <\/div>";
modal += "  <\/div>";
modal += "<\/div>";
modal += "<\/div>";

var modalRating="";
modalRating += "<div class=\"health-translator\">";
modalRating += "	<div class=\"modal fade\" id=\"health-translator-rating-modal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"health-translator-rating-modal-label\" data-backdrop=\"static\" data-keyboard=\"false\">";
modalRating += "	  <div class=\"modal-dialog\" role=\"document\">";
modalRating += "	    <div class=\"modal-content\">";
modalRating += "	      <div class=\"modal-header\">";
modalRating += "	        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;<\/span><\/button>";
modalRating += "	        <h4 id=\"ht-rating-concept-name\"><\/h4>";
modalRating += "	      <\/div>";
modalRating += "	      <div class=\"modal-body\">";
modalRating += "	      	<div>";
modalRating += "	      		<div class=\"text-center\">";
modalRating += "	      			<div id=\"ht-def-qual\" style=\"display:none\">";
modalRating += "			      		<p>Definition Quality<\/p>";
modalRating += "			      		<select id=\"ht-sel1\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "					<\/div>";
modalRating += "					<div id=\"ht-ext-refs-qual\" style=\"display:none\">";
modalRating += "		      			<p>External References Quality<\/p>";
modalRating += "		      			<select id=\"ht-sel2\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "		      		<\/div>";
modalRating += "		      		<div id=\"ht-rels-qual\" style=\"display:none\">";
modalRating += "		      			<p>Relationships Quality<\/p>";
modalRating += "			      		<select id=\"ht-sel3\" class=\"pull-right\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "		      		<\/div>";
modalRating += "		      		<div id=\"ht-general-qual\">";
modalRating += "		      			<p>General Evaluation<\/p>";
modalRating += "		      			<select id=\"ht-sel4\" class=\"pull-right\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "		      		<\/div>";
modalRating += "      			<\/div>";
modalRating += "	      	<\/div>";
modalRating += "	      <div class=\"modal-footer\" style=\"text-align:center\">";
modalRating += "	        <button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Cancel<\/button>";
modalRating += "	        <button type=\"button\" class=\"btn btn-primary\" id=\"ht-submit-rating\">Submit<\/button>";
modalRating += "	      <\/div>";
modalRating += "	    <\/div>";
modalRating += "	  <\/div>";
modalRating += "	<\/div>";
modalRating += "<\/div>";

//allow tooltip to keep open while hovering it
var originalLeave = $.fn.tooltip.Constructor.prototype.leave;

var relationships_dictionary = {
	inverse_isa: "some_other_string"
};

