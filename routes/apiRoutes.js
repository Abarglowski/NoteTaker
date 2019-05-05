var router = require("express").Router();
var connection = require("../db/connection");

router.get("/api/notes", function(req, res) {
  connection.query("SELECT * FROM notes", function(err, dbNotes) {
    res.json(dbNotes);
  });
});

router.post("/api/notes", function(req, res) {
    connection.query("INSERT INTO notes SET ?", req.body, function(err, result) {
      if (err) throw err;

      res.json(result);
    });
});

router.delete("/api/notes", function(req, res) {
  console.log(res);
  connection.query(
    "DELETE FROM notes WHERE ?",
    [req.param.id],
    function(err, result) {
    if (err) throw err;
    res.end('note has been deleted');
  });
});

module.exports = router;
