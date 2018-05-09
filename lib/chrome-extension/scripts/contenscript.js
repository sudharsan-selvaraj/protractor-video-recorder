chrome.runtime.sendMessage("pageLoaded",function (clientId) {
    var script = document.createElement('script');
    script.textContent = "window.name='"+clientId+"'";
    (document.head||document.documentElement).appendChild(script);
    script.onload = function() {
        script.remove();
    };
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
    },
    audioConstraints: false
};