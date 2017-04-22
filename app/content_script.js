function speakSelection(response) {
    var focused = document.activeElement;
    var selectedText;
    if (focused) {
        try {
            selectedText = focused.nodeValue.substring(focused.selectionStart, focused.selectionEnd);
        } catch (err) {}
    }
    if (selectedText == undefined) {
        var sel = window.getSelection();
        var selectedText = sel.toString();
    }

    if (selectedText.length == 0) {
        alert('Please select sentences');
        response({'type':'end'});
        return
    }

    // chrome.extension.sendMessage({'speak': selectedText});
    // alert(selectedText);
    var utterance = new SpeechSynthesisUtterance();
    // text attribute allows you to set the text that you wish to be spoken.
    utterance.text = selectedText;
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
        console.log('start speak');
        response({'type':'start'});
    });

    // end
    utterance.addEventListener('end', function() {
        // to change play button
        // glyphicon glyphicon-play
        // document.querySelector('#glyphicon').className = "glyphicon glyphicon-play";
        console.log('end speak');
        chrome.runtime.sendMessage({'type':'end'});
    });

    // to speak
    window.speechSynthesis.speak(utterance);
}
// to check speaking and paused 

function speakChange(response) {
    if (window.speechSynthesis.speaking) {
        if (window.speechSynthesis.paused) {
            if (window.getSelection().toString().length == 0) {
                window.speechSynthesis.cancel();
                response({'type':'end'});
                return
            }
            window.speechSynthesis.resume();
            response({'type':'resume'});
        }else {
            window.speechSynthesis.pause();
            response({'type':'paused'});
        }
    }else {
        speakSelection(response);
    }
}

// init content script
function initContentScript() {
    // to get message from overlay
    chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
        if (request.id == window.id) {
            if (request.speakSelection) {
            console.log('speakSelection ' + request.speakSelection);
            speakChange(sendResponse);
            } 
            return true
        }
        
    });
}

initContentScript();