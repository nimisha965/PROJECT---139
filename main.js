img = "";
status = "";
object = [] ;

function preload() {
    img = loadImage('bag.jpg') ;
    img = loadImage('chair.jpg') ;
    img = loadImage('computer.jpg') ;
    img = loadImage('printer.jpg') ;
    img = loadImage('switchboard.jpg') ;
    img = loadImage('television.jpg') ;
}
function setup() {
    canvas = createCanvas(380 , 380);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    objectDetector = ml5.objectDetector('cocossd' , modelLoaded);
    document.getElementById('status').innerHTML = "Status : Detexting Objects";
}
function draw() {
    image(video , 0 , 0 , 380 , 380) ;
    if(status !="") {
        for(i = 0 ; i<objects.length;i++){
            r = random(255);
            g = random(255);
            b = random(255);
            objectDetector.detect(video , gotResults);
            document.getElementById("status").innerHTML = "Status : Detexting Objects";
            document.getElementById("number_of_objects").innerHTML = "Number of objects detected are:"+objects.length;
            fill("#FF0000");
            fill(r,g,b);
            percent = floor(object[i].confidence * 100);
            text(object[i].label+""+percent+"%",object[i].x+15,object[i].y+15);
            noFill();
            stroke(r,g,b);
            stroke("#FF0000");
            rect(object[i].x,object[i].y,object[i].width,object[i].height);
        }
    }
}
function modelLoaded() {
    console.log("Model Loaded") ;
    status = true ;
    objectDetector.detect(video , gotResults);
}
function gotResults(error , results) {
    if(error) {
        console.log(error);
    }
    console.log(results);
    object = results;
}