var myUsername = "butt";
var myPassword = "crack";

console.log("injected");

chrome.runtime.onConnect.addListener( function(port) {
    //console.assert(port.name == "Popup");
    console.log("started");
    port.onMessage.addListener(function(msg) {
        console.log("Nutting hard");
        if (msg.status == "fillPass") {
            var fields = getLoginFields()[0]
            console.log(fields);
            fields[0].value = myUsername;
            fields[1].value = myPassword;

            port.postMessage({injectStatus: "Good"});
        }
    });
});

function getLoginFields() {
    var fieldPairs = [],
        pswd = (function(){
            var inputs = document.getElementsByTagName('input'),
                len = inputs.length,
                ret = [];
            while (len--) {
                if (inputs[len].type === 'password') {
                    ret[ret.length] = inputs[len];
                }
            }
            return ret;
        })(),
        pswdLength = pswd.length,
        parentForm = function(elem) {
            while (elem.parentNode) {
                if(elem.parentNode.nodeName.toLowerCase() === 'form') {
                    return elem.parentNode;
                }
                elem = elem.parentNode;
            }
        };
    while (pswdLength--) {
        var curPswdField = pswd[pswdLength],
            parentForm = parentForm(curPswdField),
            curField = curPswdField;
        if (parentForm) {
            var inputs = parentForm.getElementsByTagName('input');
            for (var i = 0; i < inputs.length; i++) {
                if (inputs[i] !== curPswdField && inputs[i].type === 'text') {
                    fieldPairs[fieldPairs.length] = [inputs[i], curPswdField];
                    break;
                }
            }
        }
    }
    return fieldPairs;
}


