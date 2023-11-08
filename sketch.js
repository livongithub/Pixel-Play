let playButton = document.getElementById('PlayButton');
let vidBool = false;

let colorThreshButton = document.getElementById('colorThreshold')
let colorFilterButton = document.getElementById('Image-Fil')
let pixelMirButton = document.getElementById('pixelMirror')
let colorShapesButton = document.getElementById('colorShapes')

let colorThreshBool = false;
let colorFilterBool = false;
let pixelMirrorBool = false;
let colorShapesBool = false;

colorThreshButton.addEventListener('click', ()=>{
  colorThreshBool = true;
  colorFilterBool = false;
  pixelMirrorBool = false;
  colorShapesBool = false;
  console.log(colorShapesBool, colorThreshBool, colorFilterBool, pixelMirrorBool)
})
colorFilterButton.addEventListener('click', ()=>{
  colorFilterBool = true;
  colorThreshBool = false;
  pixelMirrorBool = false;
  colorShapesBool = false;
  console.log(colorShapesBool, colorThreshBool, colorFilterBool, pixelMirrorBool)
})
pixelMirButton.addEventListener('click', ()=>{
  pixelMirrorBool = true;
  colorThreshBool = false;
  colorShapesBool = false;
  colorFilterBool = false;
  console.log(colorShapesBool, colorThreshBool, colorFilterBool, pixelMirrorBool)
})
colorShapesButton.addEventListener('click', ()=>{
  colorShapesBool = true;
  colorThreshBool = false;
  colorFilterBool = false;
  pixelMirrorBool = false;
  console.log(colorShapesBool, colorThreshBool, colorFilterBool, pixelMirrorBool)
})

console.log(colorShapesBool, colorThreshBool, colorFilterBool, pixelMirrorBool)

function toggleVideo() {
  vidBool = !vidBool;
  if (vidBool) {
    video.play();
    playButton.style.backgroundColor = 'black'
    playButton.style.color = 'white'
  } else {
    video.pause();
    playButton.style.backgroundColor = 'white'
    playButton.style.color = 'black'
  }
}

function setup() {
  createCanvas(1080, 1920);
  pixelDensity(1);
  video = createVideo('assets/water.mp4', videoLoaded);
  video.hide();
  playButton.addEventListener('click', toggleVideo);
}

function videoLoaded() {
  video.loop();
  video.loadPixels();
}

function draw() {
  background(255);
  if (vidBool) {
    // colorFilt();
    if(colorFilterBool){
      colorFilt();
    }
    image(video, 0, 0, width, height);
    if(pixelMirrorBool){
      pixelMirror()
    }
    if(colorShapesBool){
      makeQuad()
    }
    if(colorThreshBool){
      identifyColor()
    }
    // identifyColor()
  }
}

function pixelMirror(){
  for(i=0; i<2000; i++){
    for(j=0; j<11; j++){
      let newColor = get(100*i+10, 300*(i+1))
      noStroke()
      fill(newColor)
      rect(j*250, i*300, 300, 300)
    }
  }
}

function identifyColor(){
  for(x=0; x<27; x++){
    for(y=0; y<48; y++){
      let colorIndex = get(x*40+20, y*40+20)
      let redIndex = colorIndex[0]
      let greenIndex = colorIndex[1]
      let blueIndex = colorIndex[2]
      if(redIndex>greenIndex && redIndex>blueIndex){
        noStroke()
        fill(255, 0, 0)
      }else if(greenIndex>redIndex&& greenIndex>blueIndex){
        noStroke()
        fill(0, 255, 0)
      }else if(blueIndex>redIndex&&blueIndex>greenIndex){
        noStroke()
        fill(0, 0, 255)
      }else if(blueIndex==255&&redIndex==255&&greenIndex==255){
        stroke(0)
        fill(255)
      }else if(blueIndex==0&&redIndex==0&&greenIndex==0){
        noStroke()
        fill(0)
      }else{
        noFill()
        stroke(200)
      }
      ellipse(x*40+20, y*40+20, 20)
    }
  }
}

function makeQuad(){
  pointBlue1 = 0;
  bluePosY1 = 0;
  pointBlue2 = 0;
  bluePosY2 = 0;
  pointBlue3 = 0;
  bluePosY3 = 0;
  // pointBlue4 = 0;

  for(x=0; x<27; x++){
    for(y=0; y<48; y++){
      colorIndex = get(x*40+20, y*40+20)
      let blueIndex = colorIndex[2]
      if(blueIndex>pointBlue1){
        // pointBlue4 = pointBlue3
        pointBlue3 = pointBlue2
        pointBlue2 = pointBlue1
        pointBlue1 = blueIndex

        bluePosY3 = bluePosY2
        bluePosY2 = bluePosY1
        bluePosY1 = y*40+20
      }
    }
  }

  noFill()
  stroke(0, 0, 255)
  strokeWeight(8)
  triangle(pointBlue1,bluePosY1, pointBlue2, bluePosY2, pointBlue3, bluePosY3)

  pointRed1=0
  pointRed2=0
  pointred3=0

  redPosY1 = 0
  redPosY2 = 0
  redPosY3 = 0

  for(x=0; x<27; x++){
    for(y=0; y<48; y++){
      colorIndex = get(x*40+20, y*40+20)
      let redIndex = colorIndex[0]
      if(redIndex>pointRed1){
        // pointBlue4 = pointBlue3
        pointred3 = pointRed2
        pointRed2 = pointRed1
        pointRed1 = redIndex

        redPosY3 = redPosY2
        redPosY2 = redPosY1
        redPosY1 = y*40+20
      }
    }
  }
  stroke(255, 0, 0)
  triangle(pointRed1, redPosY1, pointRed2, redPosY2, pointred3, redPosY3)

  pointGreen1=0
  pointGreen2=0
  pointGreen3=0

  greenPosY1 = 0
  greenPosY2 = 0
  greenPosY3 = 0

  for(x=0; x<27; x++){
    for(y=0; y<48; y++){
      colorIndex = get(x*40+20, y*40+20)
      let greenIndex = colorIndex[1]
      if(greenIndex>pointGreen1){
        // pointBlue4 = pointBlue3
        pointGreen3 = pointGreen2
        pointGreen2 = pointGreen1
        pointGreen1 = greenIndex

        greenPosY3 = greenPosY2
        greenPosY2 = greenPosY1
        greenPosY1 = y*40+20
      }
    }
  }
  stroke(0, 255, 0)
  triangle(pointGreen1, greenPosY1, pointGreen2, greenPosY2, pointGreen3, greenPosY3)
}

function colorFilt(){
  video.loadPixels();
  let numPixels = 4*video.width*video.height;
  for(i=0; i<numPixels; i+=4){
    const blueIndex = video.pixels[i+2]+100
      video.pixels[i+2]= video.pixels[i+1]
      video.pixels[i+1]=blueIndex
    if(video.pixels[i]>100){
      video.pixels[i]=255
    }
    if(video.pixels[i]==255&&video.pixels[i+1]==255&&video.pixels[i+2]==255){
      video.pixels[i]=0
      video.pixels[i+1]=0
      video.pixels[i+2]=0
    }
  }
  video.updatePixels()
}


