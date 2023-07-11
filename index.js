const express = require("express");
const cors = require("cors");

const app = express();

// enable cors for all requests
app.use(cors())

app.use(express.json());

app.get("/", (req, res) => {
    res.send("Hello World!");
});

require("./routes/notes.routes")(app);
require("./routes/auth.routes")(app);

const args = process.argv.splice(2)
const env = args[0];
const port = args[1]?.split("=")[1]

app.listen(port || 5000, () => {
    console.log(`${env} server listening at port ${port}`);
});
