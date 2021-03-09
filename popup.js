document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#generate').addEventListener('click', generatePassword); 
    document.querySelector('#view').addEventListener('click', loginDetails);
    document.querySelector('#fillU').addEventListener('click', fillUsername);
    document.querySelector('#fillP').addEventListener('click', fillPassword);
});

function loginDetails() {
    console.log("show me the details");
}

function fillUsername() {
    console.log("show me the username");
}

function fillPassword() {
    console.log("show me the password");
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
  }

function generatePassword() {
    console.log("...changed...");
    var s = '!"#$%&()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[]^_`abcdefghijklmnopqrstuvwxyz{|}~';
    var sLen = s.length;

    var passLen = 8;
    var genPass = '';

    for (var i=0; i<passLen; i++){
        var pos = getRandomInt(0, sLen);
        genPass += s[pos];
    }

    console.log(genPass);
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var port = chrome.tabs.connect(tabs[0].id);
        
        port.postMessage({pass: genPass});
        port.postMessage({status: "fillPass"});
        
        port.onMessage.addListener(function(msg){
            console.log("Kinda working");
            if (msg.injectStatus == "Good") {
                console.log("Working");
            }
        });
    });
    
}