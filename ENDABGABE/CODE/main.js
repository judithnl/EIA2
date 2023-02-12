"use strict";
var fireworks;
(function (fireworks) {
    //variablen
    let server;
    let canvas;
    let Particles = [];
    let maxRockets = 2000;
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
        spawnRockets();
    }
    async function handleLoad() {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);
        Particles.length = maxRockets;
        fireworks.ctx = canvas.getContext("2d");
        fireworks.ctx.beginPath();
        fireworks.ctx.fillStyle = "#000000";
        fireworks.ctx.fillRect(0, 0, fireworks.ctx.canvas.width, fireworks.ctx.canvas.height);
        fireworks.ctx.stroke();
        setInterval(update, updateTimer, canvas);
        document.querySelector("canvas")?.addEventListener("click", shootMouse);
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
        for (let i = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp = allDatas[i];
            let resultInterface = {
                preset: "" + resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                explosionTimes: resultInterfaceTemp.explosionTimes
            };
            fireworks.result.Rockets.push(resultInterface);
        }
    }
    // It checks which rockets needs to be rendered onto the canvas and which rockets are gone and produce sub-particles.
    function update() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        fireworks.ctx = canvas.getContext("2d");
        fireworks.ctx.beginPath();
        fireworks.ctx.fillStyle = "#00000011";
        fireworks.ctx.fillRect(0, 0, fireworks.ctx.canvas.width, fireworks.ctx.canvas.height);
        fireworks.ctx.stroke();
        for (let i = 0; i < maxRockets; i++) {
            if (Particles[i] == null) {
                continue;
            }
            else if (Particles[i].shouldBeDestroyed) {
                console.log("pre-spawn");
                if ((Particles[i].hierarchy < Particles[i].hierarchyMax) && Particles[i].canBeOverwritten == false) {
                    console.log(Particles[i].particleAmount);
                    for (let i = 0; i < Particles[i].particleAmount; i++) {
                        launchParticles(Particles[i], i);
                    }
                }
                if (Particles[i].canBeOverwritten != true) {
                    fireworks.ctx.save();
                    fireworks.ctx.beginPath();
                    fireworks.ctx.arc(Particles[i].position.x, Particles[i].position.y, 100 * Particles[i].radius, 0, 2 * Math.PI, false);
                    if (Particles[i].hierarchy == 0) {
                        fireworks.ctx.fillStyle = Particles[i].colorStart;
                    }
                    else {
                        fireworks.ctx.fillStyle = Particles[i].colorEnd;
                    }
                    fireworks.ctx.fill();
                    fireworks.ctx.fillStyle = Particles[i].colorCurrent;
                    fireworks.ctx.closePath();
                    fireworks.ctx.stroke();
                    fireworks.ctx.restore();
                }
                Particles[i].canBeOverwritten = true;
                Particles.splice(i, 1);
                Particles.pop();
                i--;
            }
            else {
                Particles[i].newValue(updateTimer, canvas.width, canvas.height);
                fireworks.ctx.save();
                fireworks.ctx.beginPath();
                if (Particles[i].hierarchy == 0) {
                    fireworks.ctx.fillStyle = Particles[i].colorStart;
                }
                else {
                    fireworks.ctx.fillStyle = Particles[i].colorEnd;
                }
                fireworks.ctx.arc(Particles[i].position.x, Particles[i].position.y, 50 * Particles[i].size, 0, 2 * Math.PI, false);
                fireworks.ctx.fill();
                fireworks.ctx.fillStyle = Particles[i].colorCurrent;
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
    function spawnRockets() {
        for (let i = 0; i < rocketsSpawn; i++) {
            launchNewRocket();
        }
    }
    fireworks.spawnRockets = spawnRockets;
    // launch a new rocket
    function launchNewRocket() {
        let canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        fireworks.ctx = canvas.getContext("2d");
        let colorStart = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[1]).get("lifetime"));
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
        newRocket = new fireworks.Rocketsss(pos, vel, gravity, lifetime, size, colorStart, colorEnd, particleAmount, 0, hierarchyMax, radius);
        Particles[spawnIndex] = newRocket;
    }
    function launchParticles(rocketOriginal, index) {
        let spawnIndex = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");
            let lifetime = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6));
            let position = new fireworks.Vector(0, 0);
            let velocity = new fireworks.Vector(0, 0);
            let colorStart = rocketOriginal.colorStart;
            let colorEnd = rocketOriginal.colorEnd;
            let size = Particles[index].size * 0.5;
            let radius = Particles[index].radius * 0.8;
            let particleAmount = Particles[index].particleAmount;
            let newRocket;
            newRocket = new fireworks.Rocketsss(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.Position(Particles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            Particles[spawnIndex] = newRocket;
        }
    }
    function GetFreeRocketSlot() {
        for (let i = 0; i < maxRockets; i++) {
            if (Particles[i] == null || Particles[i].canBeOverwritten) {
                return i;
            }
        }
        return -1;
    }
})(fireworks || (fireworks = {}));
//# sourceMappingURL=main.js.map