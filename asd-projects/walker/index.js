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
    "DOWN": 40 
  }
  // Game Item Objects
  var walker = {
    positionX: 0,
    speedX: 0,
    positionY: 0,
    speedY: 0
  }

  // one-time setup
  var interval = setInterval(newFrame, FRAMES_PER_SECOND_INTERVAL);   // execute newFrame every 0.0166 seconds (60 Frames per second)
  $(document).on('keydown', handleKeyDown);
  $(document).on('keyup', handleKeyUp);                        // change 'eventType' to the type of event you want to handle

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
  }
  
  /* 
  Called in response to events.
  */
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

  function handleKeyUp(event) {
    walker.speedX = 0;
    walker.speedY = 0;
  }

  ////////////////////////////////////////////////////////////////////////////////
  ////////////////////////// HELPER FUNCTIONS ////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////
  function repositionGameItem() {
    walker.positionX += walker.speedX; // update the position of the box along the x-axis
    walker.positionY += walker.speedY; // update the position of the box along the y-axis
  }

  function redrawGameItem() {
    $("#walker").css("left", walker.positionX); // draw the box in the new location, positionX pixels away from the "left"
    $("#walker").css("top", walker.positionY); // draw the box in the new location, positionY pixels away from the "top"
  }

  function wallCollision(){
    if (walker.positionX < 0 || walker.positionX + $("#walker").width()> $("#board").width()) {
      walker.positionX -= walker.speedX;
    } else if (walker.positionY < 0 || walker.positionY + $("#walker").height() > $("#board").height()) {
      walker.positionY -= walker.speedY;
    }
  }
  
  function endGame() {
    // stop the interval timer
    clearInterval(interval);

    // turn off event handlers
    $(document).off();
  }
  
}
