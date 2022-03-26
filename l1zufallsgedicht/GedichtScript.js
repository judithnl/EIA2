var Names = ["Harry", "Hermine", "Ron", "Hagrid", "Snape", "Dumbledore"];
var Predicats = ["braut", "liebt", "studiert", "hasst", "zaubert", "zerstört"];
var Objects = ["Zaubertränke", "den Grimm", "Lupin", "Hogwarts", "die Karte des Rumtreibers", "Dementoren"];
for (var i = Objects.length; i >= 1; i--) {
    var outcome = getVerse(Names, Predicats, Objects);
    console.log(outcome);
}
function getVerse(_names, _predicats, _objects) {
    var verse = "";
    var RandomNumber;
    RandomNumber = Math.floor(Math.random() * Objects.length);
    verse = verse + _names.splice(RandomNumber, 1)[0] + " ";
    var RandomNumber2 = Math.floor(Math.random() * _predicats.length);
    verse = verse + _predicats.splice(RandomNumber2, 1)[0] + " ";
    var RandomNumber3 = Math.floor(Math.random() * _objects.length);
    verse = verse + _objects.splice(RandomNumber3, 1)[0] + " ";
    return verse;
}
//# sourceMappingURL=GedichtScript.js.map