var aufgabe2;
(function (aufgabe2) {
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        document.addEventListener("mousemove", setInfoBox);
        document.addEventListener("click", logInfo);
        document.addEventListener("keyup", logInfo);
        document.body.addEventListener("click", logInfo);
        document.body.addEventListener("keyup", logInfo);
        var divs = document.querySelectorAll("div");
        console.log(divs);
        for (var i = 0; i < divs.length; i++) {
            divs[i].addEventListener("click", logInfo);
            divs[i].addEventListener("keyup", logInfo);
        }
    }
    function setInfoBox(_event) {
        var x = _event.clientX;
        var y = _event.clientY;
        var spanfix = document.querySelector("span");
        spanfix.style.top = (y + 15) + "px";
        spanfix.style.left = (x + 15) + "px";
        spanfix.textContent = " x = " + x + "; y = " + y + "; " + _event.target;
    }
    function logInfo(_event) {
        console.log(_event.target);
        console.log(_event.type);
        console.log(_event.currentTarget);
        console.log(_event);
    }
})(aufgabe2 || (aufgabe2 = {}));
//# sourceMappingURL=handlerscript.js.map