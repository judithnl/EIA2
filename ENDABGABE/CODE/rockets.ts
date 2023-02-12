namespace fireworks {
    
    export class Rocketsss{
        public position: Vector;
        public velocity: Vector;
        public rotationValue: number;
        public yGravity: number;
        public lifetime: number;
        public lifetimeMax: number;
        public size: number;
        public colorStart: string;
        public colorEnd: string;
        public particleAmount: number;
        public colorCurrent: string;
        public shouldBeDestroyed: boolean;
        public canBeOverwritten: boolean;
        public hierarchy: number;
        public hierarchyMax: number;
        public radius: number;

        constructor(_position: Vector, _velocity: Vector, _yGravity: number, _lifetime: number, _size: number, _colorStart: string, _colorEnd: string, _particleAmount: number,_hierachy: number, _hierarchyMax : number, _radius: number) {
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

        public Position(_target: Rocketsss): void {
            this.position = new Vector(_target.position.x, _target.position.y);
            this.velocity = new Vector(_target.velocity.x, _target.velocity.y);
        }

        public newValue(timeElapsed: number, canvasWidth: number, canvasHeight: number): void {
            this.velocity.y = this.velocity.y + (this.yGravity * timeElapsed / 1000); 
            this.position.x = Math.min(Math.max(this.position.x + this.velocity.x, 0), canvasWidth);
            this.position.y = Math.min(Math.max(this.position.y + this.velocity.y, 0), canvasHeight);

            if (this.lifetime < 0) {
                this.shouldBeDestroyed = true;
            } else {
                this.lifetime = this.lifetime - (timeElapsed / 10000);
            }
        }

    }
}