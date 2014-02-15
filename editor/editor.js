window.onload = init;
var context;
var bufferLoader;
var songs;

var trackWidthScale = 10;
var trackHeight = 100;

function init() 
{
  // set up context for audio playback
  window.AudioContext = window.AudioContext || window.webkitAudioContext;
  context = new AudioContext();
  
  // load audio files
  bufferLoader = new BufferLoader( context, ['test1.mp3', 'test2.wav'], finishedLoading );
  bufferLoader.load();
}

// playback audio files
function finishedLoading(bufferList) 
{
  for(i = 0; i < bufferList.length; i++) {
    var source = context.createBufferSource();
	songs = bufferList;
    source.buffer = bufferList[i];
	visualize(songs[i]);
    source.connect(context.destination);
    source.start(0);
  }
}

// visualize audio file
function visualize(track) 
{
  var lengthInSeconds = track.duration;
  var width = lengthInSeconds * trackWidthScale;
  var height = trackHeight;
  createDiv(width, height);
}

function createDiv(width, height)
{
  var div = document.createElement("div");
  var color = getRandomColor();
  div.style.width = width + "px";
  div.style.height = height + "px";
  div.style.background = color;
  div.style.color = "white";
  div.innerHTML = "Hello";
  document.body.appendChild(div);
}

function getRandomColor() 
{
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++ ) {
        color += letters[Math.round(Math.random() * 15)];
    }
    return color;
}

/***************************************************/
/****** ABSTRACTING AWAY THE LOADING OF SONGS ******/
/***************************************************/

function BufferLoader(context, urlList, callback) 
{
  this.context = context;
  this.urlList = urlList;
  this.onload = callback;
  this.bufferList = new Array();
  this.loadCount = 0;
}

BufferLoader.prototype.loadBuffer = function(url, index) {
  // Load buffer asynchronously
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.responseType = "arraybuffer";

  var loader = this;

  request.onload = function() {
    // Asynchronously decode the audio file data in request.response
    loader.context.decodeAudioData(
      request.response,
      function(buffer) {
        if (!buffer) {
          alert('error decoding file data: ' + url);
          return;
        }
        loader.bufferList[index] = buffer;
        if (++loader.loadCount == loader.urlList.length)
          loader.onload(loader.bufferList);
      },
      function(error) {
        console.error('decodeAudioData error', error);
      }
    );
  }

  request.onerror = function() {
    alert('BufferLoader: XHR error');
  }

  request.send();
}

BufferLoader.prototype.load = function() {
  for (var i = 0; i < this.urlList.length; ++i)
  this.loadBuffer(this.urlList[i], i);
}

/********************************************************/
/****** DONE ABSTRACTING AWAY THE LOADING OF SONGS ******/
/********************************************************/