
var video = document.getElementById('video');

//Cross Browser user media function
navigator.getMedia = (navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia);

var options = {
    video: true,
    audio: false
};

var onSuccess = function(stream) {
    //Firefox
    if (navigator.mozGetUserMedia) {
         video.mozSrcObject = stream;
    } else {
         //Chrome,Opera
         var vendorURL = window.URL || window.webkitURL;
         video.src = vendorURL.createObjectURL(stream);
    }
};

var onError = function(err) {
    console.log("An error occured! " + err);
};

navigator.getMedia(options, onSuccess, onError);

function takePhoto() {
    
    var canvas = document.getElementById('canvas');
    
    var canvasWidth = 320;
    var canvasHeight = video.videoHeight / (video.videoWidth / canvasWidth);
    canvas.setAttribute('width', canvasWidth);
    canvas.setAttribute('height', canvasHeight);
    canvas.getContext('2d').drawImage(video, 0, 0, canvasWidth, canvasHeight);
};

//fuck function, i love you
function dataURItoBlob(dataURI) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
};


function invia(){
    var dataURL = canvas.toDataURL('image/jpeg');
    var blob = dataURItoBlob(dataURL);
    var img = new FormData(document.forms[0]);
    img.append("img", blob);
    console.log(img);
    $.ajax({
        url: 'https://apius.faceplusplus.com/v2/detection/detect?api_key=62126969655ce884764c0d54ed0d4b32&api_secret=E4iRtm26kf2Or4rji5ewptP9P3_NVnnF',
        type: 'POST',
        data: img,
        contentType: false,
        processData: false,
        success: function(response) {
            console.log(JSON.stringify(response));
        },
    });
};

$('#invia').click(function(){
invia();
});
