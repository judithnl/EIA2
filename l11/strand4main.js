var strand4;
(function (strand4) {
    window.addEventListener("load", handleLoad);
    var canvas;
    var imgData;
    var Clouds = [];
    var flyingBirds = [];
    var immovables = [];
    var movables = [];
    strand4.z = 10;
    function handleLoad(_event) {
        canvas = document.getElementsByTagName("canvas")[0];
        strand4.crc2 = canvas.getContext("2d");
        imgData = strand4.crc2.getImageData(0, 0, canvas.width, canvas.height);
        window.setTimeout(animate, 10);
        drawBirds(4);
        drawClouds();
        drawPersons();
    }
    for (var i = 0; i < 10; i++) {
        var eyCloud = new strand4.Cloud();
        eyCloud.x = Math.random() * strand4.crc2.canvas.width;
        eyCloud.y = Math.random() * strand4.crc2.canvas.height - 550;
        eyCloud.speed = (Math.random() + 1) * 0.5;
        Clouds.push(eyCloud);
    }
    function animate() {
        strand4.crc2.putImageData(imgData, 0, 0);
        for (var i = 0; i < Clouds.length; i++) {
            Clouds[i].moveForward();
            if (Clouds[i].x > +1300) {
                Clouds[i].x = canvas.width - 3000;
            }
        }
        for (var i = 0; i < flyingBirds.length; i++) {
            flyingBirds[i].move(4);
        }
        window.setTimeout(animate, 10);
    }
    function drawClouds() {
        for (var i = 0; i < Clouds.length; i++)
            Clouds[i].drawCloud1();
        var cloud3 = new strand4.Clouds();
        movables.push(cloud3);
    }
    function drawBirds(_nBirds) {
        for (var i = 0; i < _nBirds; i++) {
            var bird2 = new strand4.Bird();
            movables.push(bird2);
            strand4.Bird[i].drawbird();
        }
    }
    function drawPersons() {
        for (var i = 0; i < 3; i++) {
            var mensch1 = strand4.Person[i].people();
            immovables.push(mensch1);
        }
    }
})(strand4 || (strand4 = {}));
//# sourceMappingURL=strand4main.js.map