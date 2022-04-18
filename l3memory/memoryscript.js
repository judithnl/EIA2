var aufgabe3;
(function (aufgabe3) {
    //Variablen
    var values = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
    var turnedCards = [];
    var allCards = [];
    var allDivs = [];
    var turnedDivs = [];
    var wrapper;
    var donecard;
    var card;
    var minutes = 0;
    var seconds = 0;
    var displaytimer;
    var form;
    var pairsString;
    var pairsNumber;
    var cardsizeString;
    var cardsizeNumber;
    var backgroundcolor;
    var cardbackcolor;
    var fontcolor;
    var font;
    window.addEventListener("load", handleLoad);
    function handleLoad() {
        wrapper = document.querySelector("#wrapper");
        document.querySelector("#button").addEventListener("click", pushToStart);
        applySettings();
    }
    function applySettings() {
        form = document.querySelector("#settings");
        form.addEventListener("change", handleSettingChange);
        var formData = new FormData(document.forms[0]);
        pairsString = formData.get("pairs").toString();
        pairsNumber = parseInt(pairsString);
        cardsizeString = formData.get("cardsize").toString();
        cardsizeNumber = parseInt(cardsizeString);
        backgroundcolor = formData.get("backgroundcolor").toString();
        cardbackcolor = formData.get("cardbackcolor").toString();
        fontcolor = formData.get("fontcolor").toString();
        font = formData.get("fonts").toString();
    }
    function handleSettingChange(_event) {
        var formData = new FormData(document.forms[0]);
        pairsString = formData.get("pairs").toString();
        pairsNumber = parseInt(pairsString);
        cardsizeString = formData.get("cardsize").toString();
        cardsizeNumber = parseInt(cardsizeString);
        backgroundcolor = formData.get("backgroundcolor").toString();
        cardbackcolor = formData.get("cardbackcolor").toString();
        fontcolor = formData.get("fontcolor").toString();
        font = formData.get("fonts").toString();
        document.body.style.fontFamily = font;
    }
    function pushToStart(_event) {
        document.body.style.backgroundColor = backgroundcolor;
        document.body.style.fontFamily = font;
        document.body.style.color = fontcolor;
        wrapper.innerHTML = "";
        createCards();
        dealCards();
        timer();
    }
    function createCards() {
        for (var index = 0; index < 2; index++) {
            for (var i = 0; i < pairsNumber; i++) {
                donecard = { value: values[i] };
                allCards.push(donecard);
            }
        }
    }
    function shuffle() {
        for (var r = allCards.length - 1; r > 0; r--) {
            var j = Math.floor(Math.random() * (r + 1));
            var temp = allCards[r];
            allCards[r] = allCards[j];
            allCards[j] = temp;
        }
    }
    function dealCards() {
        shuffle();
        for (var i = 0; i < allCards.length; i++) {
            card = document.createElement("div");
            card.className = allCards[i].value;
            card.classList.add("card");
            card.style.fontSize = 0 + "px";
            card.style.backgroundColor = cardbackcolor;
            card.style.color = fontcolor;
            card.style.fontFamily = font;
            card.style.width = cardsizeNumber + "px";
            card.style.height = cardsizeNumber * 1 + "px";
            card.innerHTML = allCards[i].value;
            card.addEventListener("click", turnFirstCard);
            donecard = { value: values[i] };
            allDivs.push(card);
            wrapper.appendChild(card);
        }
    }
    function turnFirstCard(_event) {
        this.style.fontSize = cardsizeNumber * 1 + "px";
        turnedCards.push(this.classList[0]);
        console.log(turnedCards);
        console.log(this.classList);
        turnedDivs.push(this);
        for (var i = 0; i < allDivs.length; i++) {
            allDivs[i].removeEventListener("click", turnFirstCard);
        }
        for (var i = 0; i < allDivs.length; i++) {
            allDivs[i].addEventListener("click", turnSecondCard);
        }
    }
    function turnSecondCard(_event) {
        this.style.fontSize = cardsizeNumber * 1 + "px";
        turnedCards.push(this.classList[0]);
        turnedDivs.push(this);
        document.body.style.pointerEvents = "none";
        console.log(turnedCards);
        setTimeout(function () {
            if (turnedCards[0] == turnedCards[1]) {
                turnedDivs[0].classList.add("hidden");
                turnedDivs[1].classList.add("hidden");
                turnedDivs[0].style.pointerEvents = "none";
                turnedDivs[1].style.pointerEvents = "none";
                setTimeout(function () { congrats(); }, 500);
            }
            else {
                turnedDivs[0].style.fontSize = 0 + "px";
                turnedDivs[1].style.fontSize = 0 + "px";
            }
            for (var i = 0; i < allDivs.length; i++) {
                allDivs[i].removeEventListener("click", turnSecondCard);
            }
            for (var i = 0; i < allDivs.length; i++) {
                allDivs[i].addEventListener("click", turnFirstCard);
            }
            turnedDivs.splice(0, 2);
            turnedCards.splice(0, 2);
            document.body.style.pointerEvents = "all";
        }, 2000);
    }
    function congrats() {
        if (wrapper.getElementsByClassName("card").length == wrapper.getElementsByClassName("hidden").length) {
            var congrats_1 = document.createElement("span");
            congrats_1.classList.add("congrats");
            congrats_1.innerHTML = "Glückwunsch!";
        }
    }
    function timer() {
        displaytimer = document.createElement("span");
        displaytimer.classList.add("timer");
        displaytimer.innerHTML = "0" + minutes + ":" + "0" + seconds;
        setInterval(function () {
            seconds++;
            if (seconds == 59) {
                minutes++;
                seconds = 0;
            }
            if (seconds < 10 && minutes < 10) {
                displaytimer.innerHTML = "0" + minutes + ":" + "0" + seconds;
            }
            else if (minutes < 10) {
                displaytimer.innerHTML = "0" + minutes + ":" + seconds;
            }
            else {
                displaytimer.innerHTML = minutes + ":" + seconds;
            }
        }, 1000);
        document.body.appendChild(displaytimer);
    }
})(aufgabe3 || (aufgabe3 = {}));
//# sourceMappingURL=memoryscript.js.map