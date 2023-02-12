"use strict";
var fireworks;
(function (fireworks) {
    class RocketWithPhysics {
        position;
        velocity;
        rotationValue; // Which way the rocket is heading
        yGravity;
        lifetime;
        lifetimeMax;
        size;
        colorStart;
        colorEnd;
        particleAmount;
        colorCurrent;
        shouldBeDestroyed;
        canBeOverwritten;
        hierarchy;
        hierarchyMax;
        radius;
        constructor(_position, _velocity, _yGravity, _lifetime, _size, _colorStart, _colorEnd, _particleAmount, _hierachy, _hierarchyMax, _radius) {
            this.position = _position;
            this.velocity = _velocity;
            this.rotationValue = 0;
            this.yGravity = _yGravity;
            this.lifetime = _lifetime;
            this.lifetimeMax = _lifetime;
            this.size = _size;
            this.colorStart = _colorStart;
            this.colorEnd = _colorEnd;
            this.shouldBeDestroyed = false;
            this.canBeOverwritten = false;
            this.particleAmount = _particleAmount;
            this.hierarchy = _hierachy;
            this.hierarchyMax = _hierarchyMax;
            this.radius = _radius;
        }
        copyPosition(_target) {
            this.position = new fireworks.Vector(_target.position.x, _target.position.y);
            this.velocity = new fireworks.Vector(_target.velocity.x, _target.velocity.y);
        }
        calculateNewValue(timeElapsed, canvasWidth, canvasHeight) {
            this.velocity.y = this.velocity.y + (this.yGravity * timeElapsed / 1000); // gravity dampens the y velocity over time
            this.position.x = Math.min(Math.max(this.position.x + this.velocity.x, 0), canvasWidth);
            this.position.y = Math.min(Math.max(this.position.y + this.velocity.y, 0), canvasHeight);
            if (this.lifetime < 0) {
                this.shouldBeDestroyed = true;
            }
            else {
                this.lifetime = this.lifetime - (timeElapsed / 10000);
            }
        }
    }
    fireworks.RocketWithPhysics = RocketWithPhysics;
})(fireworks || (fireworks = {}));
//# sourceMappingURL=rockets.js.map