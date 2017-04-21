window.onload=function(){
     var test = document.getElementById("cbVision");
      test.addEventListener("click", function() { 
          addRemoveInput();
      });
}

function addRemoveInput(){
  var input = document.getElementById('numVision');

  if(input != null) {
    document.getElementById('inHolder').innerHTML = '';

  } else {
    document.getElementById('inHolder').innerHTML = '<div class="input-group" id="numVision"> <input type="number" class="form-control" placeholder="100" aria-describedby="basic-addon2"> <span class="input-group-addon" id="basic-addon2">%</span> </div>';
  }
}

// play or pause button click
document.querySelector('#btnVoice').addEventListener('click', function() {
  // to check speaking
  if (window.speechSynthesis.speaking) {
    // to check paused
    if (window.speechSynthesis.paused) {
      // to resume
      window.speechSynthesis.resume();
    }else if (window.speechSynthesis.pending) {
      // to cancel and to change glyphicon glyphicon-play
      window.speechSynthesis.cancel();
      document.querySelector('#glyphicon').className = 'glyphicon glyphicon-play';
    }else {
      // to pause
      window.speechSynthesis.pause();
    }
    updateStatus();
  }else {
    // to check selected string
    // to get selected string
    chrome.tabs.executeScript({
      code:'window.getSelection().toString()'
    },function(result) {
      if (result == "") {
        chrome.tabs.executeScript({
          code:'document.selection.createRange().text'
        }, function(result){
          if (result == "") {
            chrome.tabs.executeScript({
              code:'alert("Please select sentence on web page.");'
            });
          }else {
            playSpeak(result);
          }
        });
      }else {
        playSpeak(result);
      }
    });
   }
})

// this function is just to check speech status
// for testing speech
function updateStatus(){
    // not perfect, here is just test
    var sDiv = document.querySelector('#speechStatus');
    var wSpeech = window.speechSynthesis;
    sDiv.innerText = "Speaking : " + wSpeech.speaking + " Paused : " + wSpeech.paused + " Pending : " + wSpeech.pending;
}

function playSpeak(text) {
  var utterance = new SpeechSynthesisUtterance();
  // text attribute allows you to set the text that you wish to be spoken.
  utterance.text = text;
  // lang attribute gives you the ability to specify the language of the text.
  // This will default to the language of the HTML document.
  utterance.lang = 'en-US';
  // volume attribute
  // A float value between 0 and 1, default is 1.
  utterance.volume = 1; 
  // rate attribute deines the speed at which the text should be spoken
  // This should be a float between 0 and 10, the default being 1
  utterance.rate = 1;
  // pitch attribute conrols how high or low the text is spoken.
  // this shoul be a float value between 0 and 2, with a value of 1 being the default.
  utterance.pitch = 1;
  // start 
  utterance.addEventListener('start', function() {
    // to change pause button
    // glyphicon glyphicon-pause
    document.querySelector('#glyphicon').className = "glyphicon glyphicon-pause";
    updateStatus();
  });

  // end
  utterance.addEventListener('end', function() {
    // to change play button
    // glyphicon glyphicon-play
    document.querySelector('#glyphicon').className = "glyphicon glyphicon-play";
    updateStatus();
  });

  // pause
  utterance.addEventListener('pause', function() {
    updateStatus();
  });

  // resume
  utterance.addEventListener('resume', function() {
    updateStatus();
  });

  // to speak
  window.speechSynthesis.speak(utterance); 
  updateStatus();
}