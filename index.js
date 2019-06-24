"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var chalk_1 = __importDefault(require("chalk"));
var child_process_1 = __importDefault(require("child_process"));
// @ts-ignore
var opn_1 = __importDefault(require("opn"));
var PORT = 4200;
var app = express_1.default();
app.use(express_1.default.static(__dirname + "/public"));
var server = app.listen(PORT, function () {
    console.log("App listening on port " + chalk_1.default.green(PORT.toString()));
    opn_1.default('http://localhost:4200');
});
console.log(chalk_1.default.blue("Setting up json-server..."));
var json_s = child_process_1.default.exec("json-server ./data/games.json");
json_s.on('close', function (code, signal) {
    console.log("JSON SERVERE TERMINATED: " + code + " | " + signal);
});
json_s.on('error', function (err) {
    console.log("JSON SERVERE ERROR: ", err);
});
