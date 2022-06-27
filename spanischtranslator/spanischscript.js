var form;
var sentenceString;
var sentenceNumber;
var wrapper;
var words = [];
var allSentences = [];
var SentenceDone;
var sentence1;
var values = ["hi", "hallo"];
var allDivs = [];
var backgroundcolor;
var cardbackcolor;
var fontcolor;
var font;
//sätze
var satz1 = "hi";
var satz2 = "";
var satz3 = "";
var satz4 = "";
var satz5 = "";
var satz6 = "";
var satz7 = "";
var satz8 = "";
var satz9 = "";
var satz10 = "";
var satz11 = "";
var satz12 = "";
var satz13 = "";
var satz14 = "";
var satz15 = "";
//spanisch  worte
var worte1 = ["ey", "was"];
var worte2 = [];
var worte3 = [];
var worte4 = [];
var worte5 = [];
var worte6 = [];
var worte7 = [];
var worte8 = [];
var worte9 = [];
var worte10 = [];
var worte11 = [];
var worte12 = [];
var worte13 = [];
var worte14 = [];
var worte15 = [];
var unclickedWords = [];
var clickedWords = [];
window.addEventListener("load", handleLoad);
function handleLoad() {
    wrapper = document.querySelector("#wrapper");
    document.querySelector("#startbutton").addEventListener("click", pushToStart);
    applySettings();
}
function applySettings() {
    form = document.querySelector("#settings");
    form.addEventListener("change", handleSettingChange);
    var formData = new FormData(document.forms[0]);
    sentenceString = formData.get("sentence").toString();
    sentenceNumber = parseInt(sentenceString);
}
function handleSettingChange(_event) {
    var formData = new FormData(document.forms[0]);
    sentenceString = formData.get("sentence").toString();
    sentenceNumber = parseInt(sentenceString);
}
function pushToStart(_event) {
    document.body.style.backgroundColor = backgroundcolor;
    document.body.style.fontFamily = font;
    document.body.style.color = fontcolor;
    wrapper.innerHTML = satz1;
}
function spanish() {
    worte1;
}
//# sourceMappingURL=spanischscript.js.map