let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let drawing = [];
let drawings;
let currentlyDrawing = false;
let drawingIndex = 0;
let selectedDrawing;

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    frameRate(30);
    background(200);
    fill(0, 150);
    noStroke();
    if (!looping) {
        noLoop();
    }
    socket.on('pushJSONs', function(data) {
        drawings = data;
    });
    socket.emit('pullJSONs', "");
}

function draw() {
    if (exporting && frameCount < maxFrames) {
        frameExport();
    }
    if (currentlyDrawing) {
        for (let i = 0; i < 4; i++) {
            let d = selectedDrawing.data;
            let ind = drawingIndex;
            if (drawingIndex < d.length) {
                ellipse(d[ind][0], d[ind][1], 5);
                drawingIndex++;
            } else if (drawingIndex >= d.length) {
                currentlyDrawing = false;
            }
        }

    }
}

function mousePressed() {
    drawing.push([mouseX, mouseY]);
    ellipse(mouseX, mouseY, 5);
}

function mouseDragged() {
    drawing.push([mouseX, mouseY]);
    ellipse(mouseX, mouseY, 5);
}


function keyPressed() {
    if (keyCode === 32) {
        if (looping) {
            noLoop();
            looping = false;
        } else {
            loop();
            looping = true;
        }
    }
    if (key == 'p' || key == 'P') {
        frameExport();
    }
    if (key == 'r' || key == 'R') {
        window.location.reload();
    }
    if (key == 'm' || key == 'M') {
        redraw();
    }
    drawing
    if (key == 'o' || key == 'O') {
        socket.emit('saveJSON', { data: drawing, path: "./drawings/drawing-" });
    }
}

function printDrawing() {
    selectedDrawing = drawings[2];
    currentlyDrawing = true;
}