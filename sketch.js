let y;
let bullets = [];
let enemies = [];
let score = 0;
let spawnTimer = 0;
let spawnInterval;

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
}

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

function displayBullets() {
  fill(255, 255, 0);
  for (let bullet of bullets) {
    ellipse(bullet.x, bullet.y, 10, 10);
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
  let enemyX = width;
  let enemyY = random(height);
  enemies.push({ x: enemyX, y: enemyY });
}
