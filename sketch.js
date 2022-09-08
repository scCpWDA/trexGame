
var trex ,trex_running;
var ground;
var groundImg
var invisibleGround;
var cloud;
var cloudImg;
var cacto;
var cacto1, cacto2, cacto3, cacto4, cacto5, cacto6;
var score=0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var obstacleGroup;
var cloudGroup;
var restart,restartImg;
var gameOver,gameOverImg;
var trexCollided;
var dieSound,checkpointSound,jumpSound

function preload(){//carregar imagens
 trex_running=loadAnimation("trex1.png","trex3.png","trex4.png");
groundImg=loadImage("ground2.png");
cloudImg=loadImage("cloud.png");
cacto1=loadImage("obstacle1.png");
cacto2=loadImage("obstacle2.png");
cacto3=loadImage("obstacle3.png");
cacto4=loadImage("obstacle4.png");
cacto5=loadImage("obstacle5.png");
cacto6=loadImage("obstacle6.png");
restartImg=loadImage("restart.png");
gameOverImg=loadImage("gameOver.png");
trexCollided=loadAnimation("trex_collided.png");
dieSound=loadSound("die.mp3");
checkpointSound=loadSound("checkpoint.mp3");
jumpSound=loadSound("jump.mp3");
}

function setup(){
  createCanvas(windowWidth, windowHeight);
  
  trex=createSprite(50,540,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided", trexCollided);
  trex.scale = 0.5
 ground=createSprite(200,530,400,20);

 ground.addImage(groundImg);
 invisibleGround=createSprite(200,550,400,20);
 invisibleGround.visible = false;
 obstacleGroup = new Group;
 cloudGroup = new Group;
 restart=createSprite(650,300);
 restart.scale=0.8
 restart.addImage(restartImg);
 gameOver=createSprite(650,250);
 
 gameOver.addImage(gameOverImg);
 
}

function draw(){
  background(128);//criar fundo
  if(gameState==PLAY){
    gameOver.visible= false;
    restart.visible = false;
    if(touches.length>0||keyDown("space") && trex.y >= 500){
      trex.velocityY=-10;
jumpSound.play();
touches=[];
    }
 
    
    julietteCreation();
    cloudCreation();
    if(ground.x<0){
      ground.x=ground.width/2;
   
    }
    score=score+Math.round(getFrameRate() / 60);
    trex.velocityY = trex.velocityY + 0.8;
  ground.velocityX=-(10+score/1000);
  if(score>0 && score%100===0){
    checkpointSound.play();
   }
  if(obstacleGroup.isTouching(trex)){
    gameState = END;
    dieSound.play();
  }
  }
 if(gameState==END){
  gameOver.visible= true;
  restart.visible = true;
  ground.velocityX=0;
  obstacleGroup.setVelocityXEach(0);
  cloudGroup.setVelocityXEach(0);
  trex.changeAnimation("collided");
  obstacleGroup.setLifetimeEach(-1);
  cloudGroup.setLifetimeEach(-1);
  trex.velocityY=0;
  if(touches.length>0||mousePressedOver(restart)|| keyDown("space")){
    reset();
    touches=[];
  }
 }
 fill("black");
    text("score:" + score,1000,350);
    
 trex.collide(invisibleGround);
 

drawSprites();
}
function cloudCreation(){
  if(frameCount % 60==0){
  cloud=createSprite(1370,200,40,10);
cloud.velocityX=-(6+score/100);
cloud.addImage(cloudImg);
cloud.scale=0.4;
cloud.y=Math.round(random(360,480));
cloud.depth=trex.depth;
trex.depth=trex.depth+1;
cloud.lifetime=1410;
cloudGroup.add(cloud);

  }
}
function reset(){
 gameState= PLAY
 cloudGroup.destroyEach();
 obstacleGroup.destroyEach(); 
trex.changeAnimation("running");
score=0;
}
function julietteCreation(){
  if(frameCount % 60==0){
  cacto=createSprite(1370,520,40,10);
  cacto.velocityX=-(8+score/100);
  var sorteio = Math.round(random(1,6));
  switch(sorteio){//de acordo com o numero sorteado, colocar um obstaculo diferente
    case 1:cacto.addImage(cacto1);
    break;
    case 2:cacto.addImage(cacto2);
    break;
    case 3:cacto.addImage(cacto3);
    break;
      case 4:cacto.addImage(cacto4);
      break;
      case 5:cacto.addImage(cacto5);
      break;
      case 6:cacto.addImage(cacto6);
      break;
      default:break;
  }
  cacto.scale=0.5000000000000000000;
  cacto.lifetime=1410;//tempo que o cacto vai ficar vivo
  obstacleGroup.add(cacto);
}
}