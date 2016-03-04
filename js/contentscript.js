$(document).ready(function(){ 

	function registerEvents(){
		
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
			/*
			//ajax request with the medical concept
			$.ajax({
			  url: "http://localhost:8080/JavaRESTTest/webresources/details",
			  type: "POST",
			  data: JSON.stringify(bodyData),
			  dataType: 'json',
			  contentType: "application/json",
			  cache: false,
			  success: function(result){
			  	console.log("RESULT: \n" + result.result);

			  	//set the modal title with the term
			  	$('#myModalLabel').text(term);
			  },
			  error: function(error){
			  	console.log("ERROR: " + error);
			  }
			});
			*/
		});

		/*
		$('#myModal').on('shown.bs.modal', function() {
		    console.log("a modal was opened");

		    //get the concept that was selected and get that information
		});
		*/

		
	};
	

	var bodyData = {
		body: $('body').html()
	};

	chrome.runtime.sendMessage({action: "processDocument", data: bodyData}, function(response){
		console.log("SUCCESSFULY RETURNED BODY");

		//TODO only if there are annotated concepts (return json field with concepts count and processing time)
		$("body").html(response.result);
	  	$('body').append(modal); 

	  	registerEvents();
	});
	/*
	$.ajax({
	  url: "http://localhost:8080/JavaRESTTest/webresources/process",
	  type: "POST",
	  data: JSON.stringify(bodyData),
	  dataType: 'json',
	  contentType: "application/json",
	  cache: false,
	  success: function(result){
	  	console.log("SUCCESSFULY RETURNED BODY");
	  	console.log(result);
	  	console.log("data: \n" + result.result);
	  	$("body").html(result.result);
	  	$('body').append(modal); 

	  	registerEvents();
	  },
	  error: function(error){
	  	console.log("ERROR: " + error);
	  }
	});
	*/

});

console.log("teste");

console.log(document);
//console.log(childNodes(document));

/*
function childNodes(element){
	//only if has some text (non whitespace characters)
	if(element.nodeType === Node.TEXT_NODE && element.nodeValue.length > 0 && /\S/.test(element.nodeValue)){
		console.log("NAME: " + element.nodeName + " | " + " VALUE: " + element.nodeValue + " / " + element.nodeValue.length);

		var new_element = element;
		if(element.nodeValue == "Hypertension")
			new_element.nodeValue = "CENAS MARADAS";

		element.parentNode.replaceChild(element, new_element);
	}

	for (var i = 0; i < element.childNodes.length; i++) {
        childNodes(element.childNodes[i]);
    }
}
*/

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

//$('body').append(modal); 
//$('modal').hide();

