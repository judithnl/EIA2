var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var strand3;
(function (strand3) {
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            var _this = _super.call(this, strand3.nullvector, strand3.nullvector) || this;
            _this.position = new strand3.Vector(0, 0);
            _this.velocity = new strand3.Vector(0, 0);
            _this.velocity.random(50, 100);
            return _this;
        }
        Cloud.prototype.drawCloud1 = function () {
            strand3.crc2.beginPath();
            strand3.crc2.fillStyle = "#e90fc4";
            strand3.crc2.arc(this.x + 20, this.y + 30, 20, 0, 2 * Math.PI);
            strand3.crc2.arc(this.x + 50, this.y + 25, 40, 0, 2 * Math.PI);
            strand3.crc2.arc(this.x + 90, this.y + 20, 35, 0, 2 * Math.PI);
            strand3.crc2.closePath();
            strand3.crc2.fill();
        };
        Cloud.prototype.moveForward = function () {
            this.x += this.speed * (+0.2);
        };
        return Cloud;
    }(strand3.Moves));
    strand3.Cloud = Cloud;
})(strand3 || (strand3 = {}));
//# sourceMappingURL=strand3wolke.js.map