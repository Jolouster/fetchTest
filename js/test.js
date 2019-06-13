function getNewData() {
    console.log("%cSe ejecuta getNewData", "color:green");

    sendRequest("src/ajax/ajaxTest.php", "getnewdata")
    .then (function(data) {
        console.log('Se han recibido nuevos datos');
        if(counter > 10) {
            _("content").innerHTML = '';
            counter = 0;
        } else {
            counter++;
        }
        _("content").insertAdjacentHTML('beforeend', data.result);
        setTimeout(getNewData, 1000);
    })
    .catch (function(error) {
        console.error("Error: ", error);
    })
}

_("action").addEventListener("click", function() {
    console.log("Button clicked!");
    let previous = { "previous": _("result").innerHTML };
    sendRequest("src/ajax/ajaxTest.php", "changeStatus", previous)
    .then(function(data){
        _("result").innerHTML = data.result;
    })
    .catch(function(error) {
        console.error("Error: ", error);
    })
});

var counter = 0;

document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM fully loaded");
    getNewData();
})