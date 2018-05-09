chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request == "pageLoaded") {
        sendResponse(clientId);
    }
});

var constraints = {
    audio: false,
    video: true,
    videoConstraints: {
        mandatory: {
            chromeMediaSource: 'tab',
            maxWidth: 3840,
            maxHeight: 2160
        }
    }
};

var initRTCRecording = function () {
    chrome.tabs.query({active : true}, function(tab) {
      chrome.tabCapture.capture(constraints, function (stream) {
          startRTCRecording(stream);
      });
  });
};

chrome.browserAction.onClicked.addListener(function(tab) {
    initRTCRecording();
});

chrome.commands.onCommand.addListener(function(command) {
    console.log('Command:', command);
    alert(command)
});

chrome.commands.getAll(function(commands){
    console.log(commands)
})
