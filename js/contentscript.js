var originalLeave = $.fn.tooltip.Constructor.prototype.leave;

//override the tooltip leave, in order to stay open while hovering
$.fn.tooltip.Constructor.prototype.leave = function(obj){
	var self = obj instanceof this.constructor ? obj : $(obj.currentTarget)[this.type](this.getDelegateOptions()).data('bs.' + this.type)
	var container, timeout;

	originalLeave.call(this, obj);

	if(obj.currentTarget) {
	 container = self.$tip;
	 //container = $(obj.currentTarget).siblings('.tooltip')
	 timeout = self.timeout;
	 container.one('mouseenter', function(){
	   //We entered the actual tooltip – call off the dogs
	   clearTimeout(timeout);
	   //Let's monitor tooltip content instead
	   container.one('mouseleave', function(){
	     $.fn.tooltip.Constructor.prototype.leave.call(self, self);
	   });
	 })
	}
};

var modal="";
modal += "<!-- Modals -->";
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
modalRating += "			      		<select id=\"ht-sel1\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "					<\/div>";
modalRating += "					<div id=\"ht-ext-refs-qual\" style=\"display:none\">";
modalRating += "		      			<select id=\"ht-sel2\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "		      		<\/div>";
modalRating += "		      		<div id=\"ht-rels-qual\" style=\"display:none\">";
modalRating += "			      		<select id=\"ht-sel3\" class=\"pull-right\">";
modalRating += "						  <option value=\"1\">1<\/option>";
modalRating += "						  <option value=\"2\">2<\/option>";
modalRating += "						  <option value=\"3\">3<\/option>";
modalRating += "						  <option value=\"4\">4<\/option>";
modalRating += "						  <option value=\"5\">5<\/option>";
modalRating += "						<\/select>";
modalRating += "		      		<\/div>";
modalRating += "		      		<div id=\"ht-general-qual\">";
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

