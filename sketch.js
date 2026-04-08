// sketch.js
// Ribs / Water Surface
// Niki Patino — Texts & Technology, Exercise Eleven

// Werner/Schorr palette (The Color of Water, 2019-2020)
// Color mapped to depth (y-position)
const depthColors = [
  [245, 240, 232], // surface: tin white / warm white
  [237, 232, 216], // near surface: pale gold
  [184, 212, 200], // shallow: verdigris / pale celadon
  [159, 196, 180], // shallow-mid
  [106, 159, 175], // mid: cool teal
  [90, 138, 152],  // mid-deep: iron blue
  [50, 80, 100],   // deep: dark slate
  [26, 48, 64],    // deep: blackish blue-green
  [13, 32, 48],    // abyss
];

let particles = [];
let corpusIndex = 0;
let spineX;
let spawnTimer = 0;
let spawnInterval = 90; // frames between new particles

function setup() {
  createCanvas(windowWidth, windowHeight);
  spineX = width / 2;
  textFont('Georgia');
  textSize(13);
  background(8, 12, 18);
}

function draw() {
  // Fade background slowly — deep water dark
  background(8, 12, 18, 18);

  drawSpine();
  spawnParticles();
  updateAndDrawParticles();
}

function drawSpine() {
  // Oscillating vertical band of light — sun on water surface
  let t = frameCount * 0.018;

  // Draw multiple overlapping soft vertical bands
  for (let i = 0; i < 6; i++) {
    let offset = sin(t + i * 0.4) * 14;
    let x = spineX + offset;
    let w = 18 + sin(t * 1.3 + i) * 6;

    // Warm white-gold palette for spine, shifts slowly
    let r = 230 + sin(t * 0.3) * 20;
    let g = 218 + sin(t * 0.2 + 1) * 15;
    let b = 180 + sin(t * 0.4 + 2) * 30;
    let a = (28 - i * 4) + sin(t * 0.7 + i) * 6;

    noStroke();
    fill(r, g, b, a);
    rectMode(CENTER);
    rect(x, height / 2, w, height, w / 2);
  }

  // Bright center flicker
  let cx = spineX + sin(t * 2.1) * 6;
  let ca = 35 + sin(t * 3) * 12;
  fill(255, 248, 225, ca);
  rect(cx, height / 2, 5, height, 3);
}

function spawnParticles() {
  spawnTimer++;
  if (spawnTimer >= spawnInterval) {
    spawnTimer = 0;
    spawnInterval = int(random(60, 130));

    // Spawn from spine with slight horizontal variation
    let spawnX = spineX + random(-20, 20);
    let spawnY = random(height * 0.08, height * 0.25); // start near surface

    let line = corpus[corpusIndex % corpus.length];
    corpusIndex++;

    particles.push(new RibParticle(spawnX, spawnY, line));
  }
}

function updateAndDrawParticles() {
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].isDead()) {
      particles.splice(i, 1);
    }
  }
}

class RibParticle {
  constructor(x, y, txt) {
    this.x = x;
    this.y = y;
    this.txt = txt;

    // Fall speed — varies so some sink faster
    this.vy = random(0.35, 1.0);

    // Gentle horizontal drift — water resistance, slight current
    this.vx = random(-0.25, 0.25);

    // Slow rotation — object turning in water
    this.angle = random(-0.08, 0.08);
    this.rotSpeed = random(-0.0008, 0.0008);

    // Horizontal rib length — extends from center
    this.ribLength = random(40, 140);
    this.ribSide = random() > 0.5 ? 1 : -1; // which side the rib extends

    this.alpha = 0; // fades in at surface
    this.born = frameCount;
    this.lifespan = random(420, 700);
  }

  update() {
    this.y += this.vy;
    this.x += this.vx;
    this.angle += this.rotSpeed;

    // Fade in near surface, fade out at depth and end of life
    let age = frameCount - this.born;
    let lifeFraction = age / this.lifespan;
    let depthFraction = this.y / height;

    // Alpha: fade in over first 40 frames, hold, then fade with depth
    let fadeIn = min(1, age / 40);
    let fadeDepth = 1 - depthFraction * 1.1;
    let fadeAge = lifeFraction < 0.7 ? 1 : map(lifeFraction, 0.7, 1, 1, 0);

    this.alpha = 255 * fadeIn * max(0, fadeDepth) * fadeAge;
  }

  getDepthColor() {
    // Map y to depth color palette
    let t = constrain(this.y / height, 0, 1);
    let idx = t * (depthColors.length - 1);
    let i = floor(idx);
    let f = idx - i;
    if (i >= depthColors.length - 1) return depthColors[depthColors.length - 1];
    let c0 = depthColors[i];
    let c1 = depthColors[i + 1];
    return [
      lerp(c0[0], c1[0], f),
      lerp(c0[1], c1[1], f),
      lerp(c0[2], c1[2], f),
    ];
  }

  draw() {
    let col = this.getDepthColor();
    push();
    translate(this.x, this.y);
    rotate(this.angle);

    // Draw rib line (horizontal, extends to one side)
    let ribEnd = this.ribLength * this.ribSide;
    stroke(col[0], col[1], col[2], this.alpha * 0.35);
    strokeWeight(0.5);
    line(0, 0, ribEnd, 0);

    // Draw text along the rib
    noStroke();
    fill(col[0], col[1], col[2], this.alpha);
    textSize(11 + (1 - this.y / height) * 3); // slightly larger near surface
    textAlign(this.ribSide > 0 ? LEFT : RIGHT);
    text(this.txt, this.ribSide * 8, 4);

    pop();
  }

  isDead() {
    let age = frameCount - this.born;
    return this.y > height + 40 || age > this.lifespan;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  spineX = width / 2;
}
