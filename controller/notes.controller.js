const Notes = require("../models/notes.model");

// create note controller
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "All fields are required." });
  }
  const { title, description } = req.body;
  const note = new Notes({
    title,
    description,
  });

  Notes.create(note, (err, data) => {
    if (err) {
      return res.status(400).send({
        message: err || "Something went wrong!",
      });
    }
    res.send(data);
  });
};

// get one note by Id controller
exports.findOne = (req, res) => {
  const { id } = req.params;

  Notes.findById(id, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        return res.status(404).send({ message: "Note not found!" });
      }
      return res.status(400).send({ message: err || "Something went wrong!" });
    }

    res.send(data);
  });
};

// get all notes 
exports.findAll = (req, res) => {
  Notes.findAll((err, data) => {
    if (err) {
      res.status(400).send({ message: err || "Something went wrong!" });
    } else {
      res.send(data);
    }
  });
};

// update a note of given Id
exports.updateOne = (req, res) => {
  if (!req.body) {
    return res.status(400).send({ message: "Content can not be empty!" });
  }
  Notes.updateById(req.params.id, new Notes(req.body), (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        return res.status(404).send({ message: "Note not found!" });
      }
      return res.status(400).send({ message: err || "Something went wrong!" });
    }
    res.send(data);
  });
};

// delete a note of given Id
exports.deleteOne = (req, res) => {
  Notes.deleteById(req.params.id, (err, data) => {
    if (err) {
      if (err.type === "not_found") {
        return res.status(404).send({ message: "Note not found!" });
      }
      return res.status(400).send({ message: err || "Something went wrong!" });
    }
    res.send({ message: "Note deleted successfully!" });
  });
};
