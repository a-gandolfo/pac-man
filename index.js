const canvas = document.querySelector('canvas')
const context = canvas.getContext('2d')

canvas.width = innerWidth
canvas.height = innerHeight



class Boundary{
    constructor({ position, grau, width, height}){
        this.position = position
        this.grau = grau
        this.width = width
        this.height = height
    }
    draw(){
        context.fillStyle = 'blue'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
        context.fillStyle = 'black'
        context.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}
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

const boundaries = []

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

let lastKey = ''

const map = [
    ['-', '-', '-', '-', '-', '-', '-'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', '-', ' ', '-', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['|', ' ', '-', ' ', '-', ' ', '|'],
    ['|', ' ', ' ', ' ', ' ', ' ', '|'],
    ['-', '-', '-', '-', '-', '-', '-']
]

map.forEach((row, i) => {
    row.forEach(( symbol, j ) => {
        switch(symbol){
            case '-':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                    },
                    height : 40,
                    width : 40,
                })
            )
                break
                case '|':
                boundaries.push(
                    new Boundary({
                        position: {
                            x: Boundary.width * j,
                            y: Boundary.height * i
                    },
                    grau: {

                    }
                })
            )
        }
    })
})

function ballsAndRectangles({ circle, rectangle }){
    return (
        circle.position.y - circle.radius + circle.speed.y <= rectangle.position.y + rectangle.height
        && 
        circle.position.x + circle.radius + circle.speed.x >= rectangle.position.x
        && 
        circle.position.y + circle.radius + circle.speed.y >= rectangle.position.y
        && 
        circle.position.x - circle.radius + circle.speed.x <= rectangle.position.x + rectangle.width
        )
}

function animate(){
    requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)

    if(keys.w.pressed && lastKey === 'w'){

        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
        if(
            ballsAndRectangles({
            circle: { ...player, velocity: {
                x: 0,
                y:-5
            }},
            rectangle: boundary
        })) {
            player.speed.y = 0;
            break;
        } else{
            player.speed.y = -5;
        }
    }
    } else if(keys.a.pressed && lastKey === 'a'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i];
        if(
            ballsAndRectangles({
            circle: { ...player, velocity: {
                x: -5,
                y: 0
            }},
            rectangle: boundary
        })) {
            player.speed.x = 0
            break
        } else{
            player.speed.x = -5
        }
    }
    }
    else if(keys.d.pressed && lastKey === 'd'){
        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
        if(
            ballsAndRectangles({
            circle: { ...player, velocity: {
                x: 5,
                y: 0
            }},
            rectangle: boundary
        })) {
            player.speed.x = 0;
            break;
        } else{
            player.speed.x = 5;
        }
    }
    }
    else if(keys.s.pressed && lastKey === 's'){
            for (let i = 0; i < boundaries.length; i++){
                const boundary = boundaries[i]
            if(
                ballsAndRectangles({
                circle: { ...player, velocity: {
                    x: 0,
                    y: 5
                }},
                rectangle: boundary
            })) {
                player.speed.y = 0
                break;
            } else{
                player.speed.y = 5
            }
        }
    }

    boundaries.forEach((boundary) =>{
        boundary.draw()
        if(
            ballsAndRectangles({ circle: player, rectangle: boundary })
        )

        {
            player.speed.x = 0
            player.speed.y = 0
        }
    });
    player.update()
    // player.speed.y = 0;
    // player.speed.x = 0;


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