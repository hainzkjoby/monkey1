var PLAY = 1;
var END = 0;
var gameState = PLAY;

var ground;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score=0;

function preload(){

  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  
  var survivalTime=0;

}

function setup() {
  createCanvas(400,400);

  //creating ground
  ground=createSprite(200,380,900,10);
  ground.velocityX=-4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  //creating monkey
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale=0.1;
  
  //creating each group
  obstacleGroup = new Group();
  FoodGroup = new Group();
  
}


function draw() {
  background(255);

  if(gameState===PLAY){
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  //jump when space is pressed
  if(keyDown("space")&& monkey.y >= 100) {
        monkey.velocityY = -12;
    }
    
    //add gravity
    monkey.velocityY = monkey.velocityY + 0.8
  
    //making collide with ground
    monkey.collide(ground);
    
    //calling objects
    spawnObstacles();
    spawnFood();
    
    if(FoodGroup.isTouching(monkey)){
      FoodGroup.destroyEach();
      score=score+1;
      gameState = PLAY;
      
      switch(score){
      case 10: monkey.scale=0.12;
        break;
      case 20: monkey.scale=0.14;
        break;
      case 30: monkey.scale=0.16;
        break
      case 40: monkey.scale=0.18;
        break
      default:break;
    }
     }
    
  if(obstacleGroup.isTouching(monkey)){
      monkey.scale=0.1;
      score=0;
     gameState=PLAY;
    }
    
  }
  else if(gameState===END){
    
    //set velcity of each game object to 0
    ground.velocityX = 0;
    monkey.velocityY = 0;
    
  //setting lifetime and velocity to each
   obstacleGroup.setLifetimeEach(-1);
   FoodGroup.setLifetimeEach(-1);
    
   obstacleGroup.setVelocityXEach(0);
   FoodGroup.setVelocityXEach(0); 
    
  }
  
  drawSprites();
  
  stroke("black");
  textSize(15);
  fill("black");
  text("score:"+ score, 300, 50);
  
  textSize(20);
  fill("black");
  survivalTime=Math.ceil(frameCount/frameRate())
  text("survivalTime:"+ survivalTime, 100,50);
  
}
function spawnFood() {
  if(frameCount%110===0){
  banana=createSprite(400,70,20,20);
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.velocityX = -3;
  banana.scale=0.1;
    
  banana.depth = monkey.depth;
  monkey.depth = monkey.depth + 1;
    
  banana.lifetime = 130;
    
  //banana.debug=true;
  
 FoodGroup.add(banana)
    
  }
}

function spawnObstacles() {
  if(frameCount%300===0){
  obstacle=createSprite(300,310,20,20);
  obstacle.y = Math.round(random(340,340));
  obstacle.addImage(obstacleImage);
  obstacle.velocityX = -3;
  obstacle.scale=0.2;
    
  obstacle.setCollider("circle",0,0,210);
  //obstacle.debug=true;
  
  obstacle.lifetime = 130;
  
  obstacleGroup.add(obstacle)
  
}
 }