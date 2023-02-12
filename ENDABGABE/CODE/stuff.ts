namespace fireworks{
    // The GUI values, that are both spawning values for the rocket as well as saved classes for the server

    export function create(_data: RocketData): void {
        console.log("category");

        for (let category in _data) {
            console.log("category");
            let items: Rocket[] = _data[category];
            createOption(items);
        }
    }

    // Create a option in the selector for every saved rocket preset
    function createOption(_items: Rocket[]): void {
        let selector: HTMLSelectElement | null = document.querySelector("select#presetSelector");
        if (selector == null)
            return;

        console.log(selector);
        console.log(_items);

        let selectValue: number = 0;
        for (let i = 0; i < _items.length; i++) {
            let option: HTMLOptionElement = document.createElement("option");
            option = document.createElement("option");
            // option.value = option.textContent = "Preset " + i;
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.innerHTML = _items[i].preset; // TODO: is invalid for some reason
            selector.appendChild(option);

            selectValue++;
        }
    }


    // This function is used on clicking the save button
    export function getCurrentValues(): Rocket {
        let presetName: string = String(new FormData(document.forms[1]).get("presetName"));
        let colorStart: string = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); // stanadard  0.05 + 0.025
        let size: number = Number(new FormData(document.forms[1]).get("particleSize"));

        let particleAmount: number = Number(new FormData(document.forms[1]).get("spawnAmount"));
        let hierarchyMax: number = Number(new FormData(document.forms[1]).get("explosionTimes"));

        // Create a data object here for saving in the db
        let iValues: Rocket = {
            preset: presetName,
            startColor: colorStart,
            endColor: colorEnd,
            lifetime: lifetime,
            particleSize: size,
            spawnAmount: particleAmount,
            explosionTimes: hierarchyMax
        }

        console.log(iValues);
        return iValues;
    }

    export function Preset(): void {
        let selectElem: HTMLElement | null = document.getElementById("presetSelector");
        if (selectElem == null)
            return;
        let selectElemnt: HTMLSelectElement = <HTMLSelectElement>selectElem;
        let presetIndex: number = selectElemnt.selectedIndex; // Number(new FormData(document.forms[0]).get("presetSelector"));

        let _data: RocketData = result;

        for (let category in _data) {
            let items: Rocket[] = _data[category];
            console.log(items[presetIndex].preset);
            applySettings(items[presetIndex]);
        } 
    }

    function applySettings(values: Rocket): void {
        let html: HTMLFormElement;
        let htmlTarget: string;

        htmlTarget = "presetName";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        console.log(values.preset);
        html.setAttribute("value", "" + values.preset);
        html.value = values.preset;

        htmlTarget = "startColor";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.startColor);
        html.value = values.startColor;

        htmlTarget = "endColor";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.endColor);
        html.value = values.endColor;

        htmlTarget = "particleSize";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleSize);
        html.value = values.particleSize;

        htmlTarget = "spawnAmount";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.spawnAmount);
        html.value = values.spawnAmount;

        htmlTarget = "explosionTimes";
        html = <HTMLFormElement>document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.explosionTimes);
        html.value = values.explosionTimes;
    }
}