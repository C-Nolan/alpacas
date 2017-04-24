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

// play speak
document.querySelector('#btnVoice').addEventListener('click',function() {
  chrome.tabs.executeScript({
    code:'if (window.speechSynthesis.speaking) { if (window.speechSynthesis.paused) { window.speechSynthesis.resume();}}else { var focused = document.activeElement; var selectedText; if (focused) { try { selectedText = focused.nodeValue.substring(focused.selectionStart, focused.selectionEnd); } catch (err) {} } if (selectedText == undefined) { var sel = window.getSelection(); selectedText = sel.toString(); } var utterance = new SpeechSynthesisUtterance(); utterance.text = selectedText; utterance.lang = "en-US"; utterance.volume = 1; utterance.rate = 1; window.speechSynthesis.speak(utterance)};'
  });
})

// btnVoicePause 
document.querySelector('#btnVoicePause').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code:'if (window.speechSynthesis.speaking) { if(!window.speechSynthesis.paused) { window.speechSynthesis.pause() } }'
  })
})
// btnVoiceStop
document.querySelector('#btnVoiceStop').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code:'window.speechSynthesis.cancel()'
  })
})

// gray scale
document.querySelector('#btnGrayscale').addEventListener('click',function() {
  chrome.tabs.executeScript({
    code:'document.body.style.filter = "grayscale()";for(var i=0; i<document.images.length; i++) {document.images[i].style.setProperty("filter","constrast(0)")};'
  });
})
// color
document.querySelector('#btnColor').addEventListener('click',function() {
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