namespace l8 {
    window.addEventListener("load", draw);

    function draw() {
    let canvas: HTMLCanvasElement = document.querySelector("canvas");
    canvas.width = 1400;
    canvas.height = 550;
    let create: CanvasRenderingContext2D = canvas.getContext("2d");

    create.fillStyle = "violet";
    create.scale(5, 5);
    create.fillRect(50, 0, 150, 300);

    function getRandomNumber(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    create.beginPath();
    create.arc(getRandomNumber(10, 60), getRandomNumber(5, 40), getRandomNumber(15, 20), 0, 2.5 * Math.PI);
    create.strokeStyle = "blue";
    create.closePath();
    create.stroke();

function Circles() {
        for (var i: number = 0; i < 6; i++) {
            create.beginPath();
            create.arc(getRandomNumber(50, 100), getRandomNumber(10, 80), getRandomNumber(10, 70), 0, 2 * Math.PI);
            create.strokeStyle = "lightgreen";
            create.stroke();
        }
    }
    Circles();

    let path: Path2D = new Path2D();
    path.arc(getRandomNumber(20, 60), getRandomNumber(20, 60), getRandomNumber(20, 60), 0, 2 * Math.PI);
    create.strokeStyle = "cyan";
    create.stroke(path);

    let randomNumber: number = Math.floor(Math.random() * 40);
    
    create.beginPath();
    create.strokeStyle = "cyan";
    create.moveTo(randomNumber, 20);
    create.lineTo(getRandomNumber(20, 140), getRandomNumber(50, 140));
    create.stroke();
    create.lineTo(getRandomNumber(100, 80), getRandomNumber(50, 80));
    create.stroke();
    create.lineTo(randomNumber, 20);
    create.stroke();
    create.closePath();

}
}