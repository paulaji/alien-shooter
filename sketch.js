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

function drawBullet(x, y) {
  push();
  translate(x, y);
  fill(255, 255, 0);
  rect(0, -2, 15, 4); // Main body (width increased from 10 to 15, height increased from 2 to 4)
  rect(0, -4, 3, 8); // Middle extension (width increased from 2 to 3, height increased from 6 to 8)
  rect(0, -7, 1.5, 14); // Outer extension (width increased from 1 to 1.5, height increased from 10 to 14)
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
