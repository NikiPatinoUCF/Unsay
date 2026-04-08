// Modified from Daniel Shifman - codingtra.in
particles = [];

words = [
  "Don't touch me like that.",
  "I'll be quick.",
  "Come on, chubby.",
  "If you leave me, I'll do it.",
  "It's a stupid piece of wood.",
  "You know this is over, right?",
  "I can't do this anymore.",
  "My heart's not in us.",
  "Don't let me come here anymore.",
  "I'm fine.",
  "I'm fine.",
  "Close your eyes and pretend.",
  "I already had the best part of you.",
  "He filed for divorce."
]

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background("#1D075D");
  if (random() < (sin(frameCount * 0.008) + 1) / 2 * 0.15) {
    let p = new Particle();
    particles.push(p);
  }
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].show();
    if (particles[i].finished()) {
      particles.splice(i, 1);
    }
  }
}

class Particle {
  constructor() {
    this.x = width / 2;
    this.y = height / 2;
    this.vx = random(-0.3, 0.3);
    this.vy = random(5, 1);
    this.color = random(100, 230);
    this.alpha = 255;
    this.text = random(words);
  }
  finished() {
    return this.alpha < 0;
  }
  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.alpha -= 1;
  }
  show() {
    noStroke();
    fill(255, 255, this.color, this.alpha);
    text(this.text, this.x, this.y);
  }
}
