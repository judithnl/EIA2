interface sentence{
    value:string;
}


let form: HTMLFormElement;
let sentenceString: string;
let sentenceNumber: number;
let wrapper:HTMLDivElement;
let words:string[]=[]
let allSentences: sentence[] = [];
let SentenceDone:sentence;
let sentence1: HTMLDivElement;
let values: string[] = ["hi",  "hallo"]
let allDivs: HTMLDivElement[] = [];

let backgroundcolor: string;
let cardbackcolor: string;
let fontcolor: string;
let font: string;

//sätze
let satz1: string="hi"
let satz2: string=""
let satz3: string=""
let satz4: string=""
let satz5: string=""
let satz6: string=""
let satz7: string=""
let satz8: string=""
let satz9: string=""
let satz10: string=""
let satz11: string=""
let satz12: string=""
let satz13: string=""
let satz14: string=""
let satz15: string=""

//spanisch  worte
let worte1:string[]=["ey","was"]
let worte2:string[]=[]
let worte3:string[]=[]
let worte4:string[]=[]
let worte5:string[]=[]
let worte6:string[]=[]
let worte7:string[]=[]
let worte8:string[]=[]
let worte9:string[]=[]
let worte10:string[]=[]
let worte11:string[]=[]
let worte12:string[]=[]
let worte13:string[]=[]
let worte14:string[]=[]
let worte15:string[]=[]

let unclickedWords:any[]=[];
let clickedWords:any[]=[];

window.addEventListener("load", handleLoad);

function handleLoad(): void {
    wrapper = document.querySelector("#wrapper");
    document.querySelector("#startbutton").addEventListener("click", pushToStart);
    applySettings();
}

function applySettings(): void {
    form = document.querySelector("#settings");
    form.addEventListener("change", handleSettingChange);
    let formData: FormData = new FormData(document.forms[0]);
    sentenceString = formData.get("sentence").toString();
    sentenceNumber = parseInt(sentenceString);
}

function handleSettingChange(_event: Event): void {
    let formData: FormData = new FormData(document.forms[0]);
    sentenceString = formData.get("sentence").toString();
    sentenceNumber = parseInt(sentenceString);
}

function pushToStart(_event: Event): void {
   document.body.style.backgroundColor = backgroundcolor;
    document.body.style.fontFamily = font;
    document.body.style.color = fontcolor;
    wrapper.innerHTML = satz1
}

function spanish(){
    worte1;}



