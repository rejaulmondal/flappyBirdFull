var bg;
var bird, deadBird;
var ground;
var gameState = "play";
var pillar1Group;
var pillar2Group;
var gameOver, gameOverImg;
var birdDieImg;
var score = 0;

function preload(){
  bgImg = loadImage("sprites/city.png");
  birdAnm = loadAnimation("sprites/bluebird-downflap.png","sprites/bluebird-midflap.png",
                                       "sprites/bluebird-upflap.png");
  pillar1Img = loadImage("sprites/pipe-green-inverted.jpg");
  pillar2Img = loadImage("sprites/pipe-green.png");

  gameOverImg = loadImage("sprites/gameover.png");

  birdDieImg = loadImage("sprites/bluebird-midflap.png");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  bg = createSprite(width/2, height/2, 1920, 1080);
  bg.addImage("bgImg", bgImg);
  bg.scale = 9

  bg.setVelocity(-2,0)

  bird = createSprite(300,500,50,50);
  bird.addAnimation("birdAnm", birdAnm);
  bird.scale = 3

  ground = createSprite(960,960,1920,80);
  ground.shapeColor = "green";

  pillar1Group = new Group();
  pillar2Group = new Group();

  gameOver = createSprite(960,450,300,150);
  gameOver.addImage("gameOverImg", gameOverImg);
  gameOver.visible = false ;
  gameOver.scale = 2; 

  deadBird = createSprite(300,900,50,50);
  deadBird.addImage("birdDieImg", birdDieImg);
  deadBird.scale = 3
}

function draw() {
  background(240);
  
  if(gameState === "play"){

    deadBird.visible = false;

    if(bg.x < 0){
      bg.x = bg.width/2
    }

    bird.velocityY = bird.velocityY + 1.2;

    if(keyIsDown(UP_ARROW)){
      bird.velocityY = bird.velocityY - 3.2;
    }

    if(bird.collide(ground) && gameState === "play" || bird.isTouching(pillar1Group)|| bird.isTouching(pillar2Group)){
      bg.setVelocity(0,0);
      bird.setVelocity(0,0);
      bird.visible = false;
      gameState = "stop";
    }

    if(frameCount % 120===0){
      score = score + 1;
    }

    pillar1();
    pillar2();
 }

 if(gameState === "stop"){
   pillar1Group.setVelocityEach(0,0);
   pillar2Group.setVelocityEach(0,0);

   gameOver.visible = true ;

   deadBird.visible = true;

   if(keyWentUp(DOWN_ARROW) && gameState === "stop"){
     gameState = "play";

     bird.x = 300;
     bird.y = 450;

     bg.setVelocity(-2,0);

     bird.visible = true ;
     gameOver.visible = false ;

     score = 0;
   }
}
  drawSprites();
  textSize(50); 
  text("SCORE :" + score, 50, 50);
}

function pillar1(){
  var pillar1 = createSprite(1950,100,20,200);
  pillar1.addImage("pillar1Img", pillar1Img);
  pillar1.scale = 1.2;
  
  if(frameCount % 120===0){
    pillar1.setVelocity(-10,0);
  }

  pillar1Group.add(pillar1);
}

function pillar2(){
  var pillar2 = createSprite(1950,725,20,200);
  pillar2.addImage("pillar2Img", pillar2Img);
  pillar2.scale = 1.2;
  
  if(frameCount % 120===0){
    pillar2.setVelocity(-10,0);
  }

  pillar2Group.add(pillar2);
}