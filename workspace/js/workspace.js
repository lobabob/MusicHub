(function($){

	function setDraggable() {
		 $('.track').draggable({
    		scope: 'tracks',
    		scroll: false,
    		revert: 'invalid',
    		helper: function(){
            	$copy = $(this).clone();
            	$copy.width($(this).width());
            	$copy.height($(this).height());
           		return $copy;
           	},
    		cursor: 'crosshair',
    		snap: false,
    		snapTolerance: 5
    	});
	}

	setDraggable();	// Set's initial spawned tracks as draggable

	$('.track-drop').droppable({
		scope: 'tracks',
		tolerance: 'intersect',
		drop: function(event, ui) {
			$(this).append(ui.draggable.clone());
			setDraggable();		// Set's new track copy as draggable
		}
	});
})(jQuery);