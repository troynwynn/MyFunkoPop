// "part" is the data-part
let part;
// "limbs" is the data-limb 
let limbs;
// "droppedItem" is the <img> of the dragged item
let droppedItem;
// "activeItem" is the id of the dragged item
let activeItem;
// "datatype" is the data of the html element
let datatype;

// "myFunko" object will be populated with <img> scr 
let myFunko = {
  head: null,
  torso: null,
  legs: null,
  background: null
}

// "active" object is the current <img> users are working on
let active = {
  head: null,
  headID: null,
  headCharacter: null,
  torso: null,
  torsoID: null,
  torsoCharacter: null,
  legs: null,
  legsID: null,
  legsCharacter: null,
}

// This function prevents the drop default 
function allowDrop(ev) {
  ev.preventDefault();
}

// This function on drag clears then sets our variables
function drag(ev) {
  part = null;
  limbs = null;
  droppedItem = null;
  activeItem = null;
  currentScr = null;

  part = ev.target.dataset.part;
  datatype = ev.target.dataset;
  limbs = ev.target.dataset.limb;
  droppedItem = ev.target;
  activeItem = ev.target.id;
  // console.log(ev);
}

// This function uses the "data-type" to grab the class name of the image,
// appends the grabbed <img> to the dropped area,
// and uses the "id" of the dragged item to make it draggable through the widget
function drop(ev) {
  ev.preventDefault();
  if (limbs === "head") {
    document.querySelector("." + part)
      .style = "position:absolute; top:-70px; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    $(".head").draggable({
      disabled: false
    });
    myFunko.head = droppedItem.src;
    active.head = droppedItem;
    active.headID = activeItem;
    active.headCharacter = datatype.character;
    $("#" + activeItem).draggable();
  } else if (limbs === "torso") {
    document.querySelector("." + part)
      .style = "position: absolute; top:90px; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    $(".torso").draggable({
      disabled: false
    });
    myFunko.torso = droppedItem.src;
    active.torso = droppedItem;
    active.torsoID = activeItem;
    active.torsoCharacter = datatype.character;
    $("#" + activeItem).draggable();
  } else if (limbs === "legs") {
    document.querySelector("." + part)
      .style = "position:absolute; top:215px; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    $(".legs").draggable({
      disabled: false
    });
    myFunko.legs = droppedItem.src;
    active.legs = droppedItem;
    active.legsID = activeItem;
    active.legsCharacter = datatype.character;
    $("#" + activeItem).draggable();
  } else if (limbs === "background") {
    $("#activeBackground").attr("src", droppedItem.src)
  }
  // console.log(droppedItem);
  // console.log(myFunko);
  // console.log(ev);
}

// Targets the head so we can move the head only
$(document).on("click", ".headBtn", function () {
  $("#" + active.headID).css('z-index', 2);
  $(".torso, .legs").css('z-index', 1);
});
// Targets the body so we can move the body only
$(document).on("click", ".bodyBtn", function () {
  $("#" + active.torsoID).css('z-index', 2);
  $(".head, .legs").css('z-index', 1);
});
// Targets the legs so we can move the legs only
$(document).on("click", ".legsBtn", function () {
  $("#" + active.legsID).css('z-index', 2);
  $(".torso, .head").css('z-index', 1);
});
// Removes the chosen head
$(document).on("click", ".removeHead", function () {
  $(".head").draggable({
    disabled: true
  })
  $("#" + active.headID).css("height", 200);
  $("#" + active.headID).css("width", 200);
  $("#" + active.headID).css("top", "auto");
  $("#" + active.headID).css("left", "auto");
  $(".head").css("z-index", 1);
  $("#" + active.headID).css("position", "relative");
  $("." + active.headID).append(active.head);
});
// Removes the chosen body
$(document).on("click", ".removeBody", function () {
  $(".torso").draggable({
    disabled: true
  })
  $("#" + active.torsoID).css("height", 200);
  $("#" + active.torsoID).css("width", 200);
  $("#" + active.torsoID).css("top", "auto");
  $("#" + active.torsoID).css("left", "auto");
  $(".torso").css("z-index", 1);
  $("#" + active.torsoID).css("position", "relative");
  $("." + active.torsoID).append(active.torso);
});
// Removes the chosen legs 
$(document).on("click", ".removeLegs", function () {
  $(".legs").draggable({
    disabled: true
  })
  $("#" + active.legsID).css("height", 200);
  $("#" + active.legsID).css("width", 200);
  $("#" + active.legsID).css("top", "auto");
  $("#" + active.legsID).css("left", "auto");
  $(".legs").css("z-index", 1);
  $("#" + active.legsID).css("position", "relative");
  $("." + active.legsID).append(active.legs);
});

// Winning conditions
const $confetti = $("#confetti");
$confetti.hide();
// Chacks if all parts match
$(document).on("click", ".matchBtn", function () {
  if ((active.headCharacter === active.torsoCharacter) &&
    (active.torsoCharacter === active.legsCharacter) &&
    (active.headCharacter !== null)) {
    $(".head").css("z-index", 3)
    $confetti.show();
    $confetti.get(0).play();
    setTimeout(function () {
      $confetti.get(0).pause();
      $confetti.hide();
    }, 7000)

    // console.log(this);
    $("#congrats").text(`Congraduations you have unlocked ${active.headCharacter} in the Trophy Room`)
    switch (active.headCharacter) {
      case "BlackWidow":
        localStorage.setItem("trophy1", active.headCharacter);
        break;
      case "Bucky":
        localStorage.setItem("trophy2", active.headCharacter);
        break;
      case "CaptainAmerica":
        localStorage.setItem("trophy3", active.headCharacter);
        break;
      case "CapMarvel":
        localStorage.setItem("trophy4", active.headCharacter);
        break;
      case "DrStrange":
        localStorage.setItem("trophy5", active.headCharacter);
        break;
      case "SapGroot":
        localStorage.setItem("trophy6", active.headCharacter);
        break;
      case "Shuri":
        localStorage.setItem("trophy7", active.headCharacter);
        break;
      case "TeenGroot":
        localStorage.setItem("trophy8", active.headCharacter);
        break;
      case "Killmonger":
        localStorage.setItem("trophy9", active.headCharacter);
        break;
      case "Thor":
        localStorage.setItem("trophy10", active.headCharacter);
        break;
      case "Hela":
        localStorage.setItem("trophy11", active.headCharacter);
        break;
      case "StarLord":
        localStorage.setItem("trophy12", active.headCharacter);
        break;
    }

    let bobbleL = setInterval(function () {
      $(".head").css("transition", "ease 1s")
      $(".head").css("transform", "translate(-30px, 0px)")
    }, 400);
    let bobbleR = setInterval(function () {
      $(".head").css("transition", "ease 1s")
      $(".head").css("transform", "translate(30px, 0px)")
    }, 800);

    setTimeout(function () {
      clearInterval(bobbleL);
      clearInterval(bobbleR);
      $(".head").css("transition", "ease 0s")
      $(".head").css("transform", "translate( 0px, 0px)")
    }, 7000);
  }
});

$(".matchBtn").hover(function () {
  if ((active.headCharacter === active.torsoCharacter) &&
    (active.torsoCharacter === active.legsCharacter) &&
    (active.headCharacter !== null)) {
    $(".matchBtn").attr("data-toggle", "modal");
  }
}, function () {
  $(".matchBtn").attr("data-toggle", "");
});
