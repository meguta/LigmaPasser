document.addEventListener('DOMContentLoaded', function(){
    document.querySelector('#generate').addEventListener('click', generatePassword); 
});

function generatePassword() {
    console.log("...changed...");
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        var port = chrome.tabs.connect(tabs[0].id);
        port.postMessage({status: "fillPass"});
        port.onMessage.addListener(function(msg){
            console.log("Kinda working");
            if (msg.injectStatus == "Good") {
                console.log("Working")
            }
        });
    });
    
}