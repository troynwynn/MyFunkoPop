$(document).ready(function() {

  // Getting references to our form and input
  var signUpForm = $("form.signup");
  var emailInput = $("input#email-input");
  var passwordInput = $("input#password-input");
  // console.log(avatarInput);
  

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on("submit", function(event) {
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
      email: emailInput.val().trim(),
      password: passwordInput.val().trim(),
      avi: aviSrc
    };

    if (!userData.email || !userData.password || userData.avi == "") {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData.email, userData.password, userData.avi);
    emailInput.val("");
    passwordInput.val("");
    avatar.val("")
  });

  // Does a post to the signup route. If successful, we are redirected to the members page
  // Otherwise we log any errors
  function signUpUser(email, password, avi) {
    $.post("/api/signup", {
      email: email,
      password: password,
      avi: avi
    }).then(function(data) {
      window.location.replace(data);
      // If there's an error, handle it by throwing up a bootstrap alert
    }).catch(handleLoginErr);
  }

  function handleLoginErr(err) {
    $("#alert .msg").text(err.responseJSON);
    $("#alert").fadeIn(500);
  }

});