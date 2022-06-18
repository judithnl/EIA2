namespace strand3 {
        window.addEventListener("load", handleLoad);
    
        export let crc2: CanvasRenderingContext2D;
        let canvas: HTMLCanvasElement;
        let imgData: ImageData;
    
        let Clouds: Cloud[] = [];
        let flyingBirds: Bird[] = [];
        let immovables: notmove[] = [];
        let movables: Moves[] = [];
    
        export let z: number = 10;
        export let nullvector: Vector;
    
        function handleLoad(_event: Event): void {
            canvas = document.getElementsByTagName("canvas")[0];
            crc2 = canvas.getContext("2d")!;


    
            imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);
    

    
            window.setTimeout(animate, 10);
          
            drawBirds(4);
            drawClouds()
            drawPersons();
        }
                for (let i: number = 0; i < 10; i++) {
                let eyCloud: Cloud = new Cloud();
                eyCloud.x = Math.random() * crc2.canvas.width;
                eyCloud.y = Math.random() * crc2.canvas.height - 550;
                eyCloud.speed = (Math.random() + 1) * 0.5;
                Clouds.push(eyCloud); 
            }
        function animate(): void {
            crc2.putImageData(imgData, 0, 0); 
            for (let i: number = 0; i < Clouds.length; i++) {
                Clouds[i].moveForward();
                if (Clouds[i].x > + 1300) {
                    Clouds[i].x = canvas.width - 3000;
                }
            }
    
            for (let i: number = 0; i < flyingBirds.length; i++) {
                flyingBirds[i].move(4);

            }
        
            window.setTimeout(animate, 10);
        } 
    
        function drawClouds(): void {
            for (let i: number = 0; i < Clouds.length; i++)
                Clouds[i].drawCloud1();
                let cloud3 = new strand3.Cloud();
                movables.push(cloud3);
               
        } 
    
        function drawBirds(_nBirds: number): void {
            for (let i: number = 0; i < _nBirds; i++) {
                let bird2=new strand3.Bird();
                movables.push(bird2);
                Bird[i].drawbird();
            }
        }

        function drawPersons(): void {
            for (let i: number = 0; i < 3; i++) {
                let mensch1=Person[i].people();
                immovables.push(mensch1);
               
            }
            
            
        }


    
    } 