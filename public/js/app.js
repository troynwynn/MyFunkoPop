// "part" is the data-part
let part;
// "limbs" is the data-limb 
let limbs;
// "droppedItem" is the <img> of the dragged item
let droppedItem;
// "activeItem" is the id of the dragged item
let activeItem;

// "myFunko" object will be populated with <img> scr 
let myFunko = {
  head: null,
  torso: null,
  legs: null,
  background: null
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
  if(limbs === "head"){
    document.querySelector("." + part)
    .style = "position:fixed; top:0; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    myFunko.head = droppedItem.src;
    $("#" + activeItem).draggable(); 
  } else if (limbs === "torso") {
    document.querySelector("." + part)
    .style = "position:fixed; top:200px; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    myFunko.torso = droppedItem.src;
    $("#" + activeItem).draggable(); 
  } else if(limbs === "legs"){
    document.querySelector("." + part)
    .style = "position:fixed; top:400px; height:900px; width:900px;";
    document.querySelector(".wrapper").append(droppedItem);
    myFunko.legs = droppedItem.src;
    $("#" + activeItem).draggable(); 
  } else if(limbs === "background"){
    $("#activeBackground").attr("src", droppedItem.src)
  }
  // console.log(droppedItem);
  // console.log(myFunko);
  // console.log(ev);
}

// Targets the head so we can move the head only
$(document).on("click", ".headBtn", function(){
  $(".head").css('z-index', 3);
  $(".torso, .legs").css('z-index', 2);
  $(".torso, .legs").draggable({
    disabled: true
  })
});
// Targets the body so we can move the body only
$(document).on("click", ".bodyBtn", function(){
  $(".torso").css('z-index', 3);
  $(".head, .legs").css('z-index', 2);
  $(".head, .legs").draggable({
    disabled: true
  })
});
// Targets the legs so we can move the legs only
$(document).on("click", ".legsBtn", function(){
  $(".legs").css('z-index', 3);
  $(".torso, .head").css('z-index', 2);
  $(".torso, .head").draggable({
    disabled: true
  })
});