namespace fireworks {

    let server: string;
    let canvas: HTMLCanvasElement | null;
    let Particles: Rocketsss[] = [];
    let maxRockets: number = 2000;
    let rocketsSpawn: number = 1;
    let updateTimer: number = 20;
    let xMouse: number;
    let yMouse: number;
    let gravity: number = 9.81 * 7;

    export let ctx: CanvasRenderingContext2D;
    export let result: RocketData;
    
    window.addEventListener("load", handleLoad);

    function shootMouse(_event: MouseEvent): void {
        _event.preventDefault();
        let rect: ClientRect = ctx.canvas.getBoundingClientRect();
        xMouse = _event.clientX - rect.left;
        yMouse = _event.clientY - rect.top;
        console.log("X: " + xMouse);
        console.log("Y: " + yMouse);
        spawnRockets();
    }

    async function handleLoad(): Promise<void> {
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;

        canvas.width = screen.width;
        canvas.height = screen.height;
        console.log(maxRockets);

        Particles.length = maxRockets;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#000000";
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();
        setInterval(update, updateTimer, canvas);

        document.querySelector("canvas")?.addEventListener("click", shootMouse);

        await getDataFromServer();

        console.log(result);

        create(result);

        let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
        loadBtn.addEventListener("click", Preset);

        let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
        saveBtn.addEventListener("click", sendDataToServer);
    }

    async function getDataFromServer() {
        let response = await fetch(server + "?" + "command=getAllDatas");
        let responseContent = await response.text();
        let allDatas = JSON.parse(responseContent);
        console.log(allDatas);


        for (let i: number = 0; i < allDatas.length; i++) {
            let resultInterfaceTemp: Rocket = <Rocket>allDatas[i]; 
            let resultInterface: Rocket = {
                preset: "" + resultInterfaceTemp.preset,
                startColor: resultInterfaceTemp.startColor,
                endColor: resultInterfaceTemp.endColor,
                lifetime: resultInterfaceTemp.lifetime,
                particleSize: resultInterfaceTemp.particleSize,
                spawnAmount: resultInterfaceTemp.spawnAmount,
                explosionTimes: resultInterfaceTemp.explosionTimes
            }
         
            result.Rockets.push(resultInterface);
        }
    }

    function update(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;

        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");
        ctx.beginPath();
        ctx.fillStyle = "#00000011"; 
        ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.stroke();

        for (let i: number = 0; i < maxRockets; i++) {
            if (Particles[i] == null) {
                continue;
            } else if (Particles[i].shouldBeDestroyed) {
                console.log("pre-spawn");

                if ((Particles[i].hierarchy < Particles[i].hierarchyMax) && Particles[i].canBeOverwritten == false) { 
                    console.log(Particles[i].particleAmount);
                    for (let i: number = 0; i < Particles[i].particleAmount; i++) {
                        launchParticles(Particles[i], i);
                    }
                }

                if (Particles[i].canBeOverwritten != true) {
                    ctx.save();
                    ctx.beginPath();
                    ctx.arc(Particles[i].position.x, Particles[i].position.y, 100 * Particles[i].radius, 0, 2 * Math.PI, false);
                    if (Particles[i].hierarchy == 0) {
                        ctx.fillStyle = Particles[i].colorStart;
                    } else {
                        ctx.fillStyle = Particles[i].colorEnd; 
                    }

                    ctx.fill();
                    ctx.fillStyle = Particles[i].colorCurrent;
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }

                Particles[i].canBeOverwritten = true;

                Particles.splice(i, 1);
                Particles.pop();
                i--;
            } else {
                Particles[i].newValue(updateTimer, canvas.width, canvas.height);

                ctx.save();
                ctx.beginPath();
                
                if (Particles[i].hierarchy == 0) {
                    ctx.fillStyle = Particles[i].colorStart;
                } else {
                    ctx.fillStyle = Particles[i].colorEnd;   
                }

                ctx.arc(Particles[i].position.x, Particles[i].position.y, 50 * Particles[i].size, 0, 2 * Math.PI, false);
                ctx.fill();
                ctx.fillStyle = Particles[i].colorCurrent;
                ctx.strokeStyle = "rgba (1, 1, 1, 0)";
                ctx.closePath();
                ctx.stroke();
                ctx.restore();
            }
        }
    }

    async function sendDataToServer(_event: any) {
        let form: HTMLFormElement = <HTMLFormElement>document.querySelector("form#userInterface");
        let interfaceData: FormData = new FormData(form);
        let query: URLSearchParams = new URLSearchParams(<any>interfaceData);
        console.log(query);
   
    }

    export function spawnRockets(): void {

        for (let i: number = 0; i < rocketsSpawn; i++) {
            launchNewRocket();
        }
    }

    function launchNewRocket(): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        ctx = <CanvasRenderingContext2D>canvas.getContext("2d");

        let colorStart: string = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); 
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

        let newRocket: Rocketsss;

        let pos: Vector = new Vector(canvas.width / 2, canvas.height);
        let vel: Vector = new Vector((xMouse - pos.x) / updateTimer / 5 * 4, Math.sqrt((canvas.height - yMouse) / (gravity / 2) * updateTimer) * -3.15);

        newRocket = new Rocketsss(pos, vel, gravity, lifetime, size, colorStart, colorEnd, particleAmount, 0, hierarchyMax, radius);
        Particles[spawnIndex] = newRocket;
    }

    function launchParticles(rocketOriginal: Rocketsss, index: number): void {
        let spawnIndex: number = GetFreeRocketSlot();
        if (spawnIndex != -1) {
            console.log("spawn");

            let lifetime: number = (Math.random() * 0.01 + (rocketOriginal.lifetimeMax * 0.6));

            let position: Vector = new Vector(0, 0);
            let velocity: Vector = new Vector(0, 0);

            let colorStart: string = rocketOriginal.colorStart;
            let colorEnd: string = rocketOriginal.colorEnd;

            let size: number = Particles[index].size * 0.5;
            let radius: number = Particles[index].radius * 0.8;
            let particleAmount: number = Particles[index].particleAmount;

            let newRocket: Rocketsss;
            newRocket = new Rocketsss(position, velocity, gravity, lifetime, size, colorStart, colorEnd, particleAmount, rocketOriginal.hierarchy + 1, rocketOriginal.hierarchyMax, radius);
            newRocket.Position(Particles[index]);
            newRocket.velocity.x = (Math.random() - 0.5) * 40;
            newRocket.velocity.y = (Math.random() - 0.75) * 40 + rocketOriginal.velocity.y / updateTimer;
            newRocket.colorStart = colorStart;
            newRocket.colorEnd = colorEnd;
            Particles[spawnIndex] = newRocket;
        }
    }

    function GetFreeRocketSlot(): number {

        for (let i: number = 0; i < maxRockets; i++) {
            if (Particles[i] == null || Particles[i].canBeOverwritten) {
                return i;
            }
        }
        return -1;
    }
}    