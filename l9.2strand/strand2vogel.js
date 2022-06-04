var Strand;
(function (Strand) {
    var Bird = /** @class */ (function () {
        function Bird() {
            this.drawBirds1();
        }
        Bird.prototype.update = function () {
            this.drawBirds1();
            this.move();
        };
        Bird.prototype.drawBirds1 = function () {
            Strand.crc2.beginPath();
            Strand.crc2.moveTo(this.x + 369, this.y + 264);
            Strand.crc2.bezierCurveTo(this.x + 377, this.y + 233, this.x + 417, this.y + 235, this.x + 422, this.y + 263);
            Strand.crc2.bezierCurveTo(this.x + 420, this.y + 233, this.x + 472, this.y + 235, this.x + 472, this.y + 263);
            Strand.crc2.lineWidth = 5;
            Strand.crc2.strokeStyle = "#000000";
            Strand.crc2.stroke();
        };
        Bird.prototype.move = function () {
            this.x += Math.random() * 1 + 2;
            this.y += Math.random() * 1 - 2;
            for (var i = 0; i < 3; i++) {
                if (this.x < 0) {
                    this.x += Strand.crc2.canvas.width;
                }
                if (this.y < 0) {
                    this.y += Strand.crc2.canvas.height;
                }
                if (this.x >= Strand.crc2.canvas.width) {
                    this.x -= Strand.crc2.canvas.width;
                }
                if (this.y > Strand.crc2.canvas.height) {
                    this.y -= Strand.crc2.canvas.height;
                }
            }
        };
        return Bird;
    }());
    Strand.Bird = Bird;
})(Strand || (Strand = {}));
//# sourceMappingURL=strand2vogel.js.map