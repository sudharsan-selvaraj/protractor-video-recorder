var wss, isSocketConnected = false,
    connectionInterval,
    generateClientId = function () {
        return "client-" + Math.random().toString(36).substr(2, 16);
    };

clientId = generateClientId();

var connectToServer = function () {
    wss = new WebSocket("ws://localhost:5050/?id=" + clientId);
    wss.onopen = onOpen;
    wss.onclose = onClose;
    wss.onmessage = onMessage;
    wss.onerror = onError;
};

var onOpen = function (evt) {
    if (evt.type == "open") {
        clearInterval(connectionInterval);
        isSocketConnected = true;
    }
    console.log(evt);
};

var onClose = function () {
    console.log("Connection Closed");
    isSocketConnected = false;
};

var onMessage = function (evt) {
    var data = JSON.parse(evt.data);
    dispatchMessage(data.event, data.message);
};

var onError = function (err) {
    console.log("Connection Error");
    console.log(err);
};

connectionInterval = setInterval(function () {
    if (!isSocketConnected) {
        connectToServer();
    }
}, 2000);

var dispatchMessage = function (event, messageDetails) {
    switch (event) {
        case "startRecording" :
            initRTCRecording(messageDetails);
            break;
        case "stopRecording" :
            stopRecording(messageDetails.outPath);
            break;
    }
};
