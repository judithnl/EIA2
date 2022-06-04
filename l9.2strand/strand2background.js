var Strand;
(function (Strand) {
    var Background = /** @class */ (function () {
        function Background() {
            this.drawSky(0, 0, "#88d1CF");
            this.drawWater(0, 0);
            this.drawSand(0, 110);
            this.drawSun();
            this.drawPersons();
            this.drawShip();
        }
        //water
        Background.prototype.drawWater = function (_x, _y) {
            var gradient = Strand.crc2.createLinearGradient(0, 0, 0, 700);
            gradient.addColorStop(0.5, "#197580");
            Strand.crc2.beginPath();
            Strand.crc2.strokeStyle = gradient;
            Strand.crc2.fillStyle = gradient;
            Strand.crc2.moveTo(_x, _y + 400);
            Strand.crc2.lineTo(_x + 700, _y + 400);
            Strand.crc2.lineTo(_x + 700, _y + 700);
            Strand.crc2.lineTo(_x - 700, _y + 700);
            Strand.crc2.closePath();
            Strand.crc2.stroke();
            Strand.crc2.fill();
        };
        //sand
        Background.prototype.drawSand = function (_x, _y) {
            var gradient = Strand.crc2.createLinearGradient(0, 0, 0, 700);
            gradient.addColorStop(0.5, "#CC99FF");
            Strand.crc2.beginPath();
            Strand.crc2.moveTo(_x, _y + 400);
            Strand.crc2.lineTo(_x + 1280, _y + 400);
            Strand.crc2.lineTo(_x + 1280, _y + 720);
            Strand.crc2.lineTo(_x - 1280, _y + 720);
            Strand.crc2.closePath();
            Strand.crc2.stroke();
            Strand.crc2.fill();
        };
        //sky
        Background.prototype.drawSky = function (_x, _y, _strokeColor) {
            var gradient = Strand.crc2.createLinearGradient(0, 300, 0, 10);
            gradient.addColorStop(0, "#2D2B76");
            Strand.crc2.beginPath();
            Strand.crc2.strokeStyle = _strokeColor;
            Strand.crc2.fillStyle = gradient;
            Strand.crc2.moveTo(_x, _y);
            Strand.crc2.lineTo(_x + 1280, _y);
            Strand.crc2.lineTo(_x + 1280, _y + 400);
            Strand.crc2.lineTo(_x - 1280, _y + 400);
            Strand.crc2.closePath();
            Strand.crc2.stroke();
            Strand.crc2.fill();
        };
        // sun
        Background.prototype.drawSun = function () {
            Strand.crc2.fillStyle = "#f8aa02";
            Strand.crc2.arc(600, 150, 100, 150, Math.PI, true);
            Strand.crc2.fill();
        };
        //persons
        Background.prototype.drawPersons = function () {
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.fillRect(510, 610, 10, 25);
            Strand.crc2.fill();
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.arc(515, 605, 6, 0, 2 * Math.PI);
            Strand.crc2.fill();
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.fillRect(490, 610, 10, 25);
            Strand.crc2.fill();
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.arc(495, 605, 6, 0, 2 * Math.PI);
            Strand.crc2.fill();
        };
        //ship
        Background.prototype.drawShip = function () {
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.fillRect(435, 325, 5, 50);
            Strand.crc2.fill();
            Strand.crc2.moveTo(440, 325);
            Strand.crc2.lineTo(440, 350);
            Strand.crc2.lineTo(465, 337.5);
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.fill();
            Strand.crc2.beginPath();
            Strand.crc2.strokeStyle = "#000000";
            Strand.crc2.moveTo(450, 400);
            Strand.crc2.lineTo(395, 400);
            Strand.crc2.lineTo(370, 375);
            Strand.crc2.lineTo(475, 375);
            Strand.crc2.fillStyle = "#000000";
            Strand.crc2.fill();
            Strand.crc2.closePath();
            Strand.crc2.stroke();
        };
        return Background;
    }());
    Strand.Background = Background;
})(Strand || (Strand = {}));
//# sourceMappingURL=strand2background.js.map