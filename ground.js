class Ground 
{
  constructor(x, y, w,h) 
  {
    let options = {
     isStatic:true
    };
    
    this.body = Bodies.rectangle(x, y, w, h, options);
    this.width = w;
    this.height = h;
    //World.add(world,this.body);
  }

  display() {
    let pos = this.body.position;
    push();
    rectMode(CENTER);
    noStroke();
    fill(148,127,146);
    rect(pos.x,pos.y, this.width, this.height);
    pop();
  }
}
