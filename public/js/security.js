 // Chosen CSS
 var config = {
    ".chosen-select": {},
    ".chosen-select-deselect": {
      allow_single_deselect: true
    },
    ".chosen-select-no-single": {
      disable_search_threshold: 10
    },
    ".chosen-select-no-results": {
      no_results_text: "Oops, nothing found!"
    },
    ".chosen-select-width": {
      width: "100%"
    }
  };


  for (var selector in config) {
    $(selector).chosen(config[selector]);
  }

  
  // Capture the form inputs
  $("#submit").on("click", function(event) {
    event.preventDefault();

    // Form validation
    function validateForm() {
      var isValid = true;
      $(".form-control").each(function() {
        if ($(this).val() === "") {
          isValid = false;
        }
      });

      $(".chosen-select").each(function() {

        if ($(this).val() === "") {
          isValid = false;
        }
      });
      return isValid;
    }

    if (validateForm()) {

console.log($( "#q1 option:selected" ).text());


        rawScores = [
            $("#q1").val(),
            $("#q2").val(),
            $("#q3").val(),
            $("#q4").val(),
            $("#q5").val(),
            $("#q6").val(),
            $("#q7").val(),
            $("#q8").val(),
            $("#q9").val(),
            $("#q10").val()
        ];

      var newFriend = {
        name: $("#name").val(),
        photo: $("#photo").val(),
        scores: rawScores
      };

    //   AJAX post the data to the friends API.
      $.post("/api/friends", newFriend, function(data) {

        // Grab the result from the AJAX post so that the best match's name and photo are displayed.
        $("#match-name").text(data.name.toUpperCase());
        $("#match-img").attr("src", data.photo);

        // Show the modal with the best match
        $("#results-modal").modal("toggle");

   
        $("#name").val(``);
        $("#photo").val('');
        $("#q1_chosen span").text('Select an Option');
        $("#q2_chosen span").text('Select an Option');
        $("#q3_chosen span").text('Select an Option');
        $("#q4_chosen span").text('Select an Option');
        $("#q5_chosen span").text('Select an Option');
        $("#q6_chosen span").text('Select an Option');
        $("#q7_chosen span").text('Select an Option');
        $("#q8_chosen span").text('Select an Option');
        $("#q9_chosen span").text('Select an Option');
        $("#q10_chosen span").text('Select an Option');
        $('.chosen-results').html(`<ul class="chosen-results"><li class="active-result" data-option-array-index="1" style="">1 (Strongly Disagree)</li><li class="active-result" data-option-array-index="2" style="">2</li><li class="active-result" data-option-array-index="3" style="">3</li><li class="active-result" data-option-array-index="4" style="">4</li><li class="active-result" data-option-array-index="5" style="">5 (Strongly Agree)</li></ul>`)

      });
    } else {
      alert("Please fill out all fields before submitting!");
    }

  
});