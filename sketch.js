let y;
let bullets = [];
let enemies = [];
let score = 0;
let spawnTimer = 0;
let spawnInterval;
let heartSize = 20;
let heartBeat = 0;

function setup() {
  createCanvas(windowWidth, windowHeight);
  y = height / 2;
  spawnInterval = random(50, 150);
}

function draw() {
  background(0);
  handleInput();
  drawSpacecraft(100, y);
  updateBullets();
  displayBullets();
  updateEnemies();
  displayEnemies();
  checkCollisions();
  handleSpawning();

  // Draw three hearts in the top right
  noStroke();
  fill(255, 0, 0);

  // Pulse the hearts
  heartSize = 20 + 5 * Math.sin(heartBeat);
  heartBeat += 0.1;

  let heartX = width - 80;
  let heartY1 = height * 0.1;
  let heartY2 = height * 0.2;
  let heartY3 = height * 0.3;

  drawHeart(heartX - 40, heartY1, heartSize);
  drawHeart(heartX, heartY2, heartSize);
  drawHeart(heartX + 40, heartY3, heartSize);
}

function drawHeart(x, y, size) {
  beginShape();
  vertex(x, y + size / 4);
  bezierVertex(x, y - size / 2, x + size, y - size / 2, x + size, y + size / 4);
  bezierVertex(x + size, y + size, x, y + size * 1.5, x, y + size / 4);
  endShape(CLOSE);
}

// function drawHeart(x, y, size) {
//   push();
//   translate(x, y);
//   scale(size / 20);

//   beginShape();
//   vertex(0, -15);
//   bezierVertex(-10, -25, -20, -5, 0, 20);
//   bezierVertex(20, -5, 10, -25, 0, -15);
//   endShape(CLOSE);

//   pop();
// }

function drawSpacecraft(x, y) {
  push();
  translate(x, y);
  fill(200);
  ellipse(0, 0, 60, 30);
  fill(255, 0, 0);
  triangle(-30, -15, -30, 15, -50, 0);
  fill(100);
  rect(-20, -20, 20, 40);
  pop();
}

function handleInput() {
  if (keyIsDown(UP_ARROW)) {
    y -= 5;
  }
  if (keyIsDown(DOWN_ARROW)) {
    y += 5;
  }
}

function keyPressed() {
  if (key === " ") {
    bullets.push({ x: 110, y: y });
  }
}

function updateBullets() {
  for (let bullet of bullets) {
    bullet.x += 5;
  }
}

function drawBullet(x, y) {
  push();
  translate(x, y);
  fill(255, 255, 0);
  rect(0, -3, 20, 6); // Main body (width increased from 15 to 20, height increased from 4 to 6)
  rect(0, -6, 4, 12); // Middle extension (width increased from 3 to 4, height increased from 8 to 12)
  rect(0, -10, 2, 20); // Outer extension (width increased from 1.5 to 2, height increased from 14 to 20)
  pop();
}

function displayBullets() {
  for (let bullet of bullets) {
    drawBullet(bullet.x, bullet.y);
  }
}

function updateEnemies() {
  for (let enemy of enemies) {
    enemy.x -= 2;
  }
}

function drawAlien(x, y) {
  push();
  translate(x, y);
  fill(0, 255, 0);
  ellipse(0, 0, 30, 30);
  ellipse(-15, 15, 10, 10);
  ellipse(15, 15, 10, 10);
  fill(255);
  ellipse(-7, -5, 8, 8);
  ellipse(7, -5, 8, 8);
  fill(0);
  ellipse(-7, -5, 3, 3);
  ellipse(7, -5, 3, 3);
  pop();
}

function displayEnemies() {
  for (let enemy of enemies) {
    drawAlien(enemy.x, enemy.y);
  }
}

function checkCollisions() {
  for (let i = bullets.length - 1; i >= 0; i--) {
    for (let j = enemies.length - 1; j >= 0; j--) {
      let d = dist(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y);
      if (d < 25) {
        enemies.splice(j, 1);
        bullets.splice(i, 1);
        break;
      }
    }
  }
}

function handleSpawning() {
  spawnTimer++;
  if (spawnTimer > spawnInterval) {
    spawnEnemy();
    spawnTimer = 0;
    spawnInterval = random(50, 150);
  }
}

function spawnEnemy() {
  let enemyY = random(30, height - 30);
  enemies.push({ x: width, y: enemyY });
}
