
import express from 'express';
import chalk from "chalk";
import child_process from "child_process";
// @ts-ignore
import opn from 'opn';


const PORT = 4200;

let app = express();

app.use(express.static(__dirname + "/public"));

let server = app.listen(PORT, () => {
   console.log("App listening on port " + chalk.green(PORT.toString()));
   opn('http://localhost:4200');
});

console.log(chalk.blue("Setting up json-server..."));
let json_s = child_process.exec("json-server ./data/games.json");
json_s.on('close', (code, signal) => {
   console.log("JSON SERVERE TERMINATED: " + code + " | " + signal);
})
json_s.on('error', (err) => {
   console.log("JSON SERVERE ERROR: ", err);
})

