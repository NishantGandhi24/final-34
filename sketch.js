const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;

let bombImg,coinImg,happyImg,sadImg,stoneImg,walkingImg,backgroundImg;
var person,bomb,coin,stone;
var stoneG;
var score = 0;
var coinS,muteImg,bg_sound,bombS;
var engine,body;


function preload(){
  bombImg = loadImage("bomb.png");
  coinImg = loadImage("coin.png");
  happyImg = loadImage("happy.png");
  sadImg = loadImage("sad.png");
  stoneImg = loadImage("stone.png");
  walkingImg = loadImage("walking.png");
  backgroundImg = loadImage("nature.jpg");
  coinS = loadSound("coin collection.mp3");
  bg_sound = loadSound("sound1.mp3");
  bombS = loadSound("bomb-explosion.mp3")
 }

function setup() {

 var isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  if(isMobile){
    canW = displayWidth; 
    canH = displayHeight; 
    createCanvas(displayWidth+80, displayHeight);
  } 
  else {
    canW = windowWidth; 
    canH = windowHeight; 
    createCanvas(windowWidth, windowHeight);
  }
  bg_sound.play()
  bg_sound.setVolume(0.5)
 
  ground = new Ground(500,690,2130,20);
  ground1 = new Ground(10,270,20,500);
  ground2 = new Ground(990,270,20,500);
  
  engine = Engine.create();
  world = engine.world;

 person = createSprite(600,610,40,40);
 person.addImage("walking",walkingImg);
 person.scale = 1.5;
 person.addImage("happy",happyImg);
 person.addImage("sad",sadImg);
 person.changeImage("walking",walkingImg);

var mute = createImg("mute.png");
mute.position(10,60);
mute.size(50,50)
mute.mouseClicked(MUTE);

stoneG = createGroup();
coinG = createGroup();
bombG = createGroup();  
}

function draw() 
{
  background(51);
  Engine.update(engine);
  image(backgroundImg,0,0,1700,700);
  person.changeImage("walking",walkingImg);

  ground.display();
  
if(person.x>width/2+800){
   person.x=width/2+800;
 }
if(person.x<width/2-800){
  person.x=width/2-800;
}

if(keyDown(RIGHT_ARROW)){
    person.x = person.x+10
  }
if(keyDown(LEFT_ARROW)){
    person.x = person.x-10;
  }

if(stoneG.isTouching(person)){
    stoneG.destroyEach()
    person.changeImage("sad",sadImg);
    }

if(bombG.isTouching(person)){
      bombG.destroyEach()
      person.changeImage("sad",sadImg);
      gameOver()
      bg_sound.stop();
      bombS.play();
     }
    
if(coinG.isTouching(person)){
   coinG.destroyEach()
   person.changeImage("happy",happyImg);
   score = score+10;
   coinS.play();
  }
  
var rand=Math.round(random(1,2,3))
  if(rand===1){
    spawnCoins();
  }
  else if(rand===2){
    spawnBombs();
  }
  else{
    spawnStones();
  }

  drawSprites(); 
  textSize(45);
  text("Score:"+score,10,50)
}

function spawnStones(){
  if(frameCount%100===0){
  stone = createSprite(100,60,30,30);
  stone.addImage("stone",stoneImg);
  stone.x = Math.round(random(10,1100))
  stone.scale=0.2;
  stone.velocityY=5;
  stone.lifetime = 100;
  stoneG.add(stone)
}}

function spawnCoins(){
  if(frameCount%100===0){
  coin = createSprite(200,100,40,40);
  coin.addImage("coin",coinImg);
  coin.x = Math.round(random(10,1100));
  coin.velocityY = 5;
  coin.scale=0.3;
  coin.lifetime = 100;
  coinG.add(coin);
  }}

function spawnBombs(){
  if(frameCount%100===0){
    bomb = createSprite(200,100,20,20);
    bomb.addImage("bomb",bombImg);   
  bomb.x = Math.round(random(10,1100));
  bomb.velocityY = 5;
  bomb.scale = 0.4;
  bomb.lifetime =100;
  bombG.add(bomb);
  }}

function MUTE(){
  if(bg_sound.isPlaying()){
    bg_sound.stop()
  }
  else{
    bg_sound.play();
  }}

function gameOver() {
  swal({
    title: `Game Over`,
    text: "Oops you lost ....!!!",
    imageUrl:
      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
    imageSize: "100x100",
    confirmButtonText: "Try Again"
  });
  bg_sound.play();
  score = 0;
  }