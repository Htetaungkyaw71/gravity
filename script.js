let canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

let c = canvas.getContext('2d');
var mouse = {
	x: innerWidth / 2,
	y: innerHeight / 2 
};

addEventListener("mousemove", function(event) {
	mouse.x = event.clientX;
	mouse.y = event.clientY;
});


function between(min,max){
    return Math.floor(Math.random() * (max - min + 1) + min);
}



let friction = 0.9;
let gravity = 0.5;

let colors = [
    "#FCE2DB",
    "#FF8FB1",
    "#B270A2",
    "#7A4495"
]

function Ball(x,y,radius,color,dx,dy){
    this.x = x;
    this.y = y;
    this.dy = dy;
    this.dx = dx;
    this.radius = radius;
    this.color = color

    this.draw = ()=>{
        c.beginPath()
        c.arc(this.x,this.y,this.radius,0,Math.PI * 2,false);
        c.fillStyle = this.color
        c.fill()
        c.stroke()
        c.closePath()
    }
    this.update = ()=>{
        if(this.y + this.radius + this.dy > innerHeight){
            this.dy = -this.dy
            this.dy = this.dy * friction
            this.dx = this.dx * friction
         
        }else{
            this.dy += gravity
        }
        if(this.x + this.radius >= innerWidth  || this.x - this.radius  <= 0){
            this.dx = -this.dx * friction
        }
        this.y += this.dy
        this.x += this.dx
        this.draw()
    }
}
window.addEventListener('resize',()=>{
    canvas.width = innerWidth;
    canvas.height = innerHeight;
    init();
})

window.addEventListener('click',()=>{
    init()
})



let ballArray;
function init(){
    ballArray = [];
    for(let i = 0; i < 500; i++)
    {
        let color = colors[Math.floor(Math.random() * colors.length)] 
        let radius = between(10,20);
        let dx = between(-3,3)
        let dy = between(-2,2)
        let x = between(radius,innerWidth - radius);
        let y = between(0,innerHeight - radius);  
        ballArray.push(new Ball(x,y,radius,color,dx,dy))
    }
}

function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0,0,innerWidth,innerHeight)
    for(let i = 0; i < ballArray.length; i++)
    {
        ballArray[i].update()
    }
    
}

init()
animate()