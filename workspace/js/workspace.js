(function($){

	// Initial Set-up

	$('#add').click(function() {
		$('.spawn').slideToggle(function() {
			refresh();
		});
	});

	$('.container').height($(window).height()-2);
	refresh();

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
			addThis.css('left', (ui.helper.position().left + $('.container').scrollLeft()));
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

	function refresh() {
		var newHeight = $(window).height()-$('.header').height();

		$('.playlist').css({
			'position':'absolute',
			'bottom':0,
			'height': newHeight
		});
	}



})(jQuery);