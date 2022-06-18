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
    var Bird = /** @class */ (function (_super) {
        __extends(Bird, _super);
        function Bird() {
            var _this = _super.call(this, strand3.nullvector, strand3.nullvector) || this;
            _this.position = new strand3.Vector(0, 0);
            _this.velocity = new strand3.Vector(0, 0);
            _this.velocity.random(50, 100);
            _this.drawbird;
            return _this;
        }
        Bird.prototype.move = function (_timeslice) {
            var offset = new strand3.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0) {
                this.position.x += strand3.crc2.canvas.width;
            }
            if (this.position.y < 0) {
                this.position.y += strand3.crc2.canvas.height;
            }
            if (this.position.x > strand3.crc2.canvas.width) {
                this.position.x -= strand3.crc2.canvas.width;
            }
            if (this.position.y > strand3.crc2.canvas.height) {
                this.position.y -= strand3.crc2.canvas.height;
            }
        };
        Bird.prototype.drawbird = function () {
            strand3.crc2.save();
            strand3.crc2.translate(this.position.x, this.position.y);
            strand3.crc2.beginPath();
            strand3.crc2.moveTo(0, -2);
            strand3.crc2.bezierCurveTo(5, -5, 5, -5, 10, 0);
            strand3.crc2.moveTo(10, 0);
            strand3.crc2.bezierCurveTo(15, -5, 15, -5, 20, -2);
            strand3.crc2.stroke();
            strand3.crc2.restore();
        };
        return Bird;
    }(strand3.Moves));
    strand3.Bird = Bird;
})(strand3 || (strand3 = {}));
//# sourceMappingURL=strand3vogel.js.map