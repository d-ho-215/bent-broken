let bb;
console.log('go!')

function setup() {
    createCanvas(900, 900, SVG);
    background(255)
}

function draw() {
    stroke(0);
    strokeWeight(1);
    //line(25,25,50,50);
    let originx = 40;
    let bb_width = 30;
    let bb_height = 900;
    let linespacing = 3;
    let minbreak = 0.05;
    let end_insets = 10;
    
    let lines = [];
    let last_breaks = [0,1];
    
    let nextline; // = new BentBroken(originx, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks);
    //nextline.show()
    
    for (let x = originx; x < width - originx; x+= bb_width + 10){
        console.log(x)
        let nextline = new BentBroken(x, bb_width, bb_height, linespacing, minbreak, end_insets, last_breaks);
        last_breaks = nextline.breaks;
        nextline.show();
    }
    //bb = new BentBroken(50, 40, 900, 2, 0.1, 10, [0,1]);
    //console.log('bb');
    //bb.show()
    
    noLoop();
}
