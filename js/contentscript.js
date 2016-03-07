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
		});
	};
	

	var bodyData = {
		body: $('body').html()
	};

	chrome.runtime.sendMessage({action: "processDocument", data: bodyData}, function(response){
		console.log("SUCCESSFULY RETURNED BODY");

		if(response.conceptCounter > 0){
			$("body").html(response.body);
		  	$('body').append(modal); 

		  	registerEvents();
	  	}

	  	
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


