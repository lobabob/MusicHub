(function($){

	// Initialization
	
	$('#add').click(function() {
		$('#spawn').slideToggle(function() {
			adjustScrollBars();
		});
	});

	$(window).resize(adjustScrollBars);
	adjustScrollBars();
	
	for(var i=0;i<99;i++)
		$('.playlist').append("<div class='track-home droppable' id="+i+"></div>");	// Creates 99 slots for tracks to be placed in

	$('.droppable').droppable({
		scope: 'tracks',
		tolerance: 'pointer',	// probably going to be either pointer or intersect
		drop: function(event, ui) {
			var addThis = ui.draggable;
			
			addThis.css('position', 'absolute');
			addThis.css('left', (ui.helper.position().left + $('.playlist').scrollLeft()));
			addThis.css('height', $(this).height());
			
			addThis.playable = true;
			
			if(!addThis.hasClass('dropped')) {
				addThis.addClass('dropped');	// For set mode function
			}

			$(this).append(addThis);

			// Set's new track copy as draggable
			addThis.draggable('destroy');
			addThis.draggable({
				axis: 'x',
				cursor: 'crosshair',
				snap: false,
				snapTolerance: 5
			});
			window.tracks[addThis.attr('id')].playable = true;
		}
	});

	// Functions, etc.

	function adjustScrollBars() {
		$('.playlist').css({
			'height':$(window).height()-$('.header').height()-4
		});
	}

})(jQuery);