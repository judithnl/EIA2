namespace aufgabe3{

    interface Card {
        value: string;
    }

    //Variablen
    let values: string[] = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "20", "21", "22", "23", "24", "25"];
    let turnedCards: Card[] = [];
    let allCards: Card[] = [];
    let allDivs: HTMLDivElement[] = [];
    let turnedDivs: HTMLDivElement[] = [];

    let wrapper: HTMLDivElement;

    let donecard: Card;
    let card: HTMLDivElement;

    let minutes: number = 0;
    let seconds: number = 0;
    let displaytimer: HTMLSpanElement;

    let form: HTMLFormElement;
    let pairsString: string;
    let pairsNumber: number;
    let cardsizeString: string;
    let cardsizeNumber: number;
    let backgroundcolor: string;
    let cardbackcolor: string;
    let fontcolor: string;
    let font: string;


    window.addEventListener("load", handleLoad);

    function handleLoad(): void {
        wrapper = document.querySelector("#wrapper");
        document.querySelector("#button").addEventListener("click", pushToStart);
        applySettings();
    }
    function applySettings(): void {
        form = document.querySelector("#settings");
        form.addEventListener("change", handleSettingChange);
        let formData: FormData = new FormData(document.forms[0]);
        pairsString = formData.get("pairs").toString();
        pairsNumber = parseInt(pairsString);
        cardsizeString = formData.get("cardsize").toString();
        cardsizeNumber = parseInt(cardsizeString);
        backgroundcolor = formData.get("backgroundcolor").toString();
        cardbackcolor = formData.get("cardbackcolor").toString();
        fontcolor = formData.get("fontcolor").toString();
        font = formData.get("fonts").toString();
    }

    function handleSettingChange(_event: Event): void {
        let formData: FormData = new FormData(document.forms[0]);
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

    function pushToStart(_event: Event): void {
        document.body.style.backgroundColor = backgroundcolor;
        document.body.style.fontFamily = font;
        document.body.style.color = fontcolor;
        wrapper.innerHTML = "";
        createCards();
        dealCards();
        timer();
    }

    function createCards(): void {

        for (let index: number = 0; index < 2; index++) {
            for (let i: number = 0; i < pairsNumber; i++) {
                donecard = { value: values[i] };
                allCards.push(donecard);
            }
        }
    }
    function shuffle(): void {
        for (let r: number = allCards.length - 1; r > 0; r--) {
            let j: number = Math.floor(Math.random() * (r + 1));
            let temp: Card = allCards[r];
            allCards[r] = allCards[j];
            allCards[j] = temp;
        }
    }
    function dealCards(): void {
        shuffle();
        for (let i: number = 0; i < allCards.length; i++) {

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
    function turnFirstCard(_event: Event): void {
        this.style.fontSize = cardsizeNumber * 1 + "px";
        turnedCards.push(this.classList[0]);
        console.log(turnedCards);
        console.log(this.classList);
        turnedDivs.push(this);
        for (let i: number = 0; i < allDivs.length; i++) {
            allDivs[i].removeEventListener("click", turnFirstCard);
        }
        for (let i: number = 0; i < allDivs.length; i++) {
            allDivs[i].addEventListener("click", turnSecondCard);
        }
    }
    function turnSecondCard(_event: Event): void {
        this.style.fontSize = cardsizeNumber * 1 + "px";
        turnedCards.push(this.classList[0]);
        turnedDivs.push(this);
        document.body.style.pointerEvents = "none";
        console.log(turnedCards);


        setTimeout(function (): void {

            if (turnedCards[0] == turnedCards[1]) {
                turnedDivs[0].classList.add("hidden");
                turnedDivs[1].classList.add("hidden");
                turnedDivs[0].style.pointerEvents = "none";
                turnedDivs[1].style.pointerEvents = "none";
                setTimeout(function (): void { congrats(); }, 500);
            }
            else {
                turnedDivs[0].style.fontSize = 0 + "px";
                turnedDivs[1].style.fontSize = 0 + "px";
            }
            for (let i: number = 0; i < allDivs.length; i++) {
                allDivs[i].removeEventListener("click", turnSecondCard);
            }
            for (let i: number = 0; i < allDivs.length; i++) {
                allDivs[i].addEventListener("click", turnFirstCard);
            }
            turnedDivs.splice(0, 2);
            turnedCards.splice(0, 2);
            document.body.style.pointerEvents = "all";


        },         2000);
    }
    function congrats(): void {
        if (wrapper.getElementsByClassName("card").length == wrapper.getElementsByClassName("hidden").length) {
            let congrats=document.createElement("span");
            congrats.classList.add("congrats")
            congrats.innerHTML="Glückwunsch!"
        }

    }
    function timer(): void {
        displaytimer = document.createElement("span");
        displaytimer.classList.add("timer");
        displaytimer.innerHTML = "0" + minutes + ":" + "0" + seconds;
        setInterval(function (): void {
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
            else { displaytimer.innerHTML = minutes + ":" + seconds; }

        },          1000);
        document.body.appendChild(displaytimer);
    }

}