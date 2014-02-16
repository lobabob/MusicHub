window.onload = init;

// for audio playback
var context;
var bufferLoader;
var tracks = [];
var playing = [];

function init() 
{ 
    // set up context for audio playback
    window.AudioContext = window.AudioContext || window.webkitAudioContext;
    context = new AudioContext();
  
    // load audio files
    bufferLoader = new BufferLoader( context, ['tracks/test1.mp3', 'tracks/test2.wav'], finishedLoading );
    bufferLoader.load();
}

function finishedLoading(bufferList) 
{
    // create and draw tracks
    for(i = 0; i < bufferList.length; i++) {
      tracks.push( new Track(bufferList[i], document.getElementById('spawn'), i) );
    }
	
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
		appendTo: 'body',
		snap: false,
		snapTolerance: 5
	}); 
		
    loop();
}

function loop()
{
    // let user play the project
    var isPlaying = false;
    var player;
    $('#play').click(function () 
    {
        if(!isPlaying) 
	    {
	      isPlaying = true;
          player = beginPlayback();
	      document.getElementById("play").innerHTML = "<font face = 'Helvetica'>Reset</font>";
	    }
	    else 
	    {
	      isPlaying = false;
	      resetPlayback(player);
	      document.getElementById("play").innerHTML = "<font face = 'Helvetica'>Play</font>";
	    }
    });
}

function beginPlayback()
{
    for(i = 0; i < tracks.length; i++) 
	{
	  if(tracks[i].playable) 
	  {
	    var source = context.createBufferSource();
	    playing.push(source);
	  
	    // calculate delay
	    var delay = tracks[i].div.style.left;
	    delay = +delay.substring(0, delay.length - 2);
	    delay += 0;
	    delay /= trackWidthScale;
	  
	    // play the track with given delay
	    source.buffer = tracks[i].audio;
	    source.connect(context.destination);
        source.start(context.currentTime + delay);
	  }
	}
	// begin advancing playhead
	return setInterval("advancePlayhead()", 25);
}

function resetPlayback(player)
{
	clearInterval(player);
	for(i = 0; i < playing.length; i++) {
	  playing[i].stop(0);
	}
	document.getElementById('playhead').style.left = "0px";
}

function advancePlayhead()
{
    var pos = document.getElementById('playhead').style.left;
	pos = +pos.substring(0, pos.length - 2);
	pos += 1;
	document.getElementById('playhead').style.left = pos + "px";
}