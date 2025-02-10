let rocket;
let gravity;
let thrust;
let landed = false;
let crashed = false;
let groundY;

function setup() {
  createCanvas(800, 600);
  rocket = new Rocket();
  gravity = createVector(0, 0.05);
  thrust = createVector(0, -0.1);
  groundY = height - 50;
}

function draw() {
  background(10);
  fill(200);
  rect(0, groundY, width, height - groundY);
  
  rocket.update();
  rocket.display();
  
  if (landed) {
    fill(0, 255, 0);
    textSize(32);
    text("Lądowanie udane!", width / 2 - 100, height / 2);
    noLoop();
  } else if (crashed) {
    fill(255, 0, 0);
    textSize(32);
    text("Katastrofa!", width / 2 - 100, height / 2);
    noLoop();
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    rocket.applyThrust();
  }
  if (keyCode === LEFT_ARROW) {
    rocket.applySideThrust(-0.05);
  }
  if (keyCode === RIGHT_ARROW) {
    rocket.applySideThrust(0.05);
  }
}

class Rocket {
  constructor() {
    this.pos = createVector(width / 2, 50);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
  }

  applyThrust() {
    this.acc.add(thrust);
  }

  applySideThrust(amount) {
    this.acc.x += amount;
  }

  update() {
    if (!landed && !crashed) {
      this.acc.add(gravity);
      this.vel.add(this.acc);
      this.pos.add(this.vel);
      this.acc.mult(0);

      if (this.pos.y + 20 >= groundY) {
        if (this.vel.y < 1 && abs(this.vel.x) < 0.5) {
          landed = true;
        } else {
          crashed = true;
        }
        this.vel.set(0, 0);
        this.acc.set(0, 0);
      }
    }
  }

  display() {
    fill(255);
    push();
    translate(this.pos.x, this.pos.y);
    rectMode(CENTER);
    rect(0, 0, 20, 40);
    pop();
  }
}
