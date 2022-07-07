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
var strand4;
(function (strand4) {
    var strandw4wolke = /** @class */ (function (_super) {
        __extends(strandw4wolke, _super);
        function strandw4wolke() {
            var _this = _super.call(this, strand4.nullvector, strand4.nullvector) || this;
            _this.position = new strand4.Vector(0, 0);
            _this.velocity = new strand4.Vector(0, 0);
            _this.velocity.random(50, 100);
            return _this;
        }
        strandw4wolke.prototype.drawCloud1 = function () {
            strand4.crc2.beginPath();
            strand4.crc2.fillStyle = "#e90fc4";
            strand4.crc2.arc(this.x + 20, this.y + 30, 20, 0, 2 * Math.PI);
            strand4.crc2.arc(this.x + 50, this.y + 25, 40, 0, 2 * Math.PI);
            strand4.crc2.arc(this.x + 90, this.y + 20, 35, 0, 2 * Math.PI);
            strand4.crc2.closePath();
            strand4.crc2.fill();
        };
        strandw4wolke.prototype.moveForward = function () {
            this.x += this.speed * (+0.2);
        };
        return strandw4wolke;
    }(strand4.Moves));
    strand4.strandw4wolke = strandw4wolke;
    var TASK;
    (function (TASK) {
        TASK[TASK["RIGHT"] = 0] = "RIGHT";
        TASK[TASK["LEFT"] = 1] = "LEFT";
    })(TASK || (TASK = {}));
    var Cloud = /** @class */ (function (_super) {
        __extends(Cloud, _super);
        function Cloud() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.task = TASK.LEFT;
            return _this;
        }
        Cloud.prototype.react = function (_x, _y) {
            var distanceX = Math.abs(this.x - _x);
            var distanceY = Math.abs(this.y - _y);
            if (distanceX < 50 && distanceY < 120) {
                this.task = TASK.LEFT;
                if (this.task == this.task) {
                    this.task = TASK.LEFT;
                }
                else if (this.task != this.task) {
                    this.task = TASK.RIGHT;
                }
            }
        };
        Cloud.prototype.move = function () {
            this.y = 700;
            if (this.task == TASK.LEFT) {
                this.x = this.x - 1;
            }
            else if (this.task == TASK.RIGHT) {
                this.x = this.x + 1;
            }
            if (this.x == 680) {
                this.x = -4;
            }
            if (this.x == -5) {
                this.x = 679;
            }
        };
        return Cloud;
    }(strand4.Moves));
    strand4.Cloud = Cloud;
})(strand4 || (strand4 = {}));
//# sourceMappingURL=strand4wolke.js.map