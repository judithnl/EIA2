namespace strand {
    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    let canvas: HTMLCanvasElement;

    function handleLoad(_event: Event): void {
        canvas = document.getElementsByTagName("canvas")[0];
        crc2 = canvas.getContext("2d")!;
        //call functions
        drawSky(0, 0, "#88d1CF");
        drawWater(0, 0);
        drawSand(0, 110);
        drawSun();
        drawCloud(50, 160, "#FFFFFF");
        drawCloud(260, 100, "#f0eeea");
        drawPersons();
        drawBird();
        drawShip();


        //sky
        function drawSky(_x: number, _y: number, _strokeColor: string): void {

            var gradient: CanvasGradient = crc2.createLinearGradient(0, 300, 0, 10);
            gradient.addColorStop(0, "#2D2B76");

            crc2.beginPath();
            crc2.strokeStyle = _strokeColor;
            crc2.fillStyle = gradient;

            crc2.moveTo(_x, _y);
            crc2.lineTo(_x + 1280, _y);
            crc2.lineTo(_x + 1280, _y + 400);
            crc2.lineTo(_x - 1280, _y + 400);

            crc2.closePath();
            crc2.stroke();
            crc2.fill();
        }
        //water
        function drawWater(_x: number, _y: number): void {
            var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 700);
            gradient.addColorStop(0.5, "#197580");

            crc2.beginPath();
            crc2.strokeStyle = gradient;
            crc2.fillStyle = gradient;

            crc2.moveTo(_x, _y + 400);
            crc2.lineTo(_x + 700, _y + 400);
            crc2.lineTo(_x + 700, _y + 700);
            crc2.lineTo(_x - 700, _y + 700);

            crc2.closePath();
            crc2.stroke();
            crc2.fill();
        }

        //sand
        function drawSand(_x: number, _y: number): void {

        var gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, 700);
        gradient.addColorStop(0.5, "#CC99FF");
            crc2.beginPath();
           
            crc2.moveTo(_x, _y + 400);
            crc2.lineTo(_x + 1280, _y + 400);
            crc2.lineTo(_x + 1280, _y + 720);
            crc2.lineTo(_x - 1280, _y + 720);

            crc2.closePath();
            crc2.stroke();
            crc2.fill();
        }



        //sun
        function drawSun(): void {

            crc2.fillStyle = "#f8aa02"
            crc2.arc(600, 150, 100, 150, Math.PI, true);
            crc2.fill();
        }

        //cloud
        function drawCloud(_x: number, _y: number, _fillColor: string): void {

            crc2.beginPath();
            crc2.fillStyle = _fillColor;
            crc2.arc(_x + 20, _y + 30, 20, 0, 2 * Math.PI);
            crc2.arc(_x + 50, _y + 25, 40, 0, 2 * Math.PI);
            crc2.arc(_x + 90, _y + 20, 35, 0, 2 * Math.PI);

            crc2.closePath();
            crc2.fill();
        }

        //people
        function drawPersons(): void {

            crc2.beginPath();
            crc2.fillStyle = "#000000";
            crc2.fillRect(510, 610, 10, 25);
            crc2.fill();
            crc2.beginPath();
            crc2.fillStyle = "#000000";
            crc2.arc(515, 605, 6, 0, 2 * Math.PI);
            crc2.fill();
    
            crc2.beginPath();
            crc2.fillStyle = "#000000";
            crc2.fillRect(490, 610, 10, 25);
            crc2.fill();
            crc2.beginPath();
            crc2.fillStyle = "#000000";
            crc2.arc(495, 605, 6, 0, 2 * Math.PI);
            crc2.fill();
        }

        //bird
        function drawBird(): void {
            crc2.beginPath();
            crc2.moveTo(50, 100);
            crc2.bezierCurveTo(50, 50, 100, 50, 100, 100);
            crc2.moveTo(100, 100);
            crc2.bezierCurveTo(100, 50, 150, 50, 150, 100);

            crc2.lineWidth = 5;
            crc2.strokeStyle = "#000000";
            crc2.stroke();  
        }
        
        //ship
        function drawShip(): void {
            crc2.beginPath();
            crc2.fillStyle = "#000000";
            crc2.fillRect(435, 325, 5, 50);
            crc2.fill();

            crc2.moveTo(440, 325);
            crc2.lineTo(440, 350); 
            crc2.lineTo(465, 337.5); 
            crc2.fillStyle = "#000000";
            crc2.fill();
           
            crc2.beginPath();
            crc2.strokeStyle = "#000000";
            crc2.moveTo(450, 400);
            crc2.lineTo(395, 400);
            crc2.lineTo(370, 375);
            crc2.lineTo(475, 375);
            crc2.fillStyle = "#000000";
            crc2.fill();
            crc2.closePath();
            crc2.stroke();
        }

    }

}