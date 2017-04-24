window.onload=function(){
    // window.speechSynthesis.cancel();
    checkSpeakingStatus();
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

function checkSpeakingStatus() {
  console.log('checkSpeakingStatus');
  // to check speaking
  chrome.tabs.executeScript({
    code:'window.speechSynthesis.speaking'
  },function(wSpeech){
    console.log(wSpeech);
    var speech = wSpeech[0];
    console.log(speech);
    if (speech) {
      console.log('speaking');
      setStatusType('speaking');
    }else {
      console.log('not speaking');
      setStatusType('end');
    }
  });
}

function setStatusType(type) {
  console.log(type);
  if (type == 'end') {
    document.querySelector('#glyphicon').className = "glyphicon glyphicon-play";
  }else {
    document.querySelector('#glyphicon').className = "glyphicon glyphicon-pause";
  }
}

// play or pause button click
document.querySelector('#btnVoice').addEventListener('click', function() {
  chrome.tabs.query({active:true, currentWindow:true}, function(tabs) {
         chrome.tabs.sendMessage(tabs[0].id, {'speakSelection': true}, function(result) {
            console.log(result.type);
            setStatusType(result.type);
         });
      });
})

document.querySelector('#btnGrayscale').addEventListener('click',function() {
  chrome.tabs.executeScript({
    code:'document.body.style.filter = "grayscale()";for(var i=0; i<document.images.length; i++) {document.images[i].style.setProperty("filter","constrast(0)")};'
  });
})
// 
document.querySelector('#btnUnGrayscale').addEventListener('click',function() {
  chrome.tabs.executeScript({
    code:'document.body.style.filter = "";for(var i=0; i<document.images.length; i++) {document.images[i].style.setProperty("filter","")};'
  });
})
// to get message from content_script
chrome.runtime.onMessage.addListener(function(request,sender){
  console.log('overlay onMessage');
  if (request.type == 'end') {
    setStatusType('end');
  }else if (request.type == 'start') {
    setStatusType('start');
  }
});