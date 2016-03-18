$(document).ready(function(){ 

	function registerEvents(){
		
		console.log("REGISTERING TOOLTIPS");

		$('.medical-term-translate[data-toggle="tooltip"]').tooltip({
		    trigger: 'manual',
		    animation: false,
		    placement: "auto right"
		}).on("mouseenter", function () {
	        var _this = this;
	        $(this).tooltip("show");
	        
	        $(".tooltip").on("mouseleave", function () {
	            $(_this).tooltip('hide');
	        });

	    }).on("mouseleave", function () {
	        var _this = this;

	        setTimeout(function () {
	            if (!$(".tooltip:hover").length) {
	                $(_this).tooltip("hide");
	            }
        	}, 300);
	    });


		$('body').on('click', '.tooltip a', function(){
			console.log("Abri um tooltip");
			//get the id of the opened tooltip
			var tooltip_id = $(this).closest('.tooltip').attr('id');
			var term = $('.medical-term-translate[aria-describedby="' + tooltip_id + '"').attr('data-term');

			var bodyData = {
				body: term
			};

			chrome.runtime.sendMessage({action: "details", data: bodyData}, function(response){
				console.log("here");
				$('#health-translator-modal-label').text(term);
			});
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
		var t1 = performance.now();
		console.log("Response is returned after " + (t1 - t0) + "ms.");
		
		if(response.conceptCounter > 0){

			var scripts = Array.prototype.slice.call(document.scripts);
			//console.log(scripts);
			console.log("DATE1: " + new Date().getTime());
			$('body').html(response.body);
		  	$('body').append(modal); 
		  	console.log("DATE2: " + new Date().getTime());

		  	//console.log(document.body);
		  	
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
	  	
	  	//$('html').html(response);
	  	//document.write(getDocTypeAsString() + response);

	  	
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
modal += "        <h4 class=\"modal-title\" id=\"health-translator-modal-label\">Modal title<\/h4>";
modal += "      <\/div>";
modal += "      <div class=\"modal-body\">";
modal += "        ...";
modal += "      <\/div>";
modal += "      <div class=\"modal-footer text-center\">";
modal += "        <!--<button type=\"button\" class=\"btn btn-default\" data-dismiss=\"modal\">Close<\/button>-->";
modal += "        <button type=\"button\" class=\"btn btn-primary\" data-dismiss=\"modal\">Close<\/button>";
modal += "      <\/div>";
modal += "    <\/div>";
modal += "  <\/div>";
modal += "<\/div>";
modal += "<\/div>";