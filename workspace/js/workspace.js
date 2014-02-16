(function($){

	function setDraggable() {

	}

	function setDraggable(setThis) {
		 setThis.draggable({
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
	}

	setDraggable($('.track'));	// Set's initial spawned tracks as draggable

	$('.track-drop').droppable({
		scope: 'tracks',
		tolerance: 'intersect',
		drop: function(event, ui) {
			var addThis = ui.draggable.clone();
			$(this).append(addThis);

			setDraggable(addThis);		// Set's new track copy as draggable

			addThis.draggable({
				axis: 'x',
				revert: 'none'
			});
		}
	});
})(jQuery);