const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const scoreElement = document.querySelector('#score_element')

canvas.width = innerWidth;
canvas.height = innerHeight;

function createImage(src){
    const image = new Image()
    image.src = src
    return image
};

class Boundary{
    static width = 40;
    static height = 40;
    constructor({ position, image }){
        this.position = position
        this.width = 40;
        this.height = 40;
        this.image = image;
    }
    draw(){
        // context.fillStyle = 'black'
        // context.fillRect(this.position.x, this.position.y, this.width, this.height);
        // context.strokeStyle = 'blue'
        // context.strokeRect(this.position.x, this.position.y, this.width, this.height);

        context.drawImage(this.image, this.position.x, this.position.y);
    };
};

class SupPellets{
    constructor({
        position,
    }){
        this.position = position,
        this.radius = 5
    }
    draw(){
        context.fillStyle = 'khaki'
        context.beginPath()
        context.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        context.fill();
        context.closePath()
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

class Ghost{
    static velocity = 2
    constructor({
        position,
        speed,
        color = 'red'
    }){
        this.position = position,
        this.speed = speed,
        this.color = color
        this.radius = 15
        this.prevCollision = [];
        this.velocity = 2
    }
    draw(){
        context.fillStyle = this.color
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


const pellets = [];

const boundaries = []

const supPellets = []

const ghosts = [
    new Ghost({
        position: {
            x: Boundary.width * 6 + Boundary.width / 2,
            y: Boundary.height + Boundary.height / 2
    },
    speed:{
        x:Ghost.velocity,
        y:0
    },
    
}),
new Ghost({
    position: {
        x: Boundary.width * 6 + Boundary.width / 2,
        y: Boundary.height * 3 + Boundary.height / 2
},
speed:{
    x:Ghost.velocity,
    y:0,
},
color: 'pink'

})
]

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


class Pellets{
    constructor({
        position,
    }){
        this.position = position,
        this.radius = 3
    }
    draw(){
        context.fillStyle = 'white'
        context.beginPath();
        context.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI)
        context.fill();
        context.closePath();
    }
}

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
let score = 0

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', 'o', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', 'o', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', 'o', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '5', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['4', '-', '-', '-', '-', '-', '-', '-', '-', '-', '3']
  ]

map.forEach((row, i) => {
    row.forEach(( symbol, j ) => {
        switch(symbol){
            case '-':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeHorizontal.png')

                })
            )
                break;
            case '|':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeVertical.png')

                })
            )
                break;
            case '1':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner1.png')

                })
            )
                break;
            case '2':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner2.png')

                })
            )
                break;
            case '3':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner3.png')

                })
            )
                break;
            case '4':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/pipeCorner4.png')

                })
            )
                break;
            case 'b':
                boundaries.push(
                    new Boundary({position: {
                        x: Boundary.width * j,
                        y: Boundary.height * i
                    },
                    image: createImage('./img/block.png')

                })
            )
                break;
            case '[':
                boundaries.push(
                    new Boundary({
                        position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                        },
                        image: createImage('./img/capLeft.png')
                    })
                )
                break
            case ']':
                boundaries.push(
                    new Boundary({
                        position: {
                        x: j * Boundary.width,
                        y: i * Boundary.height
                        },
                        image: createImage('./img/capRight.png')
                    })
        )
                break
            case '_':
            boundaries.push(
                new Boundary({
                    position: {
                    x: j * Boundary.width,
                    y: i * Boundary.height
                    },
                    image: createImage('./img/capBottom.png')
                })
        )
                break
                case '^':
                    boundaries.push(
                      new Boundary({
                        position: {
                          x: j * Boundary.width,
                          y: i * Boundary.height
                        },
                        image: createImage('./img/capTop.png')
                      })
                    )
                    break
                    case '+':
                        boundaries.push(
                          new Boundary({
                            position: {
                              x: j * Boundary.width,
                              y: i * Boundary.height
                            },
                            image: createImage('./img/pipeCross.png')
                          })
                        )
                    break
                        case '5':
                            boundaries.push(
                              new Boundary({
                                position: {
                                  x: j * Boundary.width,
                                  y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage('./img/pipeConnectorTop.png')
                              })
                            )
                        break
                        case '6':
                            boundaries.push(
                              new Boundary({
                                position: {
                                  x: j * Boundary.width,
                                  y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage('./img/pipeConnectorRight.png')
                              })
                            )
                        break
                        case '7':
                            boundaries.push(
                              new Boundary({
                                position: {
                                  x: j * Boundary.width,
                                  y: i * Boundary.height
                                },
                                color: 'blue',
                                image: createImage('./img/pipeConnectorBottom.png')
                              })
                            )
                        break
                        case '8':
                            boundaries.push(
                              new Boundary({
                                position: {
                                  x: j * Boundary.width,
                                  y: i * Boundary.height
                                },
                                image: createImage('./img/pipeConnectorLeft.png')
                              })
                            )
                        break
                        case '.':
                            pellets.push(
                              new Pellets({
                                position: {
                                  x: j * Boundary.width + Boundary.width / 2,
                                  y: i * Boundary.height + Boundary.height / 2
                                },
                              })
                            )
                        break
                        case 'o':
                        supPellets.push(
                            new SupPellets({
                                position: {
                                    x: j * Boundary.width + Boundary.width / 2,
                                    y: i * Boundary.height + Boundary.height / 2
                                },
                            })
                        )
                        break
                        
        }
    })
});

