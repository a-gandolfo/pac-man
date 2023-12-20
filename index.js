const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

class Boundary{
    static width = 40;
    static height = 40;
    constructor({ position }){
        this.position = position
        this.width = 40;
        this.height = 40;
    }
    draw(){
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    };
};

class Player{
    constructor({
        position,
        speed
    }){
        this.position = position,
        this.speed = speed,
        this.radius = 15
    }
    draw(){
        context.fillStyle = 'yellow'
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        context.fill();
        context.closePath();
    }

    update(){
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }
}

const boundaries = [];

const player = new Player({
    position: {
        x: Boundary.width + Boundary.width / 2,
        y: Boundary.height + Boundary.height / 2
    },
    speed: {
        x: 0,
        y: 0
    }
})

const keys = {
    w:{
        pressed: false
    },
    a:{
        pressed: false
    },
    s:{
        pressed: false
    },
    d:{
        pressed: false
    }
}

let lastKey = '';

const map = [
    ['-', '-', '-', '-', '-', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', ' ', '-', '-', ' ', '-'],
    ['-', ' ', ' ', ' ', ' ', '-'],
    ['-', '-', '-', '-', '-', '-']
];

map.forEach((row, i) => {
    row.forEach(( symbol, j ) => {
        switch(symbol){
            case '-':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    }
                })
            )
                break;
        }
    })
});



function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height);
    boundaries.forEach((boundary) =>{
        boundary.draw();
        if(
            player.position.y - player.radius + player.speed.y <= boundary.position.y + boundary.height
            && 
            player.position.x + player.radius + player.speed.x >= boundary.position.x
            && 
            player.position.y + player.radius + player.speed.y >= boundary.position.y
            && 
            player.position.x - player.radius + player.speed.x <= boundary.position.x + boundary.width
        ){
            console.log('COLIDED'); 
            player.speed.x = 0;
            player.speed.y = 0;
        }
    });
    player.update();
    // player.speed.y = 0;
    // player.speed.x = 0;

    if(keys.w.pressed && lastKey === 'w'){
        player.speed.y = -5;
    }
    else if(keys.a.pressed && lastKey === 'a'){
        player.speed.x = -5;
    }
    else if(keys.d.pressed && lastKey === 'd'){
        player.speed.x = 5;
    }
    else if(keys.s.pressed && lastKey === 's'){
        player.speed.y = 5;
    }
}

animate();

window.addEventListener('keydown', ({ key }) =>{
    switch (key){
        case 'w':
            keys.w.pressed = true
            lastKey = 'w'
            break;
        case 'a':
            keys.a.pressed = true
            lastKey = 'a'
            break;
        case 's':
            keys.s.pressed = true
            lastKey = 's'
            break;
        case 'd':
            keys.d.pressed = true
            lastKey = 'd'
            break;
    }
    console.log(player.speed)
})

window.addEventListener('keyup', ({ key }) =>{
    switch (key){
        case 'w':
            keys.w.pressed = false
        break;
        case 'a':
            keys.a.pressed = false
        break;
        case 's':
            keys.s.pressed = false
        break;
        case 'd':
            keys.d.pressed = false
        break;
    }
    console.log(player.speed)
})