$(document).ready(function() {
    $.get("/api/signup").then(function(data) {
      $("#avi").attr("src", data.avi);
    });

    $("#refresh").on("click", function() {
        document.location.reload();

    });
  });