namespace Strand {

    
        window.addEventListener("load", handleLoad);
    
        export let crc2: CanvasRenderingContext2D;
        let canvas: HTMLCanvasElement;
        let imgData: ImageData;
    
        let Clouds: Cloud[] = [];
        let flyingBirds: Bird[] = [];
    
        export let z: number = 10;
    
    
        function handleLoad(_event: Event): void {
    
            canvas = document.getElementsByTagName("canvas")[0];
            crc2 = canvas.getContext("2d")!;
    
    
            let bG: Background = new Background;
            console.log(bG); 
    
    
        
    
            for (let i: number = 0; i < 3; i++) {
                let birdsflying: Bird = new Bird();
                birdsflying.x = Math.random() * crc2.canvas.width;
                birdsflying.y = 5 & 5;
                birdsflying.speed = (Math.random() + 1) * 0.5;
                flyingBirds.push(birdsflying); 
            }
    
    
            imgData = crc2.getImageData(0, 0, canvas.width, canvas.height);
    
    
            for (let i: number = 0; i < 10; i++) {
                let eyCloud: Cloud = new Cloud();
                eyCloud.x = Math.random() * crc2.canvas.width;
                eyCloud.y = Math.random() * crc2.canvas.height - 550;
                eyCloud.speed = (Math.random() + 1) * 0.5;
                Clouds.push(eyCloud); 
            }
    
            window.setTimeout(animate, 10);
    
        }
    
    
        function animate(): void {
    
            crc2.putImageData(imgData, 0, 0); 
    
           
            for (let i: number = 0; i < Clouds.length; i++) {
    
                Clouds[i].moveForward();
                
    
                if (Clouds[i].x > + 1300) {
                    Clouds[i].x = canvas.width - 3000;
                }

            }
    
            drawClouds();
    
            for (let i: number = 0; i < flyingBirds.length; i++) {
                flyingBirds[i].move();
    
    
                if (flyingBirds[i].x > + 1300) {
                    flyingBirds[i].x = canvas.width - 1800;
                }
            }
    
            drawBird();
            
            window.setTimeout(animate, 10);
    
        } 
    
    
        function drawClouds(): void {
    
            for (let i: number = 0; i < Clouds.length; i++)
                Clouds[i].drawCloud1();

        } 
    
    
        function drawBird(): void {
            for (let i: number = 0; i < flyingBirds.length; i++)
                flyingBirds[i].drawBirds1();
        }

        
    
    
    } 