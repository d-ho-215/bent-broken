
function setup() {
    createCanvas(900, 600, SVG);
    background(255);
    angleMode(DEGREES);
}

function draw() {
    
    stroke(0);
    strokeWeight(2);
    
    let originx = 40;
    let bb_width = 25;
    let bb_height = 600;
    let linespacing = 5;
    let minbreak = 0.03;
    let end_insets = 50;
    
    let lines = [];
    let last_breaks = [0,1];
    let slant = random([true, false]);
    
    let nextline; 
    let max_n_breaks = round((1 / minbreak) * 0.8)
    
    let noise_scale = 150
    
    let start = true;
    
    let colors = [color(PenColors.Stabilo88.blue),
                    color(PenColors.Stabilo88.deep_cold_grey),
                    color(PenColors.Stabilo88.black)
                    ]
    let accent_color = color(PenColors.Stabilo88.crimson)
    
    for (let x = originx; x < width - originx; x + 10){
        let noise_n = round(map(noise(x / noise_scale), 0, 1, 0, max_n_breaks/2)) * 2 // even number of breaks
        console.log("")
        console.log("x:", x)
        console.log("noise_n: ", noise_n)
        nextline = new BentBroken(x, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks, slant, colors, accent_color, noise_n);
        last_breaks = [...nextline.breaks];
        if (start) {
            nextline.initialize();
            start = false;
        }
        nextline.show();
        lines.push(nextline);
        x += nextline.width + 4;
        console.log(nextline);
    }
    
    noLoop();
    //console.log(lines)
}
