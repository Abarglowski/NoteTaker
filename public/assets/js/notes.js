var $noteList = $("#noteList");
var $submitBtn = $(".submit");
var $deleteBtn = $(".delete");

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

var runNoteQuery = function() {
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
        $("<button class='float-right text-danger delete' data-id=" + noteData[i].id + ">delete note</button>")
      );

      $noteList.append($listItem);
    }
  });
};

var deleteNote = function() {
  const noteId = $(this).attr("data-id");
  $.ajax({
    url: "/api/notes/" + noteId,
    method: "DELETE" 
  }).then(function() {
    console.log("deleted note");
    $("#noteList").empty();
    runNoteQuery();
  });
};

$submitBtn.on("click", handleSubmitClick);
$(document).on("click", ".delete", deleteNote);
runNoteQuery();

