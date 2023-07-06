const express = require("express");

const app = express();

const args = process.argv.splice(2)
const env = args[0];
const port = args[1]?.split("=")[1]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port || 5000, () => {
    console.log(`${env} server listening at port ${port}`);
});
