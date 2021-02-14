var ball
var speed = 6
var dash = false
var dashC = [0, 0]
var dashT = 10
var dashT2 = 20
var dashR = false
var ballP = [[], []]
var health = 100

function setup() {
  createCanvas(800,800);
  ball = createSprite(400, 400, 50, 50)
  enemyG = createGroup()
  
  edges = createEdgeSprites()
  laser = createSprite(400, 0, 800, 50)

  bar = createSprite(400, 750, 600, 50)
  bar.shapeColor = "crimson"

  barD = createSprite(400, 700, 200, 10)
  barD.shapeColor = "blue"
  barD.destroy()

  spin = createSprite(400, 400, 800, 50)
  spin.visible = 0

  spin2 = createSprite(400, 400, 50, 800)
  spin2.visible = 0

  enemyG.add(laser)
}

function draw() {
  background("grey"); 

  fill("lightblue")
  noStroke()
  rectMode(CENTER)
  rect(400, 750, 620, 70)
  
  addEnemy()



  

  ball.velocityY = 0
  ball.velocityX = 0
if(dash === false){

if(keyDown("a")){
  ball.velocityX = -speed
  dashC[0] = -speed
}

if(keyDown("d")){
  ball.velocityX = speed
  dashC[0] = speed
}

if(keyDown("w")){
  ball.velocityY = -speed 
  dashC[1] = -speed
}

if(keyDown("s")){
  ball.velocityY = speed 
  dashC[1] = speed
}


if(keyWentUp("s")){
  dashC[1] = 0
}
if(keyWentUp("w")){
  dashC[1] = 0
}
if(keyWentUp("a")){
  dashC[0] = 0
}
if(keyWentUp("d")){
  dashC[0] = 0
}

dashT2 += 1
barD.width = dashT2*3

barD.x = ball.x
barD.y = ball.y + 40

ball.shapeColor = rgb(0, 0, dashT2*20)

}
if(dash === true){
  ball.velocityX = dashC[0] * 2
  ball.velocityY = dashC[1] * 2
  dashT -= 1
  if(dashT <= 0){
    dash = false
    dashT = 10
  }
}

if(keyDown(" ") && dashT2 >= 20){
  dash = true
  dashT2 = 0
}

ball.collide(edges)

ballP[1].push(ball.y)
ballP[0].push(ball.x)

console.log(dash)


    if(enemyG.isTouching(ball) && dash === false){
      ball.shapeColor = "red"
      health -= 5
      push()
      translate(100, 750)
      bar.width = health*6
      pop()
    }

    if(health <= 0){
      health = 0
    }

  drawSprites();
}

function addEnemy(){
  if(frameCount % 60 == 0 && frameCount < 500){

    rand = Math.round(random(1,2))
    switch(rand){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(820, i, 50, 10)
      enemyG.add(enemy)
      enemy.velocityX = -15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }

    rand2 = Math.round(random(1,2))

    switch(rand2){

    case 1: for(var i = 50; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break

    case 2: for(var i = 70; i < height; i += 150){
      enemy = createSprite(i, -20, 10, 50)
      enemyG.add(enemy)
      enemy.velocityY = 15
      enemy.shapeColor = "red"
      enemy.lifetime = 50
    }
    break
    
    }
    
    
  }

  if(frameCount > 100 && frameCount < 500){

    laser.shapeColor = "red"
    for(i = 0; i < ballP[1].length; i++){
    laser.y = ballP[1][i - 20]
    }
  }

  if(frameCount > 500){
    laser.lifetime = 0
  }



  if(frameCount > 500 && frameCount < 1200){
    
    
    spin.rotation += 2
    enemyG.add(spin)
    spin.visible = 1
    spin.shapeColor = "red"

    spin2.rotation += 2
    enemyG.add(spin2)
    spin2.visible = 1
    spin2.shapeColor = "red"
    
  }
  } 

  function keyPressed(){
    if(keyCode === 49){
      frameCount = 0
    }
    if(keyCode === 50){
      frameCount = 500
    }
    if(keyCode === 51){
      frameCount = 1200
    }
    
  }


