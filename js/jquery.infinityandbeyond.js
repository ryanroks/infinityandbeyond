/***
A plugin that will infinitely scroll
on a DIV.

Can be set to "auto" to scroll automatically 
or can be required to click "load more" by users
***/

$.fn.infiniteScroll = function(options) {
	
	var results = [];
	
	var settings = $.extend(
		{
			auto: false,		
			/***
				True will auto load new data, 
				False will require a click 
			***/
			buttonText: "Load More"
		},
		options);
			
	$(this).html("<div id='returnData'><img src=\"images/ajax-loader.gif\" style=\"margin-left:50%;\"></div>");
	
	if(settings.auto == false)
		$(this).append("<div id='loadMore'>"+settings.buttonText+"</div>");
	
	$.getJSON("json/json.html",
		function(data) {
			$.each(data, function(index, value) {
				results.push("<div class='row'>"+value.name+"</div>");
				})
			$("#returnData").html(results.join(''));
			}
		);

	if(settings.auto == false) {
		
		$("#loadMore").bind('click', function() {
		
			results = [];
		
			if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){

				$.getJSON("json/json.html",
					function(data) {
						$.each(data, function(index, value) {
							results.push("<div class='row'>"+value.name+"</div>");
							})
						$("#returnData").append(results.join(''));
						}
					);
					
				}
			});
		
		}
		
	else {	
				
		$(this).bind('scroll', function() {
		
			results = [];
		
			if($(this).scrollTop() + $(this).innerHeight() >= $(this)[0].scrollHeight){

				$.getJSON("json/json.html",
					function(data) {
						$.each(data, function(index, value) {
							results.push("<div class='row'>"+value.name+"</div>");
							})
						$("#returnData").append(results.join(''));
						}
					);
					
				}
			});
			
		}

	}