$(document).ready(function() {
  $.get("/api/signup").then(function(data) {
    $("#avi").attr("src", data.avi);
  });
});