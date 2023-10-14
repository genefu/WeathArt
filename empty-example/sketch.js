let weather = fetch("http://api.weatherapi.com/v1/current.json?key=ee72f549b2844100b2d170220231410&q=sacramento");
weather.then(weather => weather.json()).then(data => parse(data));

//let emergency = fetch()
let clouds = 0;
let temp = 50;
let time = 0;
let condition = "";
function parse(data) {
  clouds = data.current.cloud;
  temp = data.current.temp_f;
  //get the time as a number from [0,24]
  let timeSplit = data.location.localtime.split(" ");
  timeSplit = timeSplit[1].split(":");
  time = Math.abs(parseInt(timeSplit[0]) - 12);
  condition = data.current.condition.text;
}

let waveSpeed = 0.1;
let spirals = [];

function setup() {
  // put setup code here
  createCanvas(screen.availWidth, screen.availHeight);
  noFill();

  //initialize spiral colors
  for (let i = 0; i < random(25, 50); i++) {
    let x = random(-width / 1.5, width);
    let y = random(-height / 1.5 , height);
    let size = random(5, 10);
    let colors = [];
    let strokeSizes = [];

    for (let j = 0; j < 200; j++) {
      let red = lerpColor(color(255, 0, 0, random(100, 200)), color(255, 255, 0, random(100, 200)), map(j, 0, 200, 0, 1));
      let yellow = lerpColor(color(255, 255, 0, random(100, 200)), color(255, 165, 0, random(100, 200)), map(j, 0, 200, 0, 1));
      let colorMix = lerpColor(red, yellow, map(j, 0, 200, 0, 1));
      colors.push(colorMix);
      let strokeSize = random(1, 5);
      strokeSizes.push(strokeSize);
    }
    spirals.push({ x, y, size, colors, strokeSizes });
  }
}


function draw() {
  // put drawing code here
  //background color fo teh entire thing, want to chnage this based off time
  background(100, 50, 250);
  translate(width / 2, height / 2);
  for (let z = -screen.width; z < screen.width; z+= 100) {
    for (let y = -height; y < 2000; y += 10) {
      let blue = Math.random()*200+55;
      stroke(25, 50, blue);
      //sunset: stroke(100, 50, blue);
      let x = Math.random() * 3 + 1;
      //for (let i = 0; i < 360; i += 15) {
        //x = 100 * Math.sin(i);
        bezier(z, y, 100, 100, z, y, z, y);
        bezier(z, y, -100, -100, z, y, z, y);
        //line(-width / 2, y, width / 2, y);
        strokeWeight(x);
    }
  }
  //switch case for diff weathers
  for (let spiral of spirals) {
    push();
    translate(spiral.x, spiral.y);
    for (let i = 0; i < 200; i++) {
      let radius = spiral.size * Math.sqrt(i);
      let x1 = radius * cos(i * 0.1);
      let y1 = radius * sin(i * 0.1);
      let x2 = radius * cos(i * 0.1 + PI / 6);
      let y2 = radius * sin(i * 0.1 + PI / 6);
      stroke(spiral.colors[i]);
      strokeWeight(spiral.strokeSizes[i]);
      bezier(0, 0, x1, y1, x2, y2, x1, y1);
    }
    pop();
  }
}
