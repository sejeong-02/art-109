
class Bunny {
    constructor() {
        //face

            fill (255);
            ellipse(0,-10,250, 210);
            rect(0,0,250, 200,200);
            rect(-56,-50,135, 230,130);
            rect(56,-50,135, 230,130);
        
        //eyes
        this.xEye = 55;
        this.yEye = -35;
        fill(120,50,40);
        rect(-this.xEye, -this.yEye, 40, 45,120);
        rect(this.xEye, -this.yEye, 40, 45, 120);
        rect(-55, 15, 15, 20, 120);
        rect(55, 15, 15, 20, 120);
        rect(-55, -38, 30, 12, 200);
        rect(55, -38, 30, 12, 200);
        fill(255);
        this.xWhite = 55;
        this.yWhite1 = -43;
        this.yWhite2 = -27;
        ellipse(-this.xWhite, -this.yWhite1, 10, 10);
        ellipse(this.xWhite, -this.yWhite1, 10, 10);
        ellipse(-this.xWhite, -this.yWhite2, 10, 10);
        ellipse(this.xWhite, -this.yWhite2, 10, 10);
        //nose
        fill (240,120,190);
        ellipse(0,45,15,15);
        //mouth
    }
    display() {

        translate(width/2,height/2);
        noStroke();
        //face
        

        //eyes
       
        //nose
       
        }
}