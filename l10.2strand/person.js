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
    var Person = /** @class */ (function (_super) {
        __extends(Person, _super);
        function Person(_position) {
            var _this = _super.call(this, strand3.nullvector) || this;
            _this.position = _position;
            _this.people;
            return _this;
        }
        Person.prototype.people = function () {
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
        return Person;
    }(strand3.notmove));
    strand3.Person = Person;
})(strand3 || (strand3 = {}));
//# sourceMappingURL=person.js.map