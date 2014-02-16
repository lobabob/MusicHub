// how big will the track visualizations be?
var trackWidthScale = 40;
var height = 70;

// where are the tracks spawned?
var dest = document.getElementById("spawn");

function Track(buffer, dest, id)
{
  this.audio = buffer;
  this.dest = dest;
  this.div = visualize(buffer, dest,  id);
  this.playable = false;
}

// visualize audio file
function visualize(track, dest, id) 
{
    var lengthInSeconds = track.duration;
    var width = lengthInSeconds * trackWidthScale;
    var div = createDiv(width, height, dest, id);
  
    // draw waveform
    var waveform = Object.create(WaveSurfer);
    waveform.init({
      container: div,
	  waveColor: 'white',
	  progressColor: 'white',
	  height: height,
	  fillParent: true,
	  cursorWidth: '0px',
	  markerWidth: '0px',
    });
    waveform.loadDecodedBuffer(track);
    return div;
}

function createDiv(width, height, dest, id)
{
    var div = document.createElement("div");
    div.className = "track";
	div.id = id;
    div.style.width = width + "px";
    div.style.height = height + "px";
    div.style.background = "rgba(" + getColor() + ',' + getColor() + ',' + getColor() + ", 0.5)";
    div.style.borderRadius = 4 + "px";
    div.style.boxShadow = 'inset 0 0 10px #FFFFFF';
    dest.appendChild(div);
	return div;
}

function getColor() { return Math.round(Math.random() * 220); }
