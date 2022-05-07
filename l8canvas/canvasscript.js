var l8;
(function (l8) {
    window.addEventListener("load", draw);
    function draw() {
        var canvas = document.querySelector("canvas");
        canvas.width = 7000;
        canvas.height = 650;
        var create = canvas.getContext("2d");
        create.fillStyle = "violet";
        create.scale(5, 5);
        create.fillRect(50, 0, 150, 300);
        function getRandomNumber(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min;
        }
        create.beginPath();
        create.arc(getRandomNumber(10, 60), getRandomNumber(5, 40), getRandomNumber(15, 20), 0, 2.5 * Math.PI);
        create.strokeStyle = "blue";
        create.closePath();
        create.stroke();
        function Circles() {
            for (var i = 0; i < 6; i++) {
                create.beginPath();
                create.arc(getRandomNumber(50, 100), getRandomNumber(10, 80), getRandomNumber(10, 70), 0, 2 * Math.PI);
                create.strokeStyle = "lightgreen";
                create.stroke();
            }
        }
        Circles();
        function Circles2() {
            for (var i = 0; i < 3; i++) {
                create.beginPath();
                create.arc(getRandomNumber(50, 100), getRandomNumber(10, 80), getRandomNumber(10, 70), 0, 2 * Math.PI);
                create.strokeStyle = "cyan";
                create.stroke();
            }
        }
        Circles2();
        function Circles3() {
            for (var i = 0; i < 2; i++) {
                create.beginPath();
                create.arc(getRandomNumber(50, 100), getRandomNumber(10, 80), getRandomNumber(10, 70), 0, 2 * Math.PI);
                create.strokeStyle = "blue";
                create.stroke();
            }
        }
        Circles3();
        var randomNumber = Math.floor(Math.random() * 40);
        create.beginPath();
        create.strokeStyle = "cyan";
        create.moveTo(randomNumber, 20);
        create.lineTo(getRandomNumber(20, 140), getRandomNumber(50, 140));
        create.stroke();
        create.lineTo(getRandomNumber(100, 80), getRandomNumber(50, 80));
        create.stroke();
        create.lineTo(randomNumber, 20);
        create.stroke();
        create.closePath();
        create.beginPath();
        create.strokeStyle = "yellow";
        create.moveTo(randomNumber, 20);
        create.lineTo(getRandomNumber(20, 140), getRandomNumber(50, 140));
        create.stroke();
        create.lineTo(getRandomNumber(100, 80), getRandomNumber(50, 80));
        create.stroke();
        create.lineTo(randomNumber, 20);
        create.stroke();
        create.closePath();
    }
})(l8 || (l8 = {}));
//# sourceMappingURL=canvasscript.js.map