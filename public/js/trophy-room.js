$(document).ready(function() {
  if (!localStorage.avatar) {

    $.get("/api/signup").then(function(data) {
      $("#avi").attr("src", data.avi);
    });
  } else {

    $("#avi").attr("src", localStorage.avatar);
  }
  });