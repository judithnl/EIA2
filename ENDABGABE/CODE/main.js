"use strict";
var fireworks;
(function (fireworks) {
    //variablen
    let server;
    let canvas;
    let rocketParticles = [];
    let maxRockets = 2500;
    let rocketsSpawn = 1;
    let updateTimer = 20;
    let xMouse;
    let yMouse;
    let gravity = 9.81 * 7;
    window.addEventListener("load", handleLoad);
    //funktion klicken --> löst Raketen aus (spawnRockets)
    function shootMouse(_event) {
        _event.preventDefault();
        let rect = fireworks.ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }
    async function handleLoad() {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);
        rocketParticles.length = maxRockets;
        fireworks.ctx = canvas.getContext("2d");
        fireworks.ctx.beginPath();
        fireworks.ctx.fillStyle = "#000000";
        fireworks.ctx.fillRect(0, 0, fireworks.ctx.canvas.width, fireworks.ctx.canvas.height);
        fireworks.ctx.stroke();
        setInterval(update, updateTimer, canvas);
        document?.querySelector("canvas")?.addEventListener("click", shootMouse);
        await getDataFromServer();
        console.log(fireworks.result);
        fireworks.create(fireworks.result);
        let loadBtn = document.querySelector("button#loadBtn");
        loadBtn.addEventListener("click", fireworks.Preset);
        let saveBtn = document.querySelector("button#saveBtn");
        saveBtn.addEventListener("click", sendDataToServer);
    }
    // Called only at start
    async function getDataFromServer() {
        let response = await fetch(server + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        console.log(allDatas);
        fireworks.result = {
            Rockets: [
                {
                    preset: "Let it Bang!",
                    startColor: "#FFFF00",
                    endColor: "#fe2c54",
                    lifetime: 0.4,
                    particleSize: 0.1,
                    spawnAmount: 4,
                    explosionTimes: 5
                },
                {
                    preset: "Happy 2021",
                    startColor: "#e8e217",
                    endColor: "#00ffaa",
                    lifetime: 0.2,
                    particleSize: 1,
                    spawnAmount: 3,
                    explosionTimes: 2
                },
                {
                    preset: "BIG BANG!",
                    startColor: "#fc3bb3",
                    endColor: "#aaaaaa",
                    lifetime: 0.1,
                    particleSize: 4,
                    spawnAmount: 4,
                    explosionTimes: 4
                }
            ]
        };
        for (let i = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp = allDatas[i]; //.find(item => item.rocketTitel === userValue);
            // resultInterface.
            console.log(allDatas);
            console.log("TODO: Loading problem is here: cannot convert the data properly");
            console.log(allDatas[i]);
            let resultInterface = {
                preset: "" + resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                explosionTimes: resultInterfaceTemp.explosionTimes
            };
            // console.log(resultInterface);
            fireworks.result.Rockets.push(resultInterface);
        }
        console.log("Datein wurden geladen");
        console.log(fireworks.result);
    }
    // It checks which rockets needs to be rendered onto the canvas and which rockets are gone and produce sub-particles.
    function update() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        fireworks.ctx = canvas.getContext("2d");
        // console.log("update");
        // ctx.putImageData(saveBackground, 0, 0)
        fireworks.ctx.beginPath();
        fireworks.ctx.fillStyle = "#00000011"; // TODO: Check if opacity 
        fireworks.ctx.fillRect(0, 0, fireworks.ctx.canvas.width, fireworks.ctx.canvas.height);
        fireworks.ctx.stroke();
        for (let i = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null) {
                continue;
            }
            else if (rocketParticles[i].shouldBeDestroyed) {
                // Can the rocket spawn sub particles?
                console.log("pre-spawn");
                if ((rocketParticles[i].hierarchy < rocketParticles[i].hierarchyMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                    console.log(rocketParticles[i].particleAmount);
                    for (let i = 0; i < rocketParticles[i].particleAmount; i++) {
                        launchParticles(rocketParticles[i], i);
                    }
                }
                if (rocketParticles[i].canBeOverwritten != true) {
                    fireworks.ctx.save();
                    fireworks.ctx.beginPath();
                    fireworks.ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
                    if (rocketParticles[i].hierarchy == 0) {
                        fireworks.ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    }
                    else {
                        fireworks.ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    }
                    fireworks.ctx.fill();
                    fireworks.ctx.fillStyle = rocketParticles[i].colorCurrent;
                    fireworks.ctx.closePath();
                    fireworks.ctx.stroke();
                    fireworks.ctx.restore();
                }
                rocketParticles[i].canBeOverwritten = true;
                rocketParticles.splice(i, 1);
                rocketParticles.pop();
                i--;
            }
            else {
                rocketParticles[i].calculateNewValue(updateTimer, canvas.width, canvas.height);
                fireworks.ctx.save();
                fireworks.ctx.beginPath();
                if (rocketParticles[i].hierarchy == 0) {
                    fireworks.ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    // console.log(1);
                }
                else {
                    fireworks.ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    // console.log(2);
                }
                fireworks.ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                fireworks.ctx.fill();
                fireworks.ctx.fillStyle = rocketParticles[i].colorCurrent;
                fireworks.ctx.strokeStyle = "rgba (1, 1, 1, 0)";
                fireworks.ctx.closePath();
                fireworks.ctx.stroke();
                fireworks.ctx.restore();
            }
        }
    }
    // Function which condensed the current values of the GUI into a rocket, and then saves that as a new one.
    async function sendDataToServer(_event) {
        let form = document.querySelector("form#userInterface");
        let interfaceData = new FormData(form);
        let query = new URLSearchParams(interfaceData);
        console.log(query);
        let response = await fetch(server
            + "?" + query.toString());
        let responseText = await response.text();
        alert("CAUTION! Rocket loaded!");
        console.log("Data has been send", responseText);
        console.log(responseText);
    }
    //funnkiton spawnRockets(for-Schleife) löst launchRocket aus
    function spawnSomeRockets() {
        for (let i = 0; i < rocketsSpawn; i++) {
            launchNewRocket();
        }
    }
    fireworks.spawnSomeRockets = spawnSomeRockets;
    // launch a new rocket
    function launchNewRocket() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        fireworks.ctx = canvas.getContext("2d");
        let colorStart = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        console.log(new FormData(document.forms[1]).get("lifetime"));
        console.log(lifetime);
        let radius = Number(new FormData(document.forms[1]).get("particleRadius"));
        console.log(radius);
        let size = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount = Number(new FormData(document.forms[1]).get("spawnAmount"));
        console.log(size);
        let hierarchyMax = Number(new FormData(document.forms[1]).get("explosionTimes"));
        console.log(hierarchyMax);
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }
        let newRocket;
        let pos = new fireworks.Vector(canvas.width / 2, canvas.height);
        let vel = new fireworks.Vector((xMouse - pos.x) / updateTimer / 5 * 4, Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15);
        newRocket = new fireworks.RocketWithPhysics(pos, vel, gravity, lifetime, size, colorStart, colorEnd, particleAmount, 0, hierarchyMax, radius);
        rocketParticles[spawnIndex] = newRocket;
    }
    function launchParticles(rocketOriginal, index) {
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");
            let lifetime = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6));
            let position = new fireworks.Vector(0, 0);
            let velocity = new fireworks.Vector(0, 0);
            let colorStart = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
            let colorEnd = rocketOriginal.colorEnd;
            let size = rocketParticles[index].size * 0.5;
            let radius = rocketParticles[index].radius * 0.8;
            let particleAmount = rocketParticles[index].particleAmount;
            let newRocket;
            newRocket = new fireworks.RocketWithPhysics(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.copyPosition(rocketParticles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            rocketParticles[spawnIndex] = newRocket;
        }
    }
    function GetFreeRocketSlot() {
        for (let i = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) {
                return i;
            }
        }
        return -1;
    }
})(fireworks || (fireworks = {}));
//# sourceMappingURL=main.js.map