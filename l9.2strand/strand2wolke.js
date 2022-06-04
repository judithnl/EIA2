var Strand;
(function (Strand) {
    var Cloud = /** @class */ (function () {
        function Cloud() {
        }
        Cloud.prototype.drawCloud1 = function () {
            Strand.crc2.beginPath();
            Strand.crc2.fillStyle = "#e90fc4";
            Strand.crc2.arc(this.x + 20, this.y + 30, 20, 0, 2 * Math.PI);
            Strand.crc2.arc(this.x + 50, this.y + 25, 40, 0, 2 * Math.PI);
            Strand.crc2.arc(this.x + 90, this.y + 20, 35, 0, 2 * Math.PI);
            Strand.crc2.closePath();
            Strand.crc2.fill();
        };
        Cloud.prototype.moveForward = function () {
            this.x += this.speed * (+0.2);
        };
        return Cloud;
    }());
    Strand.Cloud = Cloud;
})(Strand || (Strand = {}));
//# sourceMappingURL=strand2wolke.js.map