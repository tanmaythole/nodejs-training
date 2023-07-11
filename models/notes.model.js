const db = require("./db");

const Notes = function (note) {
  this.title = note.title;
  this.description = note.description;
};

// query to create note
Notes.create = (note, result) => {
  db.query("INSERT INTO notes SET ?", note, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }
    result(null, { id: res.insertId, ...note });
  });
};

// query to find note by id
Notes.findById = (id, result) => {
  db.query(`SELECT * FROM notes WHERE id=${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }
    if (res.length) {
      result(null, res[0]);
      return;
    }

    result({ type: "not_found" }, null);
  });
};

// query to find all notes
Notes.findAll = (result) => {
  db.query("SELECT * FROM notes", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }

    result(null, res);
  });
};

// query to update a note 
Notes.updateById = (id, note, result) => {
  db.query(`UPDATE notes SET ? WHERE id=${id}`, note, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }

    if (res.affectedRows === 0) {
      return result({ type: "not_found" }, null);
    }

    result(null, { id, ...note });
  });
};

// query to delete a note
Notes.deleteById = (id, result) => {
  db.query(`DELETE FROM notes WHERE id=${id}`, (err, res) => {
		if (err) {
      console.log("error: ", err);
      result(err?.sqlMessage, null);
      return;
    }

    if (res.affectedRows === 0) {
      return result({ type: "not_found" }, null);
    }

    result(null, res);
	});
};

module.exports = Notes;
