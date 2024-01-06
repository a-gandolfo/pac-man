const canvas = document.querySelector('canvas');
const context = canvas.getContext('2d');
const score = document.querySelector('#score')

canvas.width = innerWidth;
canvas.height = innerHeight;

// const image = new Image();
// image.src = './img/pipeHorizontal.png'

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

const pellets = [];

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


class Pellet{
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

const map = [
    ['1', '-', '-', '-', '-', '-', '-', '-', '-', '-', '2'],
    ['|', '.', '.', '.', '.', '.', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '7', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
    ['|', '.', 'b', '.', '[', '+', ']', '.', 'b', '.', '|'],
    ['|', '.', '.', '.', '.', '_', '.', '.', '.', '.', '|'],
    ['|', '.', '[', ']', '.', '.', '.', '[', ']', '.', '|'],
    ['|', '.', '.', '.', '.', '^', '.', '.', '.', '.', '|'],
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
                              new Pellet({
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
    // player.speed.y = 0;
    // player.speed.x = 0;


}

function collision(pellet){
    for(let i = 0; i < pellets.length; i++){
        pellet = pellets[i];
        const index = pellets.indexOf(pellet);
    
        if(Math.hypot(pellet.position.x - player.position.x,
            pellet.position.y - player.position.y) < pellet.radius + player.radius){
            if(index > -1){
                pellets.splice(index, 1);
                score.value = 1
                console.log('comeu')
            }
        }
    }
}

setInterval(collision, 100);

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