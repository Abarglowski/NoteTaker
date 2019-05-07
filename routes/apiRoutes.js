var router = require("express").Router();
var connection = require("../db/connection");

router.get("/api/notes", function(req, res) {
  connection.query("SELECT * FROM notes",
  function(err, dbNotes) {
    res.json(dbNotes);
  });
});

router.post("/api/notes", function(req, res) {
    connection.query("INSERT INTO notes SET ?",
    req.body,
    function(err, result) {
      if (err) throw err;

      res.json(result);
    });
});

router.delete("/api/notes/:id", function(req, res) {
  console.log("we got here");
  var condition = {
    id: req.params.id,
  }
  connection.query("DELETE FROM notes WHERE ?", 
  condition,
  function(err,result){
    if(err) throw err;
    res.json(result);
  })
  });

module.exports = router;
