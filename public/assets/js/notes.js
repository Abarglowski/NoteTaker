var $noteList = $("#noteList");
var $deleteBtn = $(".delete");
var $submitBtn = $(".submit");

var handleSubmitClick = function(event) {
  event.preventDefault();
  var newNote = {
    title: $("#note-title").val().trim(),
    body: $("#note-text").val().trim()
  };

  $.ajax({
    url: "/api/notes",
    method: "POST",
    data: newNote
  }).then(function(data) {
    if (data) {
      alert("Note Saved");
    }
    else{
      alert("Note Did Not Save");
    }
    $("#note-title").val("");
    $("#note-text").val("");
    }
  );
};

var runTableQuery = function() {
  $.ajax({
    url: "/api/notes",
    method: "GET"
  }).then(function(noteData) {
    for (var i = 0; i < noteData.length; i++) {
      var $listItem = $("<li class='list-group-item mt-4'>");

      $listItem.append(
        $("<h2>").text(noteData[i].title),
        $("<hr>"),
        $("<h2>").text(noteData[i].body),
        $("<button class='float-right text-danger delete'>delete note</button>")
      );

      $noteList.append($listItem);
    }
  });
};

var deleteNotes = function() {
  console.log("we got here");

  $.ajax({
    url: "/api/notes",
    method: "DELETE" 
  }).then(function(err, res) {
    if(err) throw err;
    console.log(res);
    runTableQuery();
  });
};


$deleteBtn.on("click", deleteNotes);
$submitBtn.on("click", handleSubmitClick);

// Run Queries!
// ==========================================
runTableQuery();
