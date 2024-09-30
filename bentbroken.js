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
    constructor (origin, width, height, linespacing, minbreak, end_insets, breaks, slant, colors, accent_color, target_n_breaks) {
        this.breaks = breaks;
        this.origin = origin;
        this.width = width;
        this.height = height;
        this.linespacing = linespacing;
        this.minbreak = minbreak;
        this.end_insets = end_insets;
        this.colors = colors; // [color(180,180,255), color(55, 55, 240), color(0,20,150)];
        this.accent_color = accent_color;
        this.color_locs = [0, 0.5, 1];
        this.slant = slant;
        this.target_n_breaks = target_n_breaks; // target number of breaks
        
        this.maxbend = 7.5 // 0.2 about equal to 11.5 deg // currently set to DEGREES
        this.bends = [];
        
        // randomization for width
        if (random() < 0.3) {
            let width_factor = map(random(), 0, 1, 0.5, 2.5);
            this.width = this.width * width_factor;
        }
        
        // randomization for added accent color
        if (random() < 0.3) {
            let i = floor(random(this.colors.length));
            let newcolors = [];
            for (let j=0; j<this.colors.length; j++) {
                if (i==j) {
                    newcolors.push(this.accent_color)
                }
                newcolors.push(this.colors[j])
            }
            
            this.colors = newcolors;
            this.color_locs = [0, 0.33, 0.66, 1];
        }
        
        //randomization for shuffled colors
        if (random() < 0.3) {
            this.colors = shuffle(this.colors)
        }
        
        // add or remove breaks
        //if (this.breaks.length < 2) {
        //    this.update()
        //    }
        this.update()
        
    }
    
    initialize() {
        if (this.target_n_breaks) {
            while (this.breaks.length < this.target_n_breaks) {
                this.addBreaks(1)
            }
        } else if (this.breaks.length < 2){
            let start_n_breaks = map(random(), 0, 1, 2, floor((1 / this.minbreak) * 0.6))
            while (this.breaks.length < this.start_n_breaks) {
                this.addBreaks(2)
            }
        } else {
            this.update()
        }
    }
    
    update () {
        //console.log('update')
        if (this.target_n_breaks) {
            console.log("target: ", this.target_n_breaks)
            console.log("n_breaks: ", this.breaks.length)
            if (this.target_n_breaks == this.breaks.length) {
                // remove 1, add 1
                console.log("remove 1, add 1")
                this.removeBreaks(1);
                this.addBreaks(1)
            } else if (this.target_n_breaks > this.breaks.length) {
                console.log("add 2")
                this.addBreaks(2)
            } else {
                console.log("remove 2")
                this.removeBreaks(2)
            }
        } else {
            if (this.breaks.length > (1 / this.minbreak) * 0.6) { 
                // if number of breaks is more than 60% of max number
                // of breaks based on minbreak size, remove breaks
                this.removeBreaks()
            } else if (this.breaks.length <= 2 || random() > 0.2) {
                // if 2 or fewer breaks, or if 80% random chance, add breaks
                this.addBreaks(2)
            } else {
                this.removeBreaks(2) 
            }
        }
        this.breaks.sort()
    }
    
    addBend(x,y) {
        let bend_angle = random(-this.maxbend, this.maxbend);
        this.bends
    }
    
    
    addBreaks (n_breaks) {
        //console.log('addBreaks')
        let missing_ends = [];
        if (! this.breaks.includes(0)) {
            missing_ends.push(0)
        }
        if (! this.breaks.includes(1)) {
            missing_ends.push(1)
        }
        while (n_breaks > 0) {
            let selected = random(missing_ends);
            if (missing_ends.length > 0  && random() > 0.5 && this.evaluateBreak(selected)) {
                this.breaks.push(selected)
                console.log("add end: ", selected)
            } else {
                let proposed_pt = random();
                if (this.evaluateBreak(proposed_pt)) {
                    this.breaks.push(proposed_pt)
                    n_breaks -=1;
                }
            }
        }
        this.breaks.sort()
        
    };
    
    removeBreaks(n_breaks) {
        //console.log('removeBreaks')
        let removed = []
        for (let n =0; n < n_breaks; n++) {
            let i = floor(random(0, this.breaks.length));
            removed.push(this.breaks.splice(i,1));
        }
        //console.log('removed: ', removed)
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
        for (let y = 0; y < this.height - this.end_insets; y += this.linespacing) {
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
                if (y > 0 && y < this.height && random() < 0.005) {
                    //let s = random([1,-1,])// sign of the angle
                    let theta;
                    if (this.slant) {
                       theta = 0;
                    } else {
                        theta = random(-this.maxbend, this.maxbend)
                        //theta = 0 // for easier debugging
                    }
                    translate(this.origin, y);
                    rotate(theta);
                    translate(-this.origin, -y);
                }
                //let c = random([color('red'), color('blue'), color('green')]);
                //stroke(c)
                let yi = map(y, 0, this.height, 0, 1)
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