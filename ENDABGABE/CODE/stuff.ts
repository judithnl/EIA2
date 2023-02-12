namespace fireworks{

    export function create(_data: RocketData): void {
        console.log("category");

        for (let category in _data) {
            console.log("category");
            let items: Rocket[] = _data[category];
            createOption(items);
        }
    }


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
      
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.innerHTML = _items[i].preset; 
            selector.appendChild(option);

            selectValue++;
        }
    }


    export function getCurrentValues(): Rocket {
        let presetName: string = String(new FormData(document.forms[1]).get("presetName"));
        let colorStart: string = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd: string = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime: number = Number(new FormData(document.forms[1]).get("lifetime")); 
        let size: number = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount: number = Number(new FormData(document.forms[1]).get("spawnAmount"));
        let hierarchyMax: number = Number(new FormData(document.forms[1]).get("explosionTimes"));

      
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
        let presetIndex: number = selectElemnt.selectedIndex; 

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