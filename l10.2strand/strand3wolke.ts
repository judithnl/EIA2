namespace strand3 {

        
        export class Cloud extends Moves {
    
            constructor() {
                super(nullvector, nullvector);
                this.position = new Vector(0, 0);
                this.velocity = new Vector (0, 0);
                this.velocity.random(50, 100);
            }

            x: number;
            y: number;
            speed: number;
    
            drawCloud1(): void {
    
                crc2.beginPath();
                crc2.fillStyle = "#e90fc4";

                crc2.arc(this.x + 20, this.y + 30, 20, 0, 2 * Math.PI);
                crc2.arc(this.x + 50, this.y + 25, 40, 0, 2 * Math.PI);
                crc2.arc(this.x + 90, this.y + 20, 35, 0, 2 * Math.PI);
    

                crc2.closePath();
                crc2.fill();
            }
    

    
            moveForward(): void {
                this.x += this.speed * (+0.2) ; 

                    } 

            }
    
        } 
    