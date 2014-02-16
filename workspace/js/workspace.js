(function($){

	// Initial Set-up

	/*var spawnRevealed = false;

	$('#add').click(function() {
		$('.spawn').slideToggle({
			start: function() {
				var newTop;

				if($('.spawn').css('display') != 'none')
					newTop = $('.header').height();
				else
					newTop = 170;

				$('.playlist').stop(true,true);
				$('.playlist').animate({
					'top': newTop
				}, {
					duration:300, 
					que:false
				});
			}
			duration:300,
			complete:function() {
				$(this).stop(true,true);
			},
			que:false
		});*/


			/*
			function() {
			$(this).stop(true,true);	// Stops rapid click loop

			$('.playlist').css({
				'top': $('.header').height()
			});*/

		
//	});

	$('.playlist').css({
		'height':$(document).height()-$('.header').height()
	});
	
	for(var i=0;i<99;i++)
		$('.playlist').append("<div class='track-home droppable' id="+i+"></div>");	// Creates 99 slots for tracks to be placed in

	$('.track').draggable({
		scope: 'tracks',
		scroll: false,
		revert: 'invalid',
		helper: function(){
        	$copy = $(this).clone();
        	$copy.width($(this).width());
        	$copy.height($(this).height());
        	$copy.css({'box-shadow':'0 0 .5em rgba(0,0,0,.8)'});	// Give a shadow outline effect	// pop-up: 0px 6px 6px -6px #000
       		return $copy;
       	},
		cursor: 'crosshair',
		appendTo: 'body',
		snap: false,
		snapTolerance: 5
	});

	$('.droppable').droppable({
		scope: 'tracks',
		tolerance: 'intersect',
		drop: function(event, ui) {
			var addThis = ui.draggable.clone();
			
			addThis.css('position', 'absolute');
			addThis.css('left', (ui.helper.position().left + $('.playlist').scrollLeft()));
			addThis.css('height', $(this).height());

			if(!addThis.hasClass('dropped')) {
				addThis.addClass('dropped');	// For set mode function
			}

			$(this).append(addThis);


			// Set's new track copy as draggable
			addThis.draggable({
				axis: 'x',
				cursor: 'crosshair',
				snap: false,
				snapTolerance: 5
			});
		}
	});

	// Functions, etc.




})(jQuery);