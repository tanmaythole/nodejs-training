const express = require("express");
const cors = require("cors");

const app = express();

// enable cors for all requests
app.use(cors())

const args = process.argv.splice(2)
const env = args[0];
const port = args[1]?.split("=")[1]

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port || 5000, () => {
    console.log(`${env} server listening at port ${port}`);
});
