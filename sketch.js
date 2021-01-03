var trex, trex_running, trex_collided;

var ground, invisibleGround, groundImage;


var cloudsGroup, cloudImage;

var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var scoreboard , scorebimg;

var gameOverImg,restartImg

var bground , bgroundimg;

var jumpSound , checkPointSound, dieSound

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadAnimation("trex_collided.png");
  

  scorebimg = loadImage("scoreb.png");
  
  groundImage = loadImage("ground2.png");
  
  bgroundimg = loadImage("bg.jpg");
   
  
  
  cloudImage = loadImage("cloud.png");

  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
 
  
   restartImg = loadImage("restart.png")
  gameOverImg = loadImage("gameOver.png")
  
  
  jumpSound = loadSound("jump.mp3");
  dieSound = loadSound("die.mp3");
  checkPointSound = loadSound("checkPoint.mp3");
}

function setup() {
  createCanvas(windowWidth,windowHeight );
  
  
  score = 0;
  
  
 // bground = createSprite(500,200);
 // bground = createSprite(200,200);
  //bground.addImage("bg",bgroundimg);
  
  
  
  trex = createSprite(50,height-70,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" ,trex_collided);
  trex.scale = 0.5;
  
 
  
  ground = createSprite(width/2,height-83,width,125);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.scale = 14.0 ;
  
  
  
  
   gameOver = createSprite(width/2,height/2- 50);
  gameOver.addImage(gameOverImg);
  
  
  
  restart = createSprite(width/2,height/2);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;
  
  invisibleGround = createSprite(width/2,height-10,width,125);
  invisibleGround.visible = false;
 
  
  
  obstaclesGroup = createGroup();
  cloudsGroup = createGroup();

  
 
  trex.setCollider("circle",0,0,40);
  //trex.debug = true
  
  
  
  
}

function draw() {
  
  background(bgroundimg);
  
  
  fill("red");
  textSize(20); 
  text("Score: "+ score, 500,50);
  
 
  
  
  
  
  
  if(gameState === PLAY){
    gameOver.visible = false
    restart.visible = false
    
    ground.velocityX = -(4 + 3 *score/100);
    score = score + Math.round(getFrameRate()/60);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    
    
   
    if((touches.length > 0 || keyDown("SPACE")) &&       trex.collide(invisibleGround)) {
      jumpSound.play( )
      trex.velocityY = -15;
       touches = [];
      
    }
    
  
    trex.velocityY = trex.velocityY + 0.8
    
  
    
    spawnClouds();
    
    trex.depth = ground.depth;
    trex.depth = trex.depth + 1;
    
    //score.depth = cloudsGroup.depth;
    //score.depth = score.depth + 1;
   
    
  
   
    spawnObstacles();
    
    
    
    if(obstaclesGroup.isTouching(trex)){
        gameState = END;
      dieSound.play();
     
    }
    
    
    
  if(score%100 === 0 && score>0)
  {
     checkPointSound.play();
     
   }
  }
   else if (gameState === END) {
      gameOver.visible = true;
      restart.visible = true;
     
      ground.velocityX = 0;
      trex.velocityY = 0
     
     
     
      
      trex.changeAnimation("collided", trex_collided);
     
     
   
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
     
  
     
     obstaclesGroup.setVelocityXEach(0);
     cloudsGroup.setVelocityXEach(0);
     
       if(touches.length>0 || mousePressedOver(restart)) {      
      reset();
      touches = []
    }
  
   }
  
 

  trex.collide(invisibleGround);
 
  
  

  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(600,height-95,20,30);
   obstacle.velocityX = -(4 + score/100)  ;
   

    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
              
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
   
   
    obstaclesGroup.add(obstacle);
 }
}


function spawnClouds() {
  
  if (frameCount % 60 === 0) {
     cloud = createSprite(width+20,height-300,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     
    cloud.lifetime = 300;
    
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
   
   cloudsGroup.add(cloud);
    }
}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  cloudsGroup.destroyEach();
  
  trex.changeAnimation("running",trex_running);
  
    gamestate = PLAY;
  
  score = 0;
}
  
 
  
  
