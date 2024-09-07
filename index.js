let bb;
console.log('go!')

let color_layers = [];


function setup() {
    createCanvas(900, 900, SVG);
    background(255);
    angleMode(DEGREES);
}

function draw() {
    /*let colors = [color('red'), color('blue'), color('green'), color('cyan')]
    
    for (let i=0; i<colors.length; i++) {
        let pts = [];
        for (let j=0;j<200;j++) {
            let thispt = {x1: random(width),
                            y1: random(height),
                            x2: random(width),
                            y2: random(height)
            }
            pts.push(thispt)
        }
        color_layers.push(pts)
    }
    
    for (let i=0;i<colors.length; i++) {
        stroke(colors[i]);
        for (let thispt of color_layers[i]) {
            line(thispt.x1, thispt.y1, thispt.x2, thispt.y2)
        }
    }*/
    
    stroke(0);
    strokeWeight(2);
    //line(25,25,50,50);
    let originx = 40;
    let bb_width = 30;
    let bb_height = 900;
    let linespacing = 5;
    let minbreak = 0.03;
    let end_insets = 10;
    
    let lines = [];
    let last_breaks = [0,1];
    let slant = random([true, false]);
    
    let nextline; // = new BentBroken(originx, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks);
    //nextline.show()
    
    for (let x = originx; x < width - originx; x + 10){
        console.log(x)
        let nextline = new BentBroken(x, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks, slant);
        last_breaks = [...nextline.breaks];
        nextline.show();
        lines.push(nextline);
        x += nextline.width + 4;
    }
    //bb = new BentBroken(50, 40, 900, 2, 0.1, 10, [0,1]);
    //console.log('bb');
    //bb.show()
    
    noLoop();
    console.log(lines)
}
