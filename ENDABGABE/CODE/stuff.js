"use strict";
var fireworks;
(function (fireworks) {
    function create(_data) {
        console.log("category");
        for (let category in _data) {
            console.log("category");
            let items = _data[category];
            createOption(items);
        }
    }
    fireworks.create = create;
    function createOption(_items) {
        let selector = document.querySelector("select#presetSelector");
        if (selector == null)
            return;
        console.log(selector);
        console.log(_items);
        let selectValue = 0;
        for (let i = 0; i < _items.length; i++) {
            let option = document.createElement("option");
            option = document.createElement("option");
            option.setAttribute("name", "default");
            option.setAttribute("value", "" + selectValue);
            option.innerHTML = _items[i].preset;
            selector.appendChild(option);
            selectValue++;
        }
    }
    function getCurrentValues() {
        let presetName = String(new FormData(document.forms[1]).get("presetName"));
        let colorStart = String(new FormData(document.forms[1]).get("startColor"));
        let colorEnd = String(new FormData(document.forms[1]).get("endColor"));
        let lifetime = Number(new FormData(document.forms[1]).get("lifetime"));
        let size = Number(new FormData(document.forms[1]).get("particleSize"));
        let particleAmount = Number(new FormData(document.forms[1]).get("spawnAmount"));
        let hierarchyMax = Number(new FormData(document.forms[1]).get("explosionTimes"));
        let iValues = {
            preset: presetName,
            startColor: colorStart,
            endColor: colorEnd,
            lifetime: lifetime,
            particleSize: size,
            spawnAmount: particleAmount,
            explosionTimes: hierarchyMax
        };
        console.log(iValues);
        return iValues;
    }
    fireworks.getCurrentValues = getCurrentValues;
    function Preset() {
        let selectElem = document.getElementById("presetSelector");
        if (selectElem == null)
            return;
        let selectElemnt = selectElem;
        let presetIndex = selectElemnt.selectedIndex;
        let _data = fireworks.result;
        for (let category in _data) {
            let items = _data[category];
            console.log(items[presetIndex].preset);
            applySettings(items[presetIndex]);
        }
    }
    fireworks.Preset = Preset;
    function applySettings(values) {
        let html;
        let htmlTarget;
        htmlTarget = "presetName";
        html = document.querySelector("input#" + htmlTarget);
        console.log(values.preset);
        html.setAttribute("value", "" + values.preset);
        html.value = values.preset;
        htmlTarget = "startColor";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.startColor);
        html.value = values.startColor;
        htmlTarget = "endColor";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.endColor);
        html.value = values.endColor;
        htmlTarget = "particleSize";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.particleSize);
        html.value = values.particleSize;
        htmlTarget = "spawnAmount";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.spawnAmount);
        html.value = values.spawnAmount;
        htmlTarget = "explosionTimes";
        html = document.querySelector("input#" + htmlTarget);
        html.setAttribute("value", "" + values.explosionTimes);
        html.value = values.explosionTimes;
    }
})(fireworks || (fireworks = {}));
//# sourceMappingURL=stuff.js.map