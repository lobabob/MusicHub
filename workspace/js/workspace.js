(function($){

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
		snap: false,
		snapTolerance: 5
	});

	$('.track-drop').droppable({
		scope: 'tracks',
		tolerance: 'intersect',
		drop: function(event, ui) {
			var addThis = ui.draggable.clone();
			
			//addThis.css('top', ui.helper.position().top);
			addThis.css('position', 'absolute');
			addThis.css('left', ui.helper.position().left);
			addThis.css('height', $(this).height());

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
})(jQuery);