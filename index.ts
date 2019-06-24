
import express from 'express';

const PORT = 4200;

let app = express();

app.use(express.static(__dirname + "/public"));

let server = app.listen(PORT, () => {
   console.log("App listening on port " + PORT);
});
