let noise;
let multiplier = 4;
let timeOff = 0;
let xNoiseInc = 0.01 * multiplier;
let yNoiseInc = 0.02 * multiplier;
let timeNoiseInc = 0.04;

let mic;


function setup() {
  createCanvas(windowWidth, windowHeight);
   noise = new OpenSimplexNoise(Date.now());
  mic = new p5.AudioIn();
  mic.start();
  
 userStartAudio();
}


function draw() {
  
  
  background(0);
  
  fill(0);
  stroke(255);
  strokeWeight(3);
  
  let vol = mic.getLevel();
  let volMap = map(vol,0,0.1,0,10);
  
  print(vol);
  
  translate(0,-240);


  translate(width / 2, height / 2 - 50);

  let rectWidth = 800;
  let spike = 200;
  let yOff = 0.0;
  let a = 0.0;

  for (let y = 0; y < 1590; y += 20) {
    let zSimRad = map(y, 0, 1600, 0, rectWidth);

    let zXOff = zSimRad * cos(radians(150));
    let zYOff = zSimRad * sin(radians(150));
    beginShape();

    vertex(0 + zXOff, 0 + zYOff);

    let xOff = 0.0;
    for (let x = 0; x <= rectWidth / 1; x += 4) {
      let noize = noise.noise3D(xOff, yOff, timeOff);
      let siny = map(sin(a), -1, 1, 0, 20);
      let mappedSpike;
      let threshold = -1; // remember, it's Simplex noise....

  
      // mappedSpike = map(noize, -1, 1, spike * 0.5, spike);
      
      mappedSpike = pow(map(noize, -1, 1, 0, 10), 3) * volMap + 200;
      

      let xPoint = x * cos(radians(30));
      let yPoint = x * sin(radians(30));

      vertex(xPoint + zXOff, yPoint - mappedSpike + zYOff - 5);

      xOff += xNoiseInc;
      a += PI / (rectWidth / 8.0);
    }
    a += PI / 16.0;
    yOff += yNoiseInc;
    vertex((rectWidth / 1) * cos(radians(30)) + zXOff, (rectWidth / 1) * sin(radians(30)) + zYOff);
    endShape(CLOSE);
  }

  timeOff += timeNoiseInc;

}
