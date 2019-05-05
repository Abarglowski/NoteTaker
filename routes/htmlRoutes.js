var router = require("express").Router();
var path = require("path");

// Render tables.html at the "/tables" path
router.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// All other paths serve the home.html page
router.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "../public/home.html"));
});

module.exports = router;
