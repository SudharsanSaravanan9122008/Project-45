var player, playerImageRight, playerImageLeft, playerDeadRightImage, playerDeadLeftImage;
var zombieRightImage, zombieLeftImage;
var zombiesGroup;
var backgroundImage;
var zombiesGroup = [];
var bulletsGroup = [];

var PLAY = 1;
var END = 0;
var speed = 50
var bullet
var gameState = PLAY;
var playerFaceingRight = true;


function preload()
{
	playerImageLeft = loadImage('./flip/player.png');
	playerImageRight = loadImage("./player.png");

	zombieLeftImage = loadAnimation("./flip/1.png", "./flip/2.png", "./flip/3.png", "./flip/4.png", "./flip/5.png", "./flip/6.png");
	zombieRightImage = loadAnimation("./1.png", "./2.png", "./3.png", "./4.png", "./5.png", "./6.png");

	backgroundImage = loadImage("spookyNight.jpg");

	playerDeadRightImage = loadImage("playerDead.png");
	playerDeadLeftImage = loadImage("flip/playerDead.png");

}

function setup() {
	createCanvas(800, 500);

	player = createSprite(400, 450);
	player.addImage(playerImageRight);
	player.scale = 0.25;
	player.debug = true;
  
}


function draw() {
  rectMode(CENTER);
  background(backgroundImage);
  playerControl();
  if(speed > 25 && zombiesGroup.length % 50 === 0){
	speed-=5;
}
 choise = Math.round(random(1,2));
 
if(frameCount%25 === 0){
	if(choise === 1){
		spawnZombiesFromRight();
	}else{
		spawnZombiesFromLeft();
	}
}

  deathWhenTouched();
 drawSprites();
 
}
function spawnZombiesFromRight(){
	var zombie = new Zombie(zombieRightImage, true);
	zombiesGroup.push(zombie);
}
function spawnZombiesFromLeft(){
	var zombie = new Zombie(zombieLeftImage, false);
	zombiesGroup.push(zombie);
}
function deathWhenTouched(){
	for(var i = 0;i < zombiesGroup.length; i++){
		if(zombiesGroup[i].isCollidedWithPlayer()){
			player.addImage(playerDeadLeftImage);
			gameState = END;
		}
	}
	for(var i = 0; i < bulletsGroup.length; i++){
		bulletsGroup[i].checkCollisionWithZombies();
	}
}
function bulletAttackToRight(){
	var bullet = new Bullet(true, [player.x, player.y]);
	bulletsGroup.push(bullet);
}
function bulletAttackToLeft(){
	var bullet = new Bullet(false, [player.x, player.y]);
	bulletsGroup.push(bullet)
}
function playerControl(){
	if(keyDown("right") && player.x < 501){
		player.x+=2;
		player.addImage(playerImageRight);
		playerFaceingRight = true;
	}else if(keyDown("left") && player.x > 299){
		player.x-=2;
		player.addImage(playerImageLeft);
		playerFaceingRight = false;
	}else if(keyDown("up") && player.y > 369){
		player.y-=2;
	}else if(keyDown("down") && player.y < 450){
		player.y+=2;
	}
	if(keyDown("space")){
		if(playerFaceingRight === true){
			bulletAttackToRight();
		}else{
			bulletAttackToLeft();
		}
	}

	}