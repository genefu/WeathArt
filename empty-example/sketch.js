let weather = fetch("http://api.weatherapi.com/v1/current.json?key=ee72f549b2844100b2d170220231410&q=auto:ip");
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
  //background color based on the time
  //background(200 - (12 * time), 180 - (15 * time), 100 + (8 * time), 100);
  background('rgba(100,150,220,0.05)');
  translate(width / 2, height / 2);
  /*for (let z = -screen.width; z < screen.width; z+= 100) {
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
  }*/
  //switch case for diff weathers
  /*for (let spiral of spirals) {
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
  }*/

  //snow
  /*let angle = 0.0;
  let offset = Math.round(Math.random() * 100);
  let scalar = 2;
  let speed = 0.05;

  for (let i = offset; i < screen.width / 2; i += 1000) {
    let x = i + cos(angle) * scalar;
    let y = i + sin(angle) * scalar;
    ellipse(x, y, 2, 2);
    ellipseMode(CENTER);
    angle += speed;
    scalar += speed;
    stroke('white');
    strokeWeight(Math.random() * 5)
    speed = Math.random() + 0.01;
  }*/

  //rain
  let lines = [];
  let reflections = [];

  if (random(1) > 0.75) {
    let x = random(screen.availWidth);
    let y = 0;
    let len = random(5,60);
    let opacity = random(160,200);
    let weight = map(len, 5, 10, 0.5, 2);
    let blueShade = random(180,220);
    lines.push({x,y,len,blueShade,opacity,weight});
  }

  if (random(1) < 0.03) {
    let x = random(screen.availWidth);
    let y = 0;
    let len = random(1, 50);
    let opacity = random(200,250);
    let weight = map(len,5,10,0.5,2);
    let reflectColor = color(random(200,250),random(200,255),random(200,250));
    reflections.push({x,y,len,reflectColor,opacity,weight});
  }

  for (let i = lines.length - 1; i >= 0; i--) {
    let linee = lines[i];
    stroke(0, 0, linee.blueShade, linee.opacity);
    strokeWeight(linee.weight);
    line(linee.x,linee.y,linee.x,linee.y + linee.len);
    strokeWeight(linee.weight);
    linee.y += 1;

    if (linee.y > screen.availHeight) {
      lines.splice(i, 1);
    }
  }

  for (let i = reflections.length - 1; i >=0; i--) {
    let reflection = reflections[i];
    stroke(reflection.reflectColor);
    strokeWeight(reflection.weight);
    line(reflection.x, reflection.y, reflection.x, reflection.y + reflection.len);
    strokeWeight(reflection.weight);
    reflection.y +=1;
    if (reflection.y > height) {
      reflections.splice(i,1);
    }
  }

  //lightning
  /*var x1 = Math.round(Math.random() * width);
  var y1 = Math.round(Math.random() * width);
  var x2 = Math.round(Math.random() * width);
  var y2 = Math.round(Math.random() * width);
  var x3 = Math.round(Math.random() * width);
  var y3 = Math.round(Math.random() * width);
  var x4 = Math.round(Math.random() * width);
  var y4 = Math.round(Math.random() * width);
  var x5 = Math.round(Math.random() * width);
  var y5 = Math.round(Math.random() * width);
  var x6 = Math.round(Math.random() * width);
  var y6 = Math.round(Math.random() * width);

  fill('yellow')
  stroke("yellow")
  strokeWeight(Math.round(Math.random()*10))
  line(x1, y1, x1 + random(1, 300), y1 + random(1, 300))
  line(x1, y1, x1 - random(1, 300), y1 - random(1, 300))
  line(x2, y2, x2 + random(1, 300), y2 + random(1, 300))
  line(x2, y2, x2 - random(1, 300), y2 + random(1, 300))
  line(x3, y3, x3 - random(1, 300), y3 - random(1, 300))
  line(x3, y3, x3 - random(1, 300), y3 + random(1, 300))
  line(x4, y4, x4 + random(1, 300), y4 - random(1, 300))
  line(x4, y4, x4 - random(1, 300), y4 + random(1, 300))
  line(x5, y5, x5 - random(1, 300), y5 - random(1, 300))
  line(x5, y5, x5 + random(1, 300), y5 + random(1, 300))
  line(x6, y6, x6 - random(1, 300), y6 - random(1, 300))
  line(x6, y6, x6 + random(1, 300), y6 - random(1, 300))*/

}
