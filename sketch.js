var girl,girl_Img;
var rockSound;
var ground,groundImg;
var score;
var Play = 1;
var end = 0;
var gameState  = Play;
var obstacle,obstacleImg,obstaclesGroup;

var girldead,girldeadImg;

function preload(){
 
girl_Img = loadAnimation("runner1.png","runner2.png","runner3.png","runner4 .png","runner5.png","runner6.png");
rockSound = loadSound("rocking.mp3");
groundImg = loadImage("Ground1.jpg");
obstacleImg = loadImage("obstacle.png");

girldeadImg = loadImage("runner1.png");

}


function setup(){
  
  createCanvas(500, 300);
  
  
  girl = createSprite(70,220,20,20);
  girl.addAnimation("runner",girl_Img);
  girl.scale = 0.5;

  rockSound.play();

  ground = createSprite(100,380,300,20);
  ground.addAnimation("moving",groundImg);
  ground.velocityX = -10;
  ground.x = ground.width/2;
  
  obstacle = createSprite(200,270,300,20);
  obstacle.addAnimation("moving",obstacleImg);
  obstacle.scale = 0.1;
  obstacle.velocityX = -5;
  obstaclesGroup = createGroup();


}

function draw() {
  background("pink");
  
  text("Score: "+ score, 300,50);

  if (ground.x < 0){
    ground.x = ground.width/2;
 }
 
 if(keyDown("space")&& girl.y >= 150) {
  girl.velocityY = -12;
  
}



if(gameState === Play){

  score = score + Math.round(getFrameRate()/60);
  
  if(score>0 && score%100 === 0){
     checkPointSound.play() 
  }

  if(obstaclesGroup.isTouching(girl)){
  gameState = end;
}
}

else if (gameState === end) {
 
girl.changeAnimation("runner",girldead);
ground.velocityX = 0;
girl.velocityY = 0
obstaclesGroup.setLifetimeEach(-1);
obstaclesGroup.setVelocityXEach(0);
 
}
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }

 girl.collide(ground);

 girl.velocityY = girl.velocityY + 0.8;

 spawnobstacles();

  drawSprites();
}


function spawnobstacles() {
 
  if (frameCount % 60 === 0) {
    obstacle = createSprite(550,270,300,20);
    obstacle.X = Math.round(random(1,6));
    obstacle.addImage(obstacleImg);
    obstacle.scale = 0.1;
    obstacle.velocityX = -5;
    obstacle.lifetime = 150;
   obstaclesGroup.add(obstacle);
    }
}
              