// requestAnim shim layer by Paul Irish
    window.requestAnimFrame = (function(){
      return  window.requestAnimationFrame       ||
              window.webkitRequestAnimationFrame ||
              window.mozRequestAnimationFrame    ||
              window.oRequestAnimationFrame      ||
              window.msRequestAnimationFrame     ||
              function(/* function */ callback, /* DOMElement */ element){
                window.setTimeout(callback, 1000 / 60);
              };
    })();


// example code from mr doob : http://mrdoob.com/lab/javascript/requestanimationframe/

animate();

var mLastFrameTime = 0;
var mWaitTime = 5000; //time in ms
function animate() {
    requestAnimFrame( animate );
	var currentTime = new Date().getTime();
	if (mLastFrameTime === 0) {
		mLastFrameTime = currentTime;
	}

	if ((currentTime - mLastFrameTime) > mWaitTime) {
		swapPhoto();
		mLastFrameTime = currentTime;
	}
}

/************* DO NOT TOUCH CODE ABOVE THIS LINE ***************/

function getQueryParams(qs) {
 qs = qs.split("+").join(" ");
 var params = {},
 tokens,
 re = /[?&]?([^=]+)=([^&]*)/g;
 while (tokens = re.exec(qs)) {
 params[decodeURIComponent(tokens[1])]
 = decodeURIComponent(tokens[2]);
 }
 return params;
}
var $_GET = getQueryParams(document.location.search);
//console.log($_GET["json"]); // would output "John"

// URL for the JSON to load by default
// Some options for you are: images.json, images.short.json; you will need to create your own extra.json later
var mUrl = 'images.json';

// XMLHttpRequest variable
var mRequest = new XMLHttpRequest();

mRequest.onreadystatechange = function() {
  // Do something interesting if file is opened successfully
  if (mRequest.readyState == 4 && mRequest.status == 200) {
  try {
  // Let’s try and see if we can parse JSON
  mJson = JSON.parse(mRequest.responseText);
  // Let’s print out the JSON; It will likely show as “obj”
  for(var i = 0; i < mJson.images.length; i++){

      var myLine = mJson.images[i];
      mImages.push(new GalleryImage(myLine.imgLocation, myLine.description, myLine.date, myLine.imgPath))

  }


  console.log(mImages);


  } catch(err) {
  console.log(err.message)
  }
  }
};
mRequest.open("GET",mUrl, true);
mRequest.send();

// creating photo Gallery Object


function swapPhoto() {
	//Add code here to access the #slideShow element.
	//Access the img element and replace its source
	//with a new image from your images array which is loaded
	//from the JSON string

  $('#photo').attr('src', mImages[0].imgPath);

	console.log('swap photo');
}

// Counter for the mImages array
var mCurrentIndex = 0;

//mRequest.addEventListener("load", reqListener);
//mRequest.open("GET", "../images.json");
//mRequest.send();

// Array holding GalleryImage objects (see below).
var mImages = [];

// Holds the retrived JSON information
var mJson;



//You can optionally use the following function as your event callback for loading the source of Images from your json data (for HTMLImageObject).
//@param A GalleryImage object. Use this method for an event handler for loading a gallery Image object (optional).
function makeGalleryImageOnloadCallback(galleryImage) {
	return function(e) {
		galleryImage.img = e.target;
		mImages.push(galleryImage);
	}
}

$(document).ready( function() {

	// This initially hides the photos' metadata information
  $('.details').eq(0).hide();

  $('.moreIndicator').click(function() {

    	$('.details').eq(0).show();

      $(this).removeClass("rot90");
      $(this).addClass("rot270");

  }, false)

});

window.addEventListener('load', function() {

	console.log('window loaded');

}, false);

function GalleryImage(location, description, date, img) {
  this.location = location;
  this.description = description;
  this.date = date;
  this.img = img;

}
