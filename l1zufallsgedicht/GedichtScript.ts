let Names:string[]=["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"]
let Predicats:string[]=["braut","liebt","studiert","hasst","zaubert","zerstört"]
let Objects:string[]=["Zaubertränke","den Grimm","Lupin","Hogwarts","die Karte des Rumtreibers","Dementoren"]




for(let i=Objects.length;i>=1;i--){
    let outcome=getVerse(Names,Predicats,Objects)
    console.log(outcome)
}


function getVerse(_names:string[], _predicats:string[],_objects:string[]):string{
    let verse:string="";

    let RandomNumber:number;
    RandomNumber = Math.floor(Math.random() * Objects.length)

    verse = verse + _names.splice(RandomNumber, 1)[0] + " ";
    let RandomNumber2 = Math.floor(Math.random() * _predicats.length);
    verse = verse + _predicats.splice(RandomNumber2, 1)[0] + " ";
    let RandomNumber3 = Math.floor(Math.random() * _objects.length);
    verse = verse + _objects.splice(RandomNumber3, 1)[0] + " ";

     return verse;
}

