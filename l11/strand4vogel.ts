namespace strand4 {
        export class Bird extends Moves {
    
            constructor() {
                super(nullvector, nullvector);
                this.position = new Vector(0, 0);
                this.velocity = new Vector (0, 0);
                this.velocity.random(50, 100);
                this.drawbird
            }
            move(_timeslice: number): void {
                let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
                offset.scale(_timeslice);
                this.position.add(offset);
    
                if (this.position.x < 0) { this.position.x += crc2.canvas.width; }
                if (this.position.y < 0) { this.position.y += crc2.canvas.height; }
                if (this.position.x > crc2.canvas.width) { this.position.x -= crc2.canvas.width; }
                if (this.position.y > crc2.canvas.height) { this.position.y -= crc2.canvas.height; }
    
            }
            drawbird(): void {
                crc2.save();
                crc2.translate(this.position.x, this.position.y);
                crc2.beginPath();
                crc2.moveTo(0, -2);
                crc2.bezierCurveTo(5, -5, 5, -5, 10, 0);
                crc2.moveTo(10, 0);
                crc2.bezierCurveTo(15, -5, 15, -5, 20, -2);
                crc2.stroke();
                crc2.restore();
            }
                     
    } 
    
    }
    
