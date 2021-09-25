var bg,bgImg;
var player, shooterImg, shooter_shooting;
var zombie,zombieImg;
var bullet,bulletImg;
var bulletGroup,zombieGroup;
var PLAY=1;
var END=0;
var gameState=PLAY;
var score=0;
var life=2;
var heart,heart3Img,heart2Img,heart1Img;
var PAUSE=2;
var ghost,ghostImg;
var sound,voice;
var gameOver,gameOverImg;

function preload(){
  
  shooterImg = loadImage("assets/shooter_2.png")
  shooter_shooting = loadImage("assets/shooter_3.png")
  zombieImg=loadImage("assets/zombie.png")
  bgImg = loadImage("assets/bg.jpeg")
  bulletImg=loadImage("assets/bullet.png");
  heart3Img=loadImage("assets/heart_3.png");
  heart2Img=loadImage("assets/heart_2.png");
  heart1Img=loadImage("assets/heart_1.png");
  ghostImg=loadImage("assets/ghost.png");
  voice=loadSound("assets/lose.mp3");
  sound=loadSound("assets/explosion.mp3");
  gameOverImg=loadImage("assets/game over.jpg")
}

function setup() {

  
  createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,displayHeight/2-40,20,20)
bg.addImage(bgImg)
bg.scale = 1.1
  
bulletGroup=new Group();
zombieGroup=new Group();


//creating the player sprite
player = createSprite(displayWidth-1150, displayHeight-300, 50, 50);
 player.addImage(shooterImg)
   player.scale = 0.3
   player.debug = false;
   player.setCollider("rectangle",0,0,300,300)
   scoreBoard=createElement("h3");
   heartBoard=createElement("h3");
   ghost=createSprite(player.x,player.y+50);
   heart=createSprite(width/2+200,75);
   heart.addImage(heart2Img);
   heart.scale=0.2
}

function draw() {

  background(0); 
  
  scoreBoard.html("score="+score);
  scoreBoard.position(width/2,50);

  heartBoard.html("life=");
  heartBoard.position(width/2+100,50);

  if(gameState===PLAY){
  enemies();
  ghost.destroy();
if(bulletGroup.isTouching(zombieGroup)){
  zombieGroup.destroyEach();
  bulletGroup.destroyEach();
}
if(life===0){
  gameState=END
}
if(player.isTouching(zombieGroup)){

   gameState=PAUSE;
  
}

  //moving the player up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  player.y = player.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 player.y = player.y+30
}
if(keyDown("RIGHT_ARROW")){
  player.x+=10;
}
if(keyDown("LEFT_ARROW")){
  player.x-=10;
}

//release bullets and change the image of shooter to shooting position when space is pressed
if(keyWentDown("space")){
 
  player.addImage(shooter_shooting)
  Bullet();
}

//player goes back to original standing image once we stop pressing the space bar
else if(keyWentUp("space")){
  player.addImage(shooterImg)
}
  }
   if(gameState=== END){
  zombieGroup.setVelocityXEach(0);
  sound.play();
   gameOver=createSprite(windowWidth/2,windowHeight/2);
   gameOver.addImage(gameOverImg);
   gameOver.scale=2.2
  }
  if(gameState=== PAUSE){
    life-=1;
    heart.addImage(heart1Img);
    zombieGroup.destroyEach();
   
    ghost.addImage(ghostImg);

    gameState=PLAY
    }

drawSprites();

}
function enemies(){
  if(frameCount%150===0){
  zombie=createSprite(windowWidth,player.y)
  zombie.addImage(zombieImg);
  zombie.scale=0.2;
  zombie.velocityX=-8;
  zombieGroup.add(zombie);
  }
}
function Bullet(){
  bullet=createSprite(player.x,player.y);
  bullet.addImage(bulletImg);
  bullet.scale=0.2;
  bullet.velocityX=4;
  bulletGroup.add(bullet);
}
