/* global $, sessionStorage */

$(document).ready(runProgram); // wait for the HTML / CSS elements of the page to fully load, then execute runProgram()
  
function runProgram(){
  ////////////////////////////////////////////////////////////////////////////////
  //////////////////////////// SETUP /////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  // Constant Variables
  var FRAME_RATE = 60;
  var FRAMES_PER_SECOND_INTERVAL = 1000 / FRAME_RATE;
  KEY = {
    "LEFT": 37,
    "UP": 38,
    "RIGHT": 39,
    "DOWN": 40,
    "W": 87,
    "A": 65,
    "S": 83,
    "D": 68
  }
  // Game Item Objects
  var walker = {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0
  }

  var walker0 = {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keydown', handleKeyDown0);
  $(document).on('keyup', handleKeyUp);                        // change 'eventType' to the type of event you want to handle
  $(document).on('keyup', handleKeyUp0);                        
  $(document).on('click', handleClick);
  $(document).on('click', handleClick0);
  ////////////////////////////////////////////////////////////////////////////////
  ///////////////////////// CORE LOGIC ///////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////

  /* 
  On each "tick" of the timer, a new frame is dynamically drawn using JavaScript
  by calling this function and executing the code inside.
  */
  function newFrame() {
    repositionGameItem();
    wallCollision();
    redrawGameItem();

    repositionGameItem0();
    wallCollision0();
    redrawGameItem0();

    ballCollide();
  }
  
  /* 
  Called in response to events.
  */
  function handleKeyDown0(event) { //When key is pressed, move walker game item
    if (event.which === KEY.W) {
      walker0.speedY = -5; //go up
    } else if (event.which ===  KEY.A) {
      walker0.speedX = -5; //go left
    } else if (event.which ===  KEY.S) {
      walker0.speedY = 5; //go down
    } else if (event.which ===  KEY.D) {
      walker0.speedX = 5; //go right
    }
  }

  function handleKeyDown(event) { //When key is pressed, move walker game item
    if (event.which === KEY.LEFT) {
      walker.speedX = -5; //go left
    } else if (event.which ===  KEY.RIGHT) {
      walker.speedX = 5; //go right
    } else if (event.which ===  KEY.UP) {
      walker.speedY = -5; //go up
    } else if (event.which ===  KEY.DOWN) {
      walker.speedY = 5; //go down
    }
  }

  function handleKeyUp() {
    walker.speedX = 0;
    walker.speedY = 0;
  }

  function handleKeyUp0() {
    walker0.speedX = 0;
    walker0.speedY = 0;
  }

  function handleClick(){
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $("#walker").css("background-color",randomColor);
  }

  function handleClick0(){
    var randomColor = "#000000".replace(/0/g, function () {
      return (~~(Math.random() * 16)).toString(16);
    });
    $("#walker0").css("background-color",randomColor);
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.positionX += walker.speedX; // update the position of the box along the x-axis
    walker.positionY += walker.speedY; // update the position of the box along the y-axis
  }

  function repositionGameItem0() {
    walker0.positionX += walker0.speedX; // update the position of the box along the x-axis
    walker0.positionY += walker0.speedY; // update the position of the box along the y-axis
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.positionX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.positionY); // draw the box in the new location, positionY pixels away from the "top"
  }

  function redrawGameItem0() {
    $("#walker0").css("left", walker0.positionX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker0").css("top", walker0.positionY); // draw the box in the new location, positionY pixels away from the "top"
  }

  function wallCollision(){
    if (walker.positionX < 0 || walker.positionX + $("#walker").width()> $("#board").width()) {
      walker.positionX -= walker.speedX;
    } else if (walker.positionY < 0 || walker.positionY + $("#walker").height() > $("#board").height()) {
      walker.positionY -= walker.speedY;
    }
  }

  function wallCollision0(){
    if (walker0.positionX < 0 || walker0.positionX + $("#walker0").width()> $("#board").width()) {
      walker0.positionX -= walker0.speedX;
    } else if (walker.positionY < 0 || walker0.positionY + $("#walker0").height() > $("#board").height()) {
      walker0.positionY -= walker0.speedY;
    }
  }

  function ballCollide(){
    if (walker.positionX < walker0.positionX + $("#walker0").width() && walker.positionX + $("#walker0").width() > walker0.positionX &&  walker.positionY < walker0.positionY + $("#walker0").height() && walker.positionY + $("#walker").height()> walker0.positionY) {
      return true;
    }
  }

  function showResult(result) {
    $("h2").text('doCollide: ' + result);
}
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
