(function($){

	// Initial Set-up
	
	$('#add').click(function() {
		$('#spawn').slideToggle(function() {
			refresh();
		});
	});

	$('.container').height($(window).height()-2);
	refresh();

	$('.droppable').droppable({
		scope: 'tracks',
		tolerance: 'intersect',
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

	function refresh() {
		var newHeight = $(window).height()-$('.header').height();

		$('.playlist').css({
			'position':'absolute',
			'bottom':0,
			'height': newHeight
		});
	}



})(jQuery);