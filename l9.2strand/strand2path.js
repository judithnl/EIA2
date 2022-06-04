var strand2;
(function (strand2) {
    console.log("Paths");
    strand2.radiusParticle = 40;
    strand2.path = new Path2D();
    function createPaths() {
        strand2.birdsPaths = createBirdPath();
        strand2.cloudsPath = createCloudPath();
    }
    strand2.createPaths = createPaths;
    function createBirdPath() {
        var path = new Path2D();
        path.moveTo(0, 0);
        path.lineTo(-10, -10);
        path.lineTo(-20, 0);
        path.moveTo(0, 0);
        path.lineTo(10, -10);
        path.lineTo(20, 3);
        return path;
    }
    function createCloudPath() {
        strand2.path.bezierCurveTo(140, 100, 130, 150, 230, 150);
        strand2.path.bezierCurveTo(250, 180, 320, 180, 340, 150);
        strand2.path.bezierCurveTo(420, 150, 420, 120, 390, 100);
        strand2.path.bezierCurveTo(430, 40, 370, 30, 340, 50);
        strand2.path.bezierCurveTo(320, 5, 250, 20, 250, 50);
        strand2.path.bezierCurveTo(200, 5, 150, 50, 170, 80);
        crc2.fill(strand2.path);
        strand2.path.closePath();
        // let x: number = (Math.random() - 0.5) * 325;
        // let y: number = (Math.random() - 0.5) * 80;
        return strand2.path;
    }
})(strand2 || (strand2 = {}));
//# sourceMappingURL=strand2path.js.map