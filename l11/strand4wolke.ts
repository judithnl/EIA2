namespace strand4 {

        
        export class strandw4wolke extends Moves {
    
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
            
            enum TASK {
                RIGHT, 
                LEFT
            }

            export class Cloud extends Moves {
                x: number;
                y: number;
                color: string;
                private task: TASK = TASK.LEFT;
        

            react(_x: number, _y: number): void {
                let distanceX: number = Math.abs(this.x - _x);
                let distanceY: number = Math.abs(this.y - _y);
  
                
                if (distanceX < 50 && distanceY < 120) {
                    this.task = TASK.LEFT;
                    
                    if (this.task == this.task) {
                        this.task = TASK.LEFT;
                    }
                    else if (this.task != this.task) {
                        this.task = TASK.RIGHT;
                    }
                }
            }
    
            move(): void {
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
    
            }
    
        }
    
        } 
    