$(document).ready(function(){ 

	var isFirstProcess = true;
	var count = 0;
	var toProcess = [];
	MutationObserver = window.MutationObserver || window.WebKitMutationObserver;
	
	observer = new MutationObserver(function(mutations, observer) {

	    console.log("Change in the DOM");
	    console.log(mutations);

		for(var i = 0; i < mutations.length; i++){
			if(mutations[i].type == 'childList' && mutations[i].target.className == 'br-current-rating' && mutations[i].target.parentNode != null & mutations[i].target.parentNode.parentNode != null && mutations[i].target.parentNode.parentNode.classList.toString().indexOf('health-translator-rating-widget') != -1){
				//ignore changes in rating modal
				continue;
			}

	    	if(mutations[i].addedNodes.length > 0){
		    	var $mut = $(mutations[i].addedNodes);
			    if(! $mut.is("script")){
			    	execute = true;
				}

				$mut.each(function() {
					console.log("AAAA");
					console.log(this);
					processText(this);	
				});
			}

			if(mutations[i].removedNodes.length > 0){
				var removedConcepts = 0;
				var $mut = $(mutations[i].removedNodes);
			    if(! $mut.is("script")){
					$mut.each(function(){
						removedHTML = $.parseHTML(this.outerHTML);
						removedCount = $(removedHTML).find('x-health-translator.health-translator').length;
						count -= removedCount;
						chrome.runtime.sendMessage({action: "setBadgeText", count: count});
					});
				}
			}
		}
	});

	observeMutations = function (){
		observer.observe(document.body, {
			childList: true,
			subtree: true,
			characterData: true
		});
		//console.log("Observing mutations");
	}

	disconnectObserver = function (){
		observer.disconnect();
		//console.log("Disconnected Observer");
	}

	function registerEvents(){
		console.log("REGISTER EVENTS");
		
		var timer;

		$('body').on('show.bs.modal hide.bs.modal', '#health-translator-modal', function (e) {
			console.log("GONNA DISCONNECT!");
			disconnectObserver();
			$('#health-translator-footer').hide();
		});

		$('body').on('shown.bs.modal hidden.bs.modal', '#health-translator-modal', function (e) {
			observeMutations();
		});


		$('body').on('hide.bs.modal', '#health-translator-rating-modal', function (e) {
			console.log("GONNA DISCONNECT!");
			disconnectObserver();
		});

		$('body').on('shown.bs.modal', '#health-translator-rating-modal', function (e) {
			observeMutations();
		});


		$('body').on('show.bs.modal', '#health-translator-rating-modal', function (e) {
			disconnectObserver();

			$('#ht-rating-concept-name').text($('#health-translator-concept-name').text());

			chrome.runtime.sendMessage({action: "getContentLanguage", data: {language: $("body").attr('data-ht-lang')}}, function(response){
				var lang = response.language;
				
				if($('#health-translator-definition').children().length > 0){
					$('#ht-def-qual').prepend('<p>' + i18n.get("definition_quality", lang) + '</p>');
					$('#ht-def-qual').show();
				}

				if($('#health-translator-references').children().length > 0){
					$('#ht-ext-refs-qual').prepend('<p>' + i18n.get("external_references_quality", lang) + '</p>');
					$('#ht-ext-refs-qual').show();
				}

				if($('#health-translator-relationships').children().length > 0){
					$('#ht-rels-qual').prepend('<p>' + i18n.get("relationships_quality", lang) + '</p>');
					$('#ht-rels-qual').show();
				}

				$('#ht-general-qual').prepend('<p>' + i18n.get("general_quality", lang) + '</p>');
				
			});
		});

		$('body').on('hidden.bs.modal', '#health-translator-rating-modal', function (e) {

			$('#ht-def-qual').hide();
			$('#ht-ext-refs-qual').hide();
			$('#ht-rels-qual').hide();
			
			$('#ht-def-qual p').remove();
			$('#ht-ext-refs-qual p').remove();
			$('#ht-rels-qual p').remove();
			$('#ht-general-qual p').remove();
			
			$('#ht-sel1').barrating('clear');
			$('#ht-sel2').barrating('clear');
			$('#ht-sel3').barrating('clear');
			$('#ht-sel4').barrating('clear');

			observeMutations();
		});

		$('body').on('click', '#ht-submit-rating', function (e) {

			var data = {};

			($('#ht-def-qual').css('display') == 'none') ? data.definition = -1 : data.definitions = parseInt($('#ht-sel1').val());
			($('#ht-refs-qual').css('display') == 'none') ? data.externalReferences = -1 : data.externalReferences = parseInt($('#ht-sel2').val());
			($('#ht-rels-qual').css('display') == 'none') ? data.relationships = -1 : data.relationships = parseInt($('#ht-sel3').val());
			data.general = parseInt($('#ht-sel4').val());
			data.language = $("body").attr('data-ht-lang');
			data.cui = $('#health-translator-modal').attr('data-cui');

			
			chrome.runtime.sendMessage({action: "submitRating", data: data}, function(response){
				if(response.success){
					$('#health-translator-rating-modal').modal('toggle');
					$('#health-translator-footer').empty();
				}else{
					chrome.runtime.sendMessage({action: "getContentLanguage", data: {language: $("body").attr('data-ht-lang')}}, function(response){
						var lang = response.language;
						toastr.warning(i18n.get("submit_error", lang), "HealthTranslator");
					});
				}
		    });

			//observeMutations();
		});

		$('body').tooltip({
		    delay: {show: 300, hide: 350},
		    animation: false,
		    placement: 'textright',
		    template: '<div class="health-translator tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>',
		    selector: '.medical-term-translate',
		    container: 'body'
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
			var lang = $("body").attr('data-ht-lang')
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
				console.log("RESULT:");
				console.log(response);

				if(typeof response == 'undefined')
					return;

				var lang = response.language;

				disconnectObserver();

				$('#health-translator-loading').hide();

				if(response.definition){
					$('#health-translator-definition').prepend("<h4 class=\"text-center\">"+ i18n.get("definition", lang) + "</h4>");
					$('#health-translator-definition').append("<p class=\"text-justify\">" + response.definition + "</p>");
				}else{
					//$('#health-translator-definition').prepend("<h4 class=\"text-center\">No definition found!</h4>");
				}

				console.log(response.relationships);
				var rels = response.relationships;

				if(! $.isEmptyObject(rels)){
					console.log("append relationships");
					$('#health-translator-relationships').prepend("<div id=\"health-translator-relationships-tree\"><\/div>");
					$('#health-translator-relationships').prepend("<h4 class=\"text-center\">" + i18n.get("relationships", lang) + "</h4>");

					var tree = [];
					for (var key in rels) {

						//console.log("RELATIONSHIP: " + key);
						//console.log("TRANSLATION: " + i18n.get(key, lang));
						var node = { text: i18n.get(key, lang), nodes: [], tags: [], selectable: false };
						tree.push(node);

					    // skip loop if the property is from prototype
					    if (!rels.hasOwnProperty(key)) continue;

					    var relsList = rels[key];
					    node.tags.push(relsList.length);

					    for (var i = 0; i < relsList.length; i++) {

					    	var relationship = relsList[i];
					        var childNode = { text: relationship.concept1, selectable: false };
				        	node.nodes.push(childNode);
					        
					    }				
					}

					console.log("RELATIONSHIPS TREE:");
					console.log(tree);

					$('#health-translator-relationships-tree').treeview({
						data: tree, 
						levels: 0, 
						showBorder: false, 
						showTags: true, 
						collapseIcon: "glyphicon glyphicon-chevron-down",
						expandIcon: "glyphicon glyphicon-chevron-right"
					});

					$('#health-translator-relationships-tree').on('mousedown', function(event) {
						//console.log("CLICK RELATIONSHIPS");
						disconnectObserver();
					});

					$('#health-translator-relationships-tree').on('nodeCollapsed nodeExpanded', function(event) {
						//console.log("NODE COLLAPSED OR EXPANDED");
						//timeout for DOM changes
						setTimeout(function(){ observeMutations(); }, 5);
					});
				}

				var semantic_types_string = "";
				for(var i = 0; i < response.semanticTypes.length; i++){
					semantic_types_string += response.semanticTypes[i].str;
					if(i < response.semanticTypes.length - 1)
						semantic_types_string += " | ";
				}

				$('#health-translator-semantic-type').text(semantic_types_string);
				

				if(response.references.length == 0){
					console.log("No refs");
					//$('#health-translator-references').append("<h4>No external references found.</h4>");
				}else{
					$('#health-translator-references').append("<h4>" + i18n.get("external_references", lang) + "</h4>");
					response.references.forEach(function(obj) {
						//console.log(obj);
						var url = obj.url;
						var label = obj.label;
						var source = obj.source;
						$('#health-translator-references').append("<div class=\"ext-ref\"><a href=\""+ url + "\" target=\"_blank\">" + source + " - " + label + "</a>");
					});
				}

				
				if(! response.hasRating){
					$('#health-translator-footer').append('<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#health-translator-rating-modal">' + i18n.get("rate", lang) + '</button>');
					$('#health-translator-footer').show();
				}else{
					$('#health-translator-footer').hide();
				}
				

				observeMutations();
			});
			
		});
		
		$('body').on('hidden.bs.modal', '#health-translator-modal', function () {

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

	var t0 = performance.now();


	chrome.runtime.sendMessage({action: "detectLanguage"}, function(response){
		console.log(response);
		//check if it's a language to process
		if(response.supported){
			$('body').attr('data-ht-lang', response.language);
			
			processText('body');
			appendModals();
			setRatingWidget();
			registerEvents();
			
		}else{
			console.log("HEALTHTRANSLATOR: Language not supported - " + response.language);
		}
	});


	function processText(element){

		if(element.nodeType == 3){
			checkChangesNode(element);
		}
		else{
			chrome.runtime.sendMessage({action: "ping"}, function(response){
				if(response.success == true){
					$textNodes = getTextNodesIn(element);
					
					$textNodes.each(function() {
						checkChangesNode(this);	
					});
				}else{
					chrome.runtime.sendMessage({action: "setBadgeText", count: "-"});
				}
			});
		}
	}

	function appendModals(){
		$('body').append(modal); 
		$('body').append(modalRating);
	}

	function setRatingWidget(){
		$('#ht-sel1').barrating({theme: 'bootstrap-stars health-translator-rating-widget'});
		$('#ht-sel2').barrating({theme: 'bootstrap-stars health-translator-rating-widget'});
		$('#ht-sel3').barrating({theme: 'bootstrap-stars health-translator-rating-widget'});
		$('#ht-sel4').barrating({theme: 'bootstrap-stars health-translator-rating-widget'});
	}

	function isProcessFinished(){
		if(toProcess.length == 0){
			//get the finished time
			var t1 = performance.now();
			console.log("Initial processing: " + (t1 - t0) + " ms.")
			return true;
		}
		return false;
	}

	function getTextNodesIn(el) {
	    return $(el).find(":not(iframe):not(script):not(head):not(style)").addBack().contents().filter(function() {
	        return this.nodeType == 3;
	    });
	};

	function checkChangesNode(node){
		if(/\S/.test(node.nodeValue) && node.nodeValue.length > 3){

			var bodyData = {
				body: node.nodeValue,
				language: $('body').attr('data-ht-lang')
			};
			
			toProcess.push(node);
			chrome.runtime.sendMessage({action: "processDocument", data: bodyData}, function(response){

			  	var split = []

			  	//console.log(response);
			  	if(response.hasOwnProperty("status") && response.status == 0){
			  		console.log("HEALTHTRANSLATOR: Error processing a text node.");
			  		return;
			  	}
			  	
			  	var changes = response.changes;
			  	if(! response.changes){
			  		console.log("HEALTHTRANSLATOR: Something went wrong.");
			  	}

			  	if(response.changes.length > 0 || isFirstProcess){
			  		count += response.changes.length;
			  		chrome.runtime.sendMessage({action: "setBadgeText", count: count});

			  		if(isFirstProcess){
			  			isFirstProcess = false;
			  		}
			  	}
			  	


			  	if(changes.length > 0){
			  		split.push(htmlEscape(node.nodeValue.substring(0, changes[0].start)));
			  	}

			  	for(var i = 0; i < changes.length; i++){
			  		//console.log("CHANGEEEE");
			  		var outerElement = document.createElement('x-health-translator');
				  	outerElement.classList.add('health-translator');
			  		outerElement.innerHTML = changes[i].tooltip;

			  		split.push(outerElement.outerHTML);

			  		if(i + 1 < changes.length)
			  			split.push(node.nodeValue.substring(changes[i].end, changes[i+1].start));

			  	}

			  	if(changes.length > 0){
			  		//console.log(node.nodeValue);
			  		split.push(htmlEscape(node.nodeValue.substring(changes[changes.length - 1].end)));
			  	}

			  	changedNode = split.join("");
			  	//console.log(changedNode);

			  	if(split.length > 0){
			  		//console.log(split);
			  		//disconnectObserver();
			  		if(isProcessFinished){
			  			disconnectObserver();
			  		}
				  	var replacementNode = document.createElement('x-health-translator');
					replacementNode.innerHTML = changedNode;
					node.parentNode.insertBefore(replacementNode, node);
					node.parentNode.removeChild(node);
					if(isProcessFinished){
			  			observeMutations();
			  		}
					//observeMutations();
				}

				var index = toProcess.indexOf(node);
				if (index > -1) {
				    toProcess.splice(index, 1);
				}

				if(isProcessFinished()){
					observeMutations();
				}
		  	});
		}
	}

	function htmlEscape(str) {
	    return String(str)
	        .replace(/&/g, '&amp;')
	        .replace(/"/g, '&quot;')
	        .replace(/'/g, '&#39;')
	        .replace(/</g, '&lt;')
	        .replace(/>/g, '&gt;')
	        .replace(/\//g, '&#x2F;');
	}
});