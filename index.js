const express = require("express");
const cors = require("cors");

const dotenv = require('dotenv');
dotenv.config();

const db = require("./db");

const app = express();

// enable cors for all requests
app.use(cors())

const args = process.argv.splice(2)
const env = args[0];
const port = args[1]?.split("=")[1]

// connecting the db
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log("DB connected!");
})

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port || 5000, () => {
    console.log(`${env} server listening at port ${port}`);
});
