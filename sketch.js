let looping = true;
let socket, cnvs, ctx, canvasDOM;
let fileName = "./frames/sketch";
let maxFrames = 20;
let drawing = [];
let drawings;
let currentlyDrawing = false;
let drawingIndex = 0;
let selectedDrawing;
let initialized = false;
let layers = [];
let currentLayer = 0;
let graphics;
var dots = [];
let turtle = { x: 0, y: 0 };

function preload() {
    for (var i = 0; i < 4; i++) {
        var img = loadImage("./images/dot001-" + i + ".png");
        dots.push(img);
    }
}

function setup() {
    socket = io.connect('http://localhost:8080');
    cnvs = createCanvas(windowWidth, windowWidth / 16 * 9);
    ctx = cnvs.drawingContext;
    canvasDOM = document.getElementById('defaultCanvas0');
    // for (let i = 0; i < 4; i++) {
    //     let graphics = createGraphics(width * 2, height * 2);
    //     graphics.background(200 + random(5));
    //     graphics.fill(0, 100);
    //     graphics.noStroke();
    //     layers.push(graphics);
    // }

    graphics = createGraphics(width * 2, height * 2);
    graphics.background(255);
    graphics.fill(0, 100);
    graphics.noStroke();
    graphics.blendMode(DARKEST);

    frameRate(30);
    background(255);
    fill(0, 150);
    noStroke();
    imageMode(CENTER);
    graphics.imageMode(CENTER);
    // blendMode(DARKEST);
    if (!looping) {
        noLoop();
    }
    socket.on('pushJSONs', function(data) {
        drawings = data;
    });
    socket.emit('pullJSONs', "");
}

function draw() {
    blendMode(NORMAL);
    background(255);
    blendMode(DARKEST);
    if (drawings && !initialized) {
        initialized = true;
        printDrawing();
    }
    if (initialized) {
        if (exporting && frameCount < maxFrames) {
            frameExport();
        }
        // if (currentlyDrawing) {
        //     for (let i = 0; i < 4; i++) {
        //         let d = selectedDrawing.data;
        //         let ind = drawingIndex;
        //         if (drawingIndex < d.length) {
        //             // ellipse(d[ind][0], d[ind][1], 5);
        //             let p = new Particle(d[ind][0], d[ind][1]);
        //             // p.show();
        //             // push();
        //             // translate(d[ind][0], d[ind][1]);
        //             // rotate(random(TWO_PI));
        //             // image(dots[floor(random(4))], 0, 0, 15, 15);
        //             // pop();
        //             drawingIndex++;
        //         } else if (drawingIndex >= d.length) {
        //             currentlyDrawing = false;
        //         }
        //     }

        // }
        for (let i = 0; i < particles.length; i++) {
            particles[i].show();
        }
        // image(layers[currentLayer], 0, 0, width * 1, height * 1);
        // currentLayer++;
        // if (currentLayer >= layers.length) {
        //     currentLayer = 0;
        // }
        push();
        translate(width * 0.5, height * 0.5);
        rotate(frameCount / 100);
        image(graphics, 0, 0, width * 1, height * 1);
        scale(-1, 1);
        image(graphics, 0, 0, width * 1, height * 1);
        scale(-1, -1);
        image(graphics, 0, 0, width * 1, height * 1);
        scale(-1, 1);
        image(graphics, 0, 0, width * 1, height * 1);
        pop();
        graphics.blendMode(graphics.NORMAL);
        graphics.background(255);
        graphics.blendMode(graphics.DARKEST);
    }
}

function mousePressed() {
    drawing.push([mouseX, mouseY]);
    // ellipse(mouseX, mouseY, 5);
}

function mouseDragged() {
    drawing.push([mouseX, mouseY]);
    // ellipse(mouseX, mouseY, 5);
    let p = new Particle(mouseX * 2, mouseY * 2);
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