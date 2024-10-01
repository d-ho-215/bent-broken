
function setup() {
    createCanvas(1200, 900, SVG);
    background(255);
    angleMode(DEGREES);
}

function draw() {
    
    stroke(0);
    strokeWeight(2);
    
    let originx = 40;
    let bb_width = map(random(), 0, 1, 10, 50);
    let bb_height = height;
    let linespacing = 5;
    let minbreak = map(random(), 0, 1, 0.025, 0.1);
    let end_insets = 50;
    
    let lines = [];
    let last_breaks = [0,1];
    let slant = random([true, false]);
    let maxbend = map(random(), 0, 1, 2, 8)
    let last_width = 0
    
    let nextline; 
    let max_n_breaks = round((1 / minbreak) * 0.8)
    console.log("max breaks: ", max_n_breaks, "\nminbreak: ", minbreak)
    
    let noise_scale = 150
    
    let start = true;
    
    let colors = [color(PenColors.Stabilo88.blue),
                    color(PenColors.Stabilo88.ultramarine),
                    color(PenColors.Stabilo88.black)
                    ]
    let accent_color = color(PenColors.Stabilo88.crimson)
    
    for (let x = originx; x < width - originx - last_width; x++){
        let noise_n = round(map(noise(x / noise_scale), 0, 1, 0, max_n_breaks/2)) * 2 // even number of breaks
        console.log("")
        //console.log("x:", x)
        //console.log("noise_n: ", noise_n)
        nextline = new BentBroken(x, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks, slant, colors, accent_color, maxbend, noise_n);
        
        if (start) {
            nextline.initialize();
            start = false;
        } else {
            nextline.update()
        }
        last_breaks = [...nextline.breaks];
        last_width = nextline.width;
        //nextline.show();
        lines.push(nextline);
        x += nextline.width + 4;
        //console.log(nextline);
        
    }
    
    for (let bb of lines) {
        bb.show()
    }
    
    noLoop();
    //console.log(lines)
}
