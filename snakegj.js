
foodimg=new Image();
foodimg.src="apple.png";
trophy=new Image();
trophy.src="trophy.png";
function init(){
var canvas=document.getElementById("mycanvas");
W=canvas.width=800;
H=canvas.height=700;
gameover=false;
pen=canvas.getContext('2d');
cs=66;
score=5;
food=getRandomFood();

  snake={
  	color:"yellow",
  	initiallength:5,
  	cells:[],
     direction:"right",
     createSnake:function(){
     	for(var i=this.initiallength;i>0;i--){
     		this.cells.push({x:i,y:0})
     	}
     },
     drawsnake:function(){
     	pen.clearRect(0,0,W,H)
     	for(var i=0;i<this.cells.length;i++){
     	pen.fillStyle=this.color;
     	     	pen.fillRect(this.cells[i].x*cs,this.cells[i].y*cs,cs-3,cs-3);
     	     }
     	// pen.fillStyle="yellow";
     },
     updatesnake:function(){
                          

          var headX=this.cells[0].x;
          var headY=this.cells[0].y;
          if(headX==food.x && headY==food.y)
          {
          	  food=getRandomFood();
          	  score++;
          }
          else{
          	this.cells.pop();
          }
          // var last_x,last_y;

          var nextx,nexty;
          if(this.direction=="right"){
          		nextx=headX+1;
          		nexty=headY;
          }
          else if(this.direction=="left"){
          	nextx=headX-1;
          	nexty=headY;
          }
          else if(this.direction=="up"){
          	nextx=headX;
          	nexty=headY-1;
          }
          else{
          	nextx=headX;
          	nexty=headY+1;
          }
          
          this.cells.unshift({x:nextx,y:nexty});
          last_y=Math.round(H/cs);
          last_x=Math.round(W/cs);
          if(this.cells[0].x<0 || this.cells[0].y<0 || this.cells[0].x>last_x || this.cells[0].y>last_y){
          	gameover=true;
          }
     },
  };
snake.createSnake();
  function key(e){
  	if(e.key=="ArrowRight"){
  		snake.direction="right";
  	}
  	else if(e.key=="ArrowLeft"){
  		snake.direction="left";
  	}
  	else if(e.key=="ArrowUp"){
  		snake.direction="up";
  	}
  	else{
  		snake.direction="down";
  	}
	console.log(snake.direction);
}
document.addEventListener('keydown',key);
}


function draw(){
   pen.clearRect(0,0,W,H);
   snake.drawsnake();
   pen.fillStyle=food.color;
   pen.drawImage(foodimg,food.x*cs,food.y*cs,cs,cs);
   pen.drawImage(trophy,18,20);
   pen.fillStyle="red";
   pen.font="20pt Roboto";
   pen.fillText(score,50,50,cs,cs);
}
function update(){
snake.updatesnake();
}
function getRandomFood(){
	 var food_x=Math.round(Math.random()*(W-cs)/cs);
	  var food_y=Math.round(Math.random()*(H-cs)/cs);

	var food={
		x:food_x,
		y:food_y,
		color:"red",
	}
	return food;
}
function gameloop(){
	if(gameover==true){
		clearInterval(f);
		alert("Gameover");
		return;
	}
	draw();
	update();

}
init();
var f=setInterval(gameloop,100);