function ballsAndRectangles({ circle, rectangle }){
    const padding = Boundary.width /2 - circle.radius - 1
    return (
        circle.position.y - circle.radius + circle.speed.y <= rectangle.position.y + rectangle.height + padding
        && 
        circle.position.x + circle.radius + circle.speed.x >= rectangle.position.x - padding
        && 
        circle.position.y + circle.radius + circle.speed.y >= rectangle.position.y - padding
        && 
        circle.position.x - circle.radius + circle.speed.x <= rectangle.position.x + rectangle.width + padding 
        )
}

let animationId;

function animate(){
    animationId = requestAnimationFrame(animate)
    context.clearRect(0, 0, canvas.width, canvas.height)

    if(keys.w.pressed && lastKey === 'w'){

        for (let i = 0; i < boundaries.length; i++){
            const boundary = boundaries[i]
        if(
            ballsAndRectangles({
            circle: { ...player, speed: {
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
            circle: { ...player, speed: {
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
            circle: { ...player, speed: {
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
                circle: { ...player, speed: {
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

    supPellets.forEach(supPellet =>{
        supPellet.draw()
    })

    pellets.forEach(pellet =>{
        pellet.draw()
    })

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
    
    
    ghosts.forEach(ghost =>{
        ghost.update();

        if(Math.hypot(ghost.position.x - player.position.x,
            ghost.position.y - player.position.y) < ghost.radius + player.radius){
                cancelAnimationFrame(animationId)
                console.log('lost bruh')
        }

        const collisions = []
        boundaries.forEach(boundary =>{
            if(
                !collisions.includes('right') &&
                ballsAndRectangles({
                circle: { ...ghost, speed: {
                    x: ghost.velocity,
                    y: 0
                }},
                rectangle: boundary
            })){
                collisions.push('right')
            }
            if(
                !collisions.includes('left') &&
                ballsAndRectangles({
                circle: { ...ghost, speed: {
                    x: -ghost.velocity,
                    y: 0
                }},
                rectangle: boundary
            })){
                collisions.push('left')
            }
            if(
                !collisions.includes('down') &&
                ballsAndRectangles({
                circle: { ...ghost, speed: {
                    x: 0,
                    y: ghost.velocity
                }},
                rectangle: boundary
            })){
                collisions.push('down')
            }
            if(
                !collisions.includes('top') &&
                ballsAndRectangles({
                circle: { ...ghost, speed: {
                    x: 0,
                    y: -ghost.velocity
                }},
                rectangle: boundary
            })){
                collisions.push('top')
            }
        })
        if(collisions.length > ghost.prevCollision.length){
            ghost.prevCollision = collisions
        }
        
        if(JSON.stringify(collisions) !== JSON.stringify(ghost.prevCollision)){
            console.log('gogo')

            console.log(collisions)
            console.log(ghost.prevCollision)
            
            if(ghost.speed.x > 0){
                ghost.prevCollision.push('right')
            }
            else if(ghost.speed.x < 0){
                ghost.prevCollision.push('left')
            }
            else if(ghost.speed.y < 0){
                ghost.prevCollision.push('top')
            }
            else if(ghost.speed.y > 0){
                ghost.prevCollision.push('down')
            }

            const pathways = ghost.prevCollision.filter(collision => {
                return !collisions.includes(collision)
            })
            console.log({pathways})

            const direction = pathways[Math.floor(Math.random() * pathways.length)]
            console.log({direction})

            switch (direction) {
                case 'down':
                ghost.speed.y = ghost.velocity
                ghost.speed.x = 0
                break;
                
                case 'top':
                ghost.speed.y = -ghost.velocity
                ghost.speed.x = 0
                break;

                case 'right':
                ghost.speed.y = 0
                ghost.speed.x = ghost.velocity
                break;

                case 'left':
                ghost.speed.y = 0
                ghost.speed.x = -ghost.velocity
                break;
            }
            ghost.prevCollision = [];
        }
    })
}

function takePellet(pellet){
    for(let i = 0; i < pellets.length; i++){
        pellet = pellets[i];
        const index = pellets.indexOf(pellet);
    
        if(Math.hypot(pellet.position.x - player.position.x,
            pellet.position.y - player.position.y) < pellet.radius + player.radius){
            if(index > -1){
                pellets.splice(index, 1);
                score += 10
                console.log('comeu')
                scoreElement.innerHTML = score
            }
        }   
    }
}

function takeSupPellet(supPellet){
    for(let i = 0; i < supPellets.length; i++){
        supPellet = supPellets[i];
        const SPPindex = supPellets.indexOf(supPellet);
    
        if(Math.hypot(supPellet.position.x - player.position.x,
            supPellet.position.y - player.position.y) < supPellet.radius + player.radius){
            if(SPPindex > -1){
                supPellets.splice(SPPindex, 1);
                score += 10
                console.log('POWER')
                scoreElement.innerHTML = score
            }
        }   
    }
}

setInterval(takePellet, 100);
setInterval(takeSupPellet, 100);

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