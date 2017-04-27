// Set initial zoom level
var zoom_level=100;



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

// play speak
document.querySelector('#btnVoice').addEventListener('click',function() {
  chrome.tabs.executeScript({
    code:'if (window.speechSynthesis.speaking) { if (window.speechSynthesis.paused) { window.speechSynthesis.resume();}}else { var focused = document.activeElement; var selectedText; if (focused) { try { selectedText = focused.nodeValue.substring(focused.selectionStart, focused.selectionEnd); } catch (err) {} } if (selectedText == undefined) { var sel = window.getSelection(); selectedText = sel.toString(); } var utterance = new SpeechSynthesisUtterance(); utterance.text = selectedText; utterance.lang = "en-US"; utterance.volume = 1; utterance.rate = 1; window.speechSynthesis.speak(utterance)};'
  });
})

document.querySelector('#zoomIn').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code:'console.log("Zoom in"); document.body.style.transform = "scale(1)"; document.body.style.transformOrigin = "50% 0"; document.body.style.width = "100%";' 
  });
})

document.querySelector('#zoomOut').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code:'console.log("Reset Zoom"); zoom_level=100; document.body.style.transform = "scale(1)"; document.body.style.transformOrigin = "50% 0"; document.body.style.width = "100%";' 
  });
})

document.querySelector('#zoomReset').addEventListener('click', function() {
  chrome.tabs.executeScript({
    code:'console.log("Reset Zoom"); zoom_level=100; document.body.style.transform = "scale(1)"; document.body.style.transformOrigin = "50% 0"; document.body.style.width = "100%";' 
  });
})


// Zoom function
function zoom_page(step, trigger)
{
    console.log("Step: " + step);
    // Zoom just to steps in or out
    if(zoom_level>=120 && step>0 || zoom_level<=80 && step<0) return;

    // Set / reset zoom
    if(step==0) zoom_level=100;
    else zoom_level=zoom_level+step;

    // Set page zoom via CSS
    $('body').css({
        transform: 'scale('+(zoom_level/100)+')', // set zoom
        transformOrigin: '50% 0' // set transform scale base
    });

    // Adjust page to zoom width
    if(zoom_level>100) $('body').css({ width: (zoom_level*1.2)+'%' });
    else $('body').css({ width: '100%' });

    // Activate / deaktivate trigger (use CSS to make them look different)
    if(zoom_level>=120 || zoom_level<=80) trigger.addClass('disabled');
    else trigger.parents('ul').find('.disabled').removeClass('disabled');
    if(zoom_level!=100) $('#zoomReset').removeClass('disabled');
    else $('#zoomReset').addClass('disabled');
}

// to get message from content_script
chrome.runtime.onMessage.addListener(function(request,sender){
  console.log('overlay onMessage');
  if (request.type == 'end') {
    setStatusType('end');
  }else if (request.type == 'start') {
    setStatusType('start');
  }
});

