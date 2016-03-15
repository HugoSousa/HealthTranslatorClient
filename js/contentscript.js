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
				$('#myModalLabel').text(term);
			});
		});
	};
	
	//console.log("BODY: " + $('body').html());

	var bodyData = {
		body: $('body').html()
		//body: document.documentElement.outerHTML
	};

	//console.log("BODY: " + getDocTypeAsString() + document.documentElement.outerHTML );
	console.log("Start Processing.");
	var t0 = performance.now();
	chrome.runtime.sendMessage({action: "processDocument", data: bodyData}, function(response){
		var t1 = performance.now();
		console.log("Response is returned after " + (t1 - t0) + "ms.");
		
		if(response.conceptCounter > 0){

			var scripts = Array.prototype.slice.call(document.scripts);
			//console.log(scripts);
			$('body').html(response.body);
		  	$('body').append(modal); 

		  	console.log(document.body);
		  	
			for(var i = 0; i < scripts.length; i++){
				console.log(scripts[i]);
				console.log(scripts[i].parentNode);
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
modal += "<div class=\"modal fade\" id=\"myModal\" tabindex=\"-1\" role=\"dialog\" aria-labelledby=\"myModalLabel\">";
modal += "  <div class=\"modal-dialog\" role=\"document\">";
modal += "    <div class=\"modal-content\">";
modal += "      <div class=\"modal-header\">";
modal += "        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\"><span aria-hidden=\"true\">&times;<\/span><\/button>";
modal += "        <h4 class=\"modal-title\" id=\"myModalLabel\">Modal title<\/h4>";
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


var getDocTypeAsString = function () { 
    var node = document.doctype;
    return node ? "<!DOCTYPE "
         + node.name
         + (node.publicId ? ' PUBLIC "' + node.publicId + '"' : '')
         + (!node.publicId && node.systemId ? ' SYSTEM' : '') 
         + (node.systemId ? ' "' + node.systemId + '"' : '')
         + '>\n' : '';
};

