
class BentBroken {
    constructor (origin, width, height, linespacing, minbreak, end_insets, breaks) {
        this.breaks = breaks;
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.linespacing = linespacing;
        this.minbreak = minbreak;
        this.end_insets = end_insets;
        
        this.addBreaks();
        this.breaks.sort();
    }
    
    addBreaks () {
        let n_breaks = 2;
        let tries = 0;
        while (n_breaks > 0) {
            let proposed_pt = random();
            if (this.evaluateBreak(proposed_pt)) {
                this.breaks.push(proposed_pt)
                n_breaks -=1;
            } else if (tries > 3){
                let pop_i = floor(random(0,this.breaks.length));
                console.log("breaks:", this.breaks);
                console.log("pop_i:", pop_i);
                let spliced = this.breaks.splice(pop_i);
                console.log("popped:", spliced)
                console.log();
                tries = 0;
            } else {
                tries ++;
            }
        }
        
    };
    
    evaluateBreak (breakpt) {
        for (let pt of this.breaks) {
            if (abs(pt - breakpt) < this.minbreak) {
                return false;
            } 
        }
        return true;
    }
    
    show() {
        let current_break_i = 0;
        let drawing_now = false;
        for (let y = this.end_insets; y < height - this.end_insets; y += this.linespacing) {
            let current_break = this.breaks[current_break_i];
            //console.log("")
            //console.log(current_break, 0,1, this.end_insets, this.height - this.end_insets)
            let break_y = map(current_break, 0,1, this.end_insets, this.height - this.end_insets);
            //console.log("y:", y,"break_y:", break_y, "drawing now:", drawing_now)
            if (y >= break_y) {
                //console.log('SWITCH DRAWING NOW');
                drawing_now = ! drawing_now;
            current_break_i ++;}
            if (drawing_now) {
                //console.log('DRAW!',this.origin - (this.width/2), y, this.origin + (this.width/2), y)
                line(this.origin - (this.width/2), y, this.origin + (this.width/2), y)
            }
            
        }
    }
};