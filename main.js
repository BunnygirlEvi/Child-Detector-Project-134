img = "";
objects = [];
status = "";
person = "";

function preload() {
  sound = loadSound("mixkit-classic-alarm-995.wav");
}

function setup() {
  canvas = createCanvas(380, 380);
  canvas.center();
  video = createCapture(VIDEO);
  video.size(380, 380);
  video.hide();
  objectDetector = ml5.objectDetector("cocossd", modelLoaded);
  document.getElementById("status").innerHTML = "Status: Detecting Objects";
}

function modelLoaded() {
  console.log("CocoSsd loaded");
  status = true;
}

function draw() {
  image(video, 0, 0, 380, 380);
  if (status != "") {
    r = random(255);
    g = random(255);
    b = random(255);
    objectDetector.detect(video, gotResult);
    for (i = 0; i < objects.length; i++) {
      document.getElementById("status").innerHTML = "Status : Object Detected";
      document.getElementById("number_of_objects").innerHTML =
        "Number of objects that are detected is : " + objects.length;
      fill(r, g, b);
      percent = floor(objects[0].confidence * 100);
      text(
        objects[0].label + "" + percent + "%",
        objects[0].x + 15,
        objects[0].y + 15
      );
      noFill();
      stroke(r, g, b);
      rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
      if (object[i].label == "person") {
        document.getElementById("number_of_objects").innerHTML = "Person Found";
      } else {
        sound.play();
        document.getElementById("number_of_objects").innerHTML =
          "Person Not Found";
      }
    }
  }
}

function gotResult(error, results) {
  if (error) {
    console.error(error);
  } else {
    console.log(results);
    objects = results;
  }

  // fill("#FF0000");
  //text("Dog", 45, 75);
  // noFill();
  //stroke("#FF0000");
  // rect(30, 60, 450, 350);

  //fill("#FF0000");
  //text("Cat", 320, 120);
  //noFill();
  //stroke("#FF0000");
  // rect(300, 90, 270, 320);
}

// if (status != "") {
//   r = random(255);
//   g = random(255);
//  b = random(255);
//  for (i = 0; i < objects.length; i++) {
//   document.getElementById("status").innerHTML = "Status : Object Detected";
//  document.getElementById("number_of_objects").innerHTML =
//   "Number of objects that are detected is : " + objects.length;
//  fill(r, g, b);
//percent = floor(objects[0].confidence * 100);
// text(
//   objects[0].label + "" + percent + "%",
// objects[0].x + 15,
//  objects[0].y + 15
//);
//noFill();
// stroke(r, g, b);
//rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
// }
//}
// }
