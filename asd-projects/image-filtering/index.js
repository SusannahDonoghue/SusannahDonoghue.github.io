// This is a small program. There are only two sections. This first section is what runs
// as soon as the page loads.
$(document).ready(function () {
  render($("#display"), image);
  $("#apply").on("click", applyAndRender);
  $("#reset").on("click", resetAndRender);
});

/////////////////////////////////////////////////////////
//////// event handler functions are below here /////////
/////////////////////////////////////////////////////////

// this function resets the image to its original value; do not change this function
function resetAndRender() {
  reset();
  render($("#display"), image);
}

// this function applies the filters to the image and is where you should call
// all of your apply functions
function applyAndRender() {
  // Multiple TODOs: Call your apply function(s) here
  applyFilterNoBackground(reddify);
  applyFilterNoBackground(decreaseBlue);
  applyFilter(increaseGreenByBlue);

  // do not change the below line of code
  render($("#display"), image);
}

/////////////////////////////////////////////////////////
// "apply" and "filter" functions should go below here //
/////////////////////////////////////////////////////////

// TODO 1, 2 & 4: Create the applyFilter function here
function applyFilter(filterFunction) {
  for (var i = 0; i < image.length; i++) {
    var arrayInArray = image[i]; //for every array in the array
    for (var j = 0; j < arrayInArray.length; j++) { //for every item in every array in the array
      var rgbString = image[i][j]; //retrieves string value from image
      var rgbNumbers = rgbStringToArray(rgbString); //makes rgb easier to manipulate

      filterFunction(rgbNumbers) //sets all red values in image to maximum

      rgbString = rgbArrayToString(rgbNumbers);

      image[i][j] = rgbString; //returns to image array
    } 
  }
}


// TODO 7: Create the applyFilterNoBackground function
function applyFilterNoBackground(filterFunction) {
  var backgroundColor = image[0][0]; //store background color

  for (var i = 0; i < image.length; i++) {
    var arrayInArray = image[i]; //for every array in the array
    for (var j = 0; j < arrayInArray.length; j++) { //for every item in every array in the array
      if (image[i][j] !== backgroundColor) {
        var rgbString = image[i][j]; //retrieves string value from image
        var rgbNumbers = rgbStringToArray(rgbString); //makes rgb easier to manipulate

        filterFunction(rgbNumbers) //sets all red values in image to maximum

        rgbString = rgbArrayToString(rgbNumbers);

        image[i][j] = rgbString; //returns to image array
      }
    } 
  }
}

// TODO 5: Create the keepInBounds function
function keepInBounds(num) {
  var result = num < 0 ? 0 : num > 255 ? 255 : num

  return result;
}

// TODO 3: Create reddify function
function reddify(array) {
  array[RED] = 200;
}

// TODO 6: Create more filter functions
function decreaseBlue(array) {
  array[BLUE] = keepInBounds(array[BLUE]- 50);
}

function increaseGreenByBlue(array) {
  array[GREEN] = keepInBounds(array[BLUE ] + array[GREEN]);
}
// CHALLENGE code goes below here