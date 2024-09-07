function colorprob(x,col_locs) {
  let total = 0;
  let ex = 4;
  for (let c of col_locs) {
    let d = pow(1 -abs(x-c), ex);
    total += d
  }
  let probs = [];
  for (let c of col_locs) {
    let d = pow(1- abs(x-c), ex);
    probs.push(d/total);
  }
  
  //console.log('colorprob', x, probs)
  return probs
}

function colorbyloc(x, cols, col_locs){
  let probs=colorprob(x,col_locs);
  let cumulatives = [];
  for (let i=0; i< cols.length; i++) {
    let p = probs[i];
    if (i == 0) {
      cumulatives.push(p);
    } else {
      cumulatives.push(p + cumulatives[i-1])
    }
  }
  let r = random();
  for (let i=0; i < cols.length; i++) {
    let pr = cumulatives[i];
    if (r <= pr) {
      //console.log("pr",cols[i]);
      return cols[i]
    }
  }
}

class BentBroken {
    constructor (origin, width, height, linespacing, minbreak, end_insets, breaks, slant) {
        this.breaks = breaks;
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.linespacing = linespacing;
        this.minbreak = minbreak;
        this.end_insets = end_insets;
        this.colors = [color(180,180,255), color(55, 55, 240), color(0,20,150)];
        this.color_locs = [0, 0.5, 1];
        this.slant = slant;
        
        if (random() < 0.3) {
            let width_factor = map(random(), 0, 1, 0.5, 2.5);
            this.width = this.width * width_factor;
        }
        
        if (random() < 0.2) {
            let i = floor(random(this.colors.length));
            let newcolors = [];
            for (let j=0; j<this.colors.length; j++) {
                if (i==j) {
                    newcolors.push(color('yellow'))
                }
                newcolors.push(this.colors[j])
            }
            
            this.colors = newcolors;
            this.color_locs = [0, 0.33, 0.66, 1];
        }
        
        if (random() < 0.3) {
            this.colors = shuffle(this.colors)
        }
        
        this.maxbend = 7.5 // 0.2 about equal to 11.5 deg
        this.bends = [];
        
        if (this.breaks.length < 2) {
            this.update()
            }
        this.update()
        
        //this.addBreaks();
        //this.addBreaks();
        //this.breaks.sort();
    }
    
    update () {
        console.log('update')
        if (this.breaks.length > 1 / this.minbreak * 0.6) {
            this.removeBreaks()
        } else if (this.breaks.length <= 2 || random() > 0.2) {
            this.addBreaks()
        } else {
            this.removeBreaks() 
        }
        this.breaks.sort()
    }
    
    addBend(x,y) {
        let bend_angle = random(-this.maxbend, this.maxbend);
        this.bends
    }
    
    /*addBreaks () {
        let n_breaks = 2;
        let tries = 0;
        while (n_breaks > 0) {
            let proposed_pt = random();
            if (this.evaluateBreak(proposed_pt)) {
                this.breaks.push(proposed_pt)
                n_breaks -=1;
            } else if (tries > 3){
                let pop_i = floor(random(0,this.breaks.length));
                //console.log("breaks:", this.breaks);
                //console.log("pop_i:", pop_i);
                let spliced = this.breaks.splice(pop_i);
                //console.log("popped:", spliced)
                //console.log();
                tries = 0;
            } else {
                tries ++;
            }
        }
        this.breaks.sort()
        
    };*/
    
    addBreaks () {
        console.log('addBreaks')
        let n_breaks = 2;
        while (n_breaks > 0) {
            let proposed_pt = random();
            if (this.evaluateBreak(proposed_pt)) {
                this.breaks.push(proposed_pt)
                n_breaks -=1;
            }
        }
        this.breaks.sort()
        
    };
    
    removeBreaks() {
        console.log('removeBreaks')
        let removed = []
        for (let n =0; n< 2; n++) {
            let i = floor(random(0, this.breaks.length));
            removed.push(this.breaks.splice(i,1));
        }
        console.log('removed: ', removed)
    }
    
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
        let current_slant = false;
        for (let y = -50; y < height + 50; y += this.linespacing) {
            let current_break = this.breaks[current_break_i];
            let break_y = map(current_break, 0,1, this.end_insets, this.height - this.end_insets);
            if (y >= break_y) {
                drawing_now = ! drawing_now;
                if (this.slant) {
                    if (drawing_now && random() < 0.5) {
                        current_slant = true
                    } else {
                        current_slant = false
                    }
                }
                current_break_i ++;}
            if (drawing_now) {
                if (y > 0 && y < height && random() < 0.005) {
                    //let s = random([1,-1,])// sign of the angle
                    let theta;
                    if (this.slant) {
                       theta = 0;
                    } else {
                        theta = random(-this.maxbend, this.maxbend)
                    }
                    translate(this.origin, y);
                    rotate(theta);
                    translate(-this.origin, -y);
                }
                //let c = random([color('red'), color('blue'), color('green')]);
                //stroke(c)
                let yi = map(y, 0, height, 0, 1)
                let y2 = y;
                if (current_slant) {
                    y2 = y + this.width * 0.8
                } else {
                    y2 = y
                }
                let c = colorbyloc(yi, this.colors, this.color_locs);
                stroke(c)
                line(this.origin, y, this.origin + this.width, y2)
            }
            
        }
    }
};