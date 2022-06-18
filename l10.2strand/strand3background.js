var strand3;
(function (strand3) {
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
            var gradient = strand3.crc2.createLinearGradient(0, 0, 0, 700);
            gradient.addColorStop(0.5, "#197580");
            strand3.crc2.beginPath();
            strand3.crc2.strokeStyle = gradient;
            strand3.crc2.fillStyle = gradient;
            strand3.crc2.moveTo(_x, _y + 400);
            strand3.crc2.lineTo(_x + 700, _y + 400);
            strand3.crc2.lineTo(_x + 700, _y + 700);
            strand3.crc2.lineTo(_x - 700, _y + 700);
            strand3.crc2.closePath();
            strand3.crc2.stroke();
            strand3.crc2.fill();
        };
        //sand
        Background.prototype.drawSand = function (_x, _y) {
            var gradient = strand3.crc2.createLinearGradient(0, 0, 0, 700);
            gradient.addColorStop(0.5, "#CC99FF");
            strand3.crc2.beginPath();
            strand3.crc2.moveTo(_x, _y + 400);
            strand3.crc2.lineTo(_x + 1280, _y + 400);
            strand3.crc2.lineTo(_x + 1280, _y + 720);
            strand3.crc2.lineTo(_x - 1280, _y + 720);
            strand3.crc2.closePath();
            strand3.crc2.stroke();
            strand3.crc2.fill();
        };
        //sky
        Background.prototype.drawSky = function (_x, _y, _strokeColor) {
            var gradient = strand3.crc2.createLinearGradient(0, 300, 0, 10);
            gradient.addColorStop(0, "#2D2B76");
            strand3.crc2.beginPath();
            strand3.crc2.strokeStyle = _strokeColor;
            strand3.crc2.fillStyle = gradient;
            strand3.crc2.moveTo(_x, _y);
            strand3.crc2.lineTo(_x + 1280, _y);
            strand3.crc2.lineTo(_x + 1280, _y + 400);
            strand3.crc2.lineTo(_x - 1280, _y + 400);
            strand3.crc2.closePath();
            strand3.crc2.stroke();
            strand3.crc2.fill();
        };
        // sun
        Background.prototype.drawSun = function () {
            strand3.crc2.fillStyle = "#f8aa02";
            strand3.crc2.arc(600, 150, 100, 150, Math.PI, true);
            strand3.crc2.fill();
        };
        //persons
        Background.prototype.drawPersons = function () {
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.fillRect(510, 610, 10, 25);
            strand3.crc2.fill();
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.arc(515, 605, 6, 0, 2 * Math.PI);
            strand3.crc2.fill();
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.fillRect(490, 610, 10, 25);
            strand3.crc2.fill();
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.arc(495, 605, 6, 0, 2 * Math.PI);
            strand3.crc2.fill();
        };
        //ship
        Background.prototype.drawShip = function () {
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.fillRect(435, 325, 5, 50);
            strand3.crc2.fill();
            strand3.crc2.moveTo(440, 325);
            strand3.crc2.lineTo(440, 350);
            strand3.crc2.lineTo(465, 337.5);
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.fill();
            strand3.crc2.beginPath();
            strand3.crc2.strokeStyle = "#000000";
            strand3.crc2.moveTo(450, 400);
            strand3.crc2.lineTo(395, 400);
            strand3.crc2.lineTo(370, 375);
            strand3.crc2.lineTo(475, 375);
            strand3.crc2.fillStyle = "#000000";
            strand3.crc2.fill();
            strand3.crc2.closePath();
            strand3.crc2.stroke();
        };
        return Background;
    }());
    strand3.Background = Background;
})(strand3 || (strand3 = {}));
//# sourceMappingURL=strand3background.js.map