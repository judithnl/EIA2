"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fireworks = void 0;
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
//namespace
var fireworks;
(function (fireworks) {
    let fireworkCollection;
    let databaseUrl = "";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server startet auf Port " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    //connect rockets to database
    async function connectToDatabase(_url) {
        let options = { useNewUrlParser: true, useUnifiedTopology: true };
        let mongoClient = new Mongo.MongoClient(_url, options);
        await mongoClient.connect();
        fireworkCollection = mongoClient.db("Firework").collection("Rockets");
        console.log("Database connection", fireworkCollection != undefined);
    }
    //presets aufrufen
    function handleRequest(_request, _response) {
        console.log("handleRequest");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true);
            let command = url.query["command"];
            console.log("Der URL", _request.url);
            if (command === "getTitels") {
                getTitels(_request, _response);
                console.log("Titel geholt");
                return;
            }
            if (command === "getAllDatas") {
                getAllDatas(_request, _response);
                console.log("Titeldaten geholt");
                return;
            }
            else {
                storeRocket(url.query, _response);
                console.log("Daten gespeichert");
            }
            return;
        }
        _response.end();
    }
    async function getTitels(_request, _response) {
        let result = fireworkCollection.find({}, { projection: { _id: 0, fireworkName: 1 } });
        let arrayResult = await result.toArray();
        let listOfTitels = JSON.stringify(arrayResult);
        console.log(listOfTitels);
        _response.write(listOfTitels);
        _response.end();
    }
    async function getAllDatas(_request, _response) {
        let result = fireworkCollection.find();
        let arrayResult = await result.toArray();
        let jsonResult = JSON.stringify(arrayResult);
        _response.write(jsonResult);
        _response.end();
    }
    function storeRocket(_userRocket, _response) {
        fireworkCollection.insertOne(_userRocket);
        _response.end();
    }
})(fireworks = exports.fireworks || (exports.fireworks = {}));
//# sourceMappingURL=Server.js.map