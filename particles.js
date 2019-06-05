let particles = [];

let Particle = function(x, y) {
    this.pos = { x: x, y: y };
    particles.push(this);
    this.particleIndex = particles.length - 1;
    this.iterations = 0;
    this.awake = true;
};

Particle.prototype.show = function() {
    // if (this.awake) {
    // this.pos.x += random(-0.1, 0.1);
    // this.pos.y += random(-0.1, 0.1);
    graphics.push();
    graphics.translate(this.pos.x, this.pos.y);
    graphics.rotate(random(TWO_PI));
    graphics.image(dots[floor(random(4))], 0, 0, 45, 45);
    graphics.pop();
    // ellipse(this.pos.x, this.pos.y, random(12, 15));
    // image(dots[floor(random(4))], this.pos.x, this.pos.y, 15, 15);
    // let s = 10;
    // let r = 2;
    // for (let i = 0; i < layers.length; i++) {
    //     // console.log("synthy!");
    //     layers[i].ellipse(this.pos.x + random(-r, r), this.pos.y + random(-r, r), s + random());
    //     layers[i].ellipse(50, 50, 150);
    //     // layers[i].background(random(255), random(255), random(255));
    // }
    this.iterations++;
    if (this.iterations >= 200) {
        // this.awake = false;
        particles.splice(this.particleIndex, 1);
    }
    // }
};