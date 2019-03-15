if (!localStorage.avatar) {

  $.get("/api/signup").then(function(data) {
    $("#avi").attr("src", data.avi);
  });
} else {
  $("#avi").attr("src", localStorage.avatar);
}



$(document).ready(function() {

 
  
  $.get("/api/signup").then(function(data) {
      // $("#avi").attr("src", data.avi);
  

  // $(document).on("click", "bu", updateUser);
  var saveAvatar = $("form.signup");


    
  
  // Getting references to our form and input
  // var signUpForm = $("form.signup");
  // var emailInput = $("input#email-input");
  // var passwordInput = $("input#password-input");
  // console.log(avatarInput);
  

  // When the signup button is clicked, we validate the email and password are not blank
  saveAvatar.on("submit", function(event) {
    event.preventDefault();
    // event.preventDefault();

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
      var avatar = $("#character option:selected");
      var avatarInput = avatar.text().split(' ').join('');
      var aviSrc = `/images/Funko-Pop/${avatarInput}/${avatarInput}Head.png`;
    }

    var userData = {
      id: data.id,
      avi: aviSrc      
    }

    getUser();
    
    // If we have an email and password, run the signUpUser function
    updateUser(userData);
    $("#avi").attr("src", userData.avi);

    localStorage.setItem("avatar", userData.avi);

  });
 
});
  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors

  // This function grabs todos from the database and updates the view
  function getUser() {
    $.get("/api/signup").then(function(data) {
      user = data;
    });
  }

  function signUpUser(avi) {
    $.post("/api/signup", {
      avi: avi
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

    // This function updates a todo in our database
  function updateUser(user) {
    $.ajax({
      method: "PUT",
      url: "/api/signup",
      data: user
    }).then(function(data) {
      // $.get("/api/signup").then(function(data) {
      //   $("#avi").attr("src", data.avi);
      // });
      window.location.replace(data);
      // res.redirect(307, "/settings");
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

});