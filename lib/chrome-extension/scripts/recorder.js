var options = {
    type: 'video',
    frameRate: 200,
    quality: 10
};
var recordRTC, isRecording = false;

startRTCRecording = function (mediaStream) {
    if (isRecording) {
        return;
    }
    alert("Recording started");
    recordRTC = RecordRTC(mediaStream, options);
    recordRTC.startRecording();
    isRecording = true;
};

stopRecording = function (stream) {
    return function () {
        var s = stream;
        recordRTC.stopRecording(function (gif) {
            recordRTC.save("simple_gif.webm");
            s.stop();
        });
        isRecording = false;
    }
};