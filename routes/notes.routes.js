const verifyToken = require("../middleware/auth");

module.exports = (app) => {
    const notes = require("../controller/notes.controller");
    const router = require("express").Router();

    router.get("/", notes.findAll);
    router.get("/:id", notes.findOne);
    router.post("/", notes.create);
    router.put("/:id", notes.updateOne);
    router.delete("/:id", notes.deleteOne);

    app.use('/api/notes', verifyToken, router);
};
