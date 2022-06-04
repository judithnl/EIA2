var Strand;
(function (Strand) {
    window.addEventListener("load", handleLoad);
    var canvas;
    var imgData;
    var Clouds = [];
    var flyingBirds = [];
    Strand.z = 10;
    function handleLoad(_event) {
        canvas = document.getElementsByTagName("canvas")[0];
        Strand.crc2 = canvas.getContext("2d");
        var bG = new Strand.Background;
        console.log(bG);
        for (var i = 0; i < 3; i++) {
            var birdsflying = new Strand.Bird();
            birdsflying.x = Math.random() * Strand.crc2.canvas.width;
            birdsflying.y = 5 & 5;
            birdsflying.speed = (Math.random() + 1) * 0.5;
            flyingBirds.push(birdsflying);
        }
        imgData = Strand.crc2.getImageData(0, 0, canvas.width, canvas.height);
        for (var i = 0; i < 10; i++) {
            var eyCloud = new Strand.Cloud();
            eyCloud.x = Math.random() * Strand.crc2.canvas.width;
            eyCloud.y = Math.random() * Strand.crc2.canvas.height - 550;
            eyCloud.speed = (Math.random() + 1) * 0.5;
            Clouds.push(eyCloud);
        }
        window.setTimeout(animate, 10);
    }
    function animate() {
        Strand.crc2.putImageData(imgData, 0, 0);
        for (var i = 0; i < Clouds.length; i++) {
            Clouds[i].moveForward();
            if (Clouds[i].x > +1300) {
                Clouds[i].x = canvas.width - 3000;
            }
        }
        drawClouds();
        for (var i = 0; i < flyingBirds.length; i++) {
            flyingBirds[i].move();
            if (flyingBirds[i].x > +1300) {
                flyingBirds[i].x = canvas.width - 1800;
            }
        }
        drawBird();
        window.setTimeout(animate, 10);
    }
    function drawClouds() {
        for (var i = 0; i < Clouds.length; i++)
            Clouds[i].drawCloud1();
    }
    function drawBird() {
        for (var i = 0; i < flyingBirds.length; i++)
            flyingBirds[i].drawBirds1();
    }
})(Strand || (Strand = {}));
//# sourceMappingURL=strand2main.js.map