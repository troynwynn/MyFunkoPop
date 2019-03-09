$(document).ready(function() {
    // Gets an optional query string from our url (i.e. ?post_id=23)
    var url = window.location.search;
    var userId;
    // Sets a flag for whether or not we're updating a post to be false initially
    var updating = false;
  
    // If we have this section in our url, we pull out the post id from the url
    // In localhost:8080/cms?post_id=1, postId is 1
    if (url.indexOf("?post_id=") !== -1) {
      userId = url.split("=")[1];
      getUserData(userId);
    }
  
    // Getting jQuery references to the post body, title, form, and category select
    var usernameInput = $("#user");
    var passwordInput = $("#pass");
    
    var userForm = $("#user-form");
    // var postCategorySelect = $("#category");
    // Giving the postCategorySelect a default value
    // postCategorySelect.val("Personal");
    // Adding an event listener for when the form is submitted
    $(userForm).on("submit", function handleFormSubmit(event) {
      event.preventDefault();
      // Wont submit the post if we are missing a body or a title
      if (!usernameInput.val().trim() || !passwordInput.val().trim()) {
        return;
      }
      // Constructing a newPost object to hand to the database
      var newUser = {
        username: usernameInput.val().trim(),
        password: passwordInput.val().trim(),
        // category: postCategorySelect.val()
      };
  
      console.log(newUser);
  
      // If we're updating a post run updatePost to update a post
      // Otherwise run submitPost to create a whole new post
      if (updating) {
        newUser.id = userId;
        updateUser(newUser);
      }
      else {
        submitUser(newUser);
      }
    });
  
    // Submits a new post and brings user to blog page upon completion
    function submitUser(User) {
      $.post("/api/users/", User, function() {
        window.location.href = "/welcome";
      });
    }
  
    // Gets post data for a post if we're editing
    function getUserData(id) {
      $.get("/api/users/" + id, function(data) {
        if (data) {
          // If this post exists, prefill our cms forms with its data
          usernameInput.val(data.username);
          passwordInput.val(data.password);
        //   postCategorySelect.val(data.category);
          // If we have a post with this id, set a flag for us to know to update the post
          // when we hit submit
          updating = true;
        }
      });
    }
  
    // Update a given post, bring user to the blog page when done
    function updateUser(user) {
      $.ajax({
        method: "PUT",
        url: "/api/posts",
        data: user
      })
        .then(function() {
          window.location.href = "/welcome";
        });
    }
  });
  