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
  droppedItem = null;
  activeItem = null;
  limbs = null;
  part = ev.target.dataset.part;
  limbs = ev.target.dataset.limb;
  // this shows the source location of dragable items
  droppedItem = ev.target;
  activeItem = ev.target.id;
  // write logic including limbs for on drop function
  // if(limbs === "head"){
  //   myFunko.head = ev.srcElement.src
  // } else if(limbs === "torso"){
  //   myFunko.torso = ev.srcElement.src
  // } else if(limbs === "legs"){
  //   myFunko.legs = ev.srcElement.src
  // }
}

// This function uses the "data-type" to grab the class name of the image,
// appends the grabbed <img> to the dropped area,
// and uses the "id" of the dragged item to make it draggable through the widget
function drop(ev) {
  ev.preventDefault();
  if(limbs === "head"){
    document.querySelector("." + part)
    .style = "position:fixed; top:0; height:700px; width:700px;";
  } else if (limbs === "torso") {
    document.querySelector("." + part)
    .style = "position:fixed; top:200px; height:700px; width:700px;";
  } else if(limbs === "legs"){
    document.querySelector("." + part)
    .style = "position:fixed; top:400px; height:700px; width:700px;";
  }

  document.querySelector(".wrapper")
    .append(droppedItem);
  $("#" + activeItem).draggable();  
  console.log(myFunko);
  console.log(ev);
}

// They all need uniqe "data-parts" and a uniqe "ids" to work