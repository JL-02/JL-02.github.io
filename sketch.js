let dots = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  noStroke();
}

function draw() {
  background(0, 0, 0, 10); // Adding a translucent background to create the effect of fading out

  if (dots.length < 100) { // Adding new dots at random locations
    dots.push(new Dot(random(width), random(height)));
  }

  for (let i = dots.length - 1; i >= 0; i--) {
    dots[i].display(); // Displaying each dot
    dots[i].update(); // Updating each dot's properties
    if (dots[i].opacity <= 0) {
      dots.splice(i, 1); // Removing dots that have faded away completely
    }
  }
}

class Dot {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.color = color(280, 80, 100, 50); // Making the dots transparent
    this.size = random(10, 20);
    this.opacity = 100;
    this.pulseSpeed = random(0.01, 0.05); // Randomizing the pulse speed of each dot
    this.fadeSpeed = random(0.1, 0.5); // Randomizing the fade speed of each dot
    this.birthTime = millis(); // Recording the time at which the dot was created
  }

  display() {
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  update() {
    let elapsedTime = millis() - this.birthTime; // Calculating the elapsed time since the dot was created
    if (elapsedTime > 3000) { // Limiting the maximum pulsating time to 3 seconds
      this.pulseSpeed = 0; // Setting the pulse speed to 0 to stop pulsating
      this.fadeSpeed = 5; // Increasing the fade speed to fade away faster
    }
    this.size += sin(frameCount * this.pulseSpeed); // Making the size of the dot pulse
    this.opacity -= this.fadeSpeed; // Making the dot gradually fade away
    this.color = color(hue(this.color), saturation(this.color), brightness(this.color), this.opacity); // Updating the dot's color with the new opacity value
  }
}
