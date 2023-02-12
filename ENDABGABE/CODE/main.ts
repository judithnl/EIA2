namespace fireworks {

    //variablen
    let server: string;
    export let result: RocketData;
    let canvas: HTMLCanvasElement | null;
    let rocketParticles: RocketWithPhysics[] = [];
    let maxRockets: number = 2500;
    let rocketsSpawn: number = 1;
    let updateTimer: number = 20;
    let xMouse: number;
    let yMouse: number;
    let gravity: number = 9.81 * 7;
    export let ctx: CanvasRenderingContext2D;

    window.addEventListener("load", handleLoad);

    //funktion klicken --> löst Raketen aus (spawnRockets)
    function shootMouse(_event: MouseEvent): void {
        _event.preventDefault();
        let rect: ClientRect = ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnSomeRockets();
    }

    async function handleLoad(): Promise<void> {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;

        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);

        rocketParticles.length = maxRockets;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();
        setInterval(update, updateTimer, canvas);

        document?.querySelector("canvas")?.addEventListener("click", shootMouse);

        await getDataFromServer();

        console.log(result);

        create(result);

        let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
        loadBtn.addEventListener("click", Preset);

        let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
        saveBtn.addEventListener("click", sendDataToServer);
    }

    // Called only at start
    async function getDataFromServer() {
        let response = await fetch(server + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        console.log(allDatas);

        result = {
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

        for (let i: number = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp: Rocket = <Rocket>allDatas[i]; //.find(item => item.rocketTitel === userValue);
            // resultInterface.
            console.log(allDatas);
            console.log("TODO: Loading problem is here: cannot convert the data properly")
            console.log(allDatas[i]);

            let resultInterface: Rocket = {
                preset: "" + resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                explosionTimes: resultInterfaceTemp.explosionTimes
            }
            // console.log(resultInterface);
            result.Rockets.push(resultInterface);
        }
        console.log("Datein wurden geladen");
        console.log(result);
    }

    // It checks which rockets needs to be rendered onto the canvas and which rockets are gone and produce sub-particles.
    function update(): void {

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        // console.log("update");
        // ctx.putImageData(saveBackground, 0, 0)
        ctx.beginPath();
        ctx.fillStyle = "#00000011"; // TODO: Check if opacity 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null) {
                continue;
            } else if (rocketParticles[i].shouldBeDestroyed) {
                // Can the rocket spawn sub particles?

                console.log("pre-spawn");

                if ((rocketParticles[i].hierarchy < rocketParticles[i].hierarchyMax) && rocketParticles[i].canBeOverwritten == false) { // TODO: let each rocket know how many hierarchies it has
                    console.log(rocketParticles[i].particleAmount);
                    for (let i: number = 0; i < rocketParticles[i].particleAmount; i++) {
                        launchParticles(rocketParticles[i], i);
                    }
                }

                if (rocketParticles[i].canBeOverwritten != true) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 100 * rocketParticles[i].radius, 0, 2 * Math.PI, false);
                    if (rocketParticles[i].hierarchy == 0) {
                        ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    } else {
                        ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    }

                    ctx.fill();
                    ctx.fillStyle = rocketParticles[i].colorCurrent;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }

                rocketParticles[i].canBeOverwritten = true;

                rocketParticles.splice(i, 1);
                rocketParticles.pop();
                i--;
            } else {
                rocketParticles[i].calculateNewValue(updateTimer, canvas.width, canvas.height);

                ctx.save();
                ctx.beginPath();
                
                if (rocketParticles[i].hierarchy == 0) {
                    ctx.fillStyle = rocketParticles[i].colorStart; // TODO: Check if opacity 
                    // console.log(1);
                } else {
                    ctx.fillStyle = rocketParticles[i].colorEnd; // TODO: Check if opacity 
                    // console.log(2);
                }

                ctx.arc(rocketParticles[i].position.x, rocketParticles[i].position.y, 50 * rocketParticles[i].size, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.fillStyle = rocketParticles[i].colorCurrent;
                ctx.strokeStyle = "rgba (1, 1, 1, 0)";
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    // Function which condensed the current values of the GUI into a rocket, and then saves that as a new one.
    async function sendDataToServer(_event: any) {
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form#userInterface");
        let interfaceData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>interfaceData);
        console.log(query);
        let response: Response = await fetch(server
             + "?" + query.toString());
        let responseText: string = await response.text();
        alert("CAUTION! Rocket loaded!");
        console.log("Data has been send", responseText);
        console.log(responseText);
    }

    //funnkiton spawnRockets(for-Schleife) löst launchRocket aus
    export function spawnSomeRockets(): void {

        for (let i: number = 0; i < rocketsSpawn; i++) {
            launchNewRocket();
        }
    }

    // launch a new rocket
    function launchNewRocket(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        let colorStart: string = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        console.log(new FormData(document.forms[1]).get("lifetime"));
        console.log(lifetime);
        let radius: number = Number(new FormData(document.forms[1]).get("particleRadius"));
        console.log(radius);
        let size: number = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount: number = Number(new FormData(document.forms[1]).get("spawnAmount"));
        console.log(size);
        let hierarchyMax: number = Number(new FormData(document.forms[1]).get("explosionTimes"));
        console.log(hierarchyMax);

        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex == -1 || canvas == null) {
            return;
        }

        let newRocket: RocketWithPhysics;

        let pos: Vector = new Vector(canvas.width / 2, canvas.height);
        let vel: Vector = new Vector((xMouse - pos.x) / updateTimer / 5 * 4, Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15);

        newRocket = new RocketWithPhysics(pos, vel, gravity, lifetime, size, colorStart, colorEnd, particleAmount, 0, hierarchyMax, radius);
        rocketParticles[spawnIndex] = newRocket;
    }

    function launchParticles(rocketOriginal: RocketWithPhysics, index: number): void {
        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");

            let lifetime: number = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6));

            let position: Vector = new Vector(0, 0);
            let velocity: Vector = new Vector(0, 0);

            let colorStart: string = rocketOriginal.colorStart; // TODO: change to cascade from main rocket
            let colorEnd: string = rocketOriginal.colorEnd;

            let size: number = rocketParticles[index].size * 0.5;
            let radius: number = rocketParticles[index].radius * 0.8;
            let particleAmount: number = rocketParticles[index].particleAmount;

            let newRocket: RocketWithPhysics;
            newRocket = new RocketWithPhysics(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.copyPosition(rocketParticles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            rocketParticles[spawnIndex] = newRocket;
        }
    }

    function GetFreeRocketSlot(): number {

        for (let i: number = 0; i < maxRockets; i++) {
            if (rocketParticles[i] == null || rocketParticles[i].canBeOverwritten) {
                return i;
            }
        }
        return -1;
    }
}    