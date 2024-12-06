let cols = 40; // Number of columns
let rows = 40; // Number of rows
let gridSpacing = 20; // Spacing between grid points
let z = []; // Array to store z-values for distortion

function setup() {
  let canvas = createCanvas(800, 800); // Canvas size
  canvas.style("display", "block"); // Make canvas behave like a block element
  centerCanvas(); // Call center function
  noFill(); // No fill for grid lines
  stroke(255); // White grid lines
  for (let x = 0; x < cols; x++) {
    z[x] = [];
    for (let y = 0; y < rows; y++) {
      z[x][y] = 0; // Initialize z-values
    }
  }
}

function draw() {
  background(0); // Black background
  translate(width / 2, height / 2); // Center grid in canvas

  for (let x = 0; x < cols - 1; x++) {
    for (let y = 0; y < rows - 1; y++) {
      let d = dist(mouseX - width / 2, mouseY - height / 2, x * gridSpacing, y * gridSpacing);
      let influence = map(d, 0, 150, 20, 0);
      influence = max(0, influence);
      z[x][y] = sin(frameCount * 0.05 - d * 0.05) * influence;

      line(
        x * gridSpacing,
        y * gridSpacing + z[x][y],
        (x + 1) * gridSpacing,
        y * gridSpacing + z[x + 1][y]
      );
      line(
        x * gridSpacing,
        y * gridSpacing + z[x][y],
        x * gridSpacing,
        (y + 1) * gridSpacing + z[x][y + 1]
      );
    }
  }
}

// Function to center the canvas
function centerCanvas() {
  let x = (windowWidth - width) / 2;
  let y = (windowHeight - height) / 2;
  canvas.position(x, y); // Center the canvas
}

function windowResized() {
  centerCanvas(); // Re-center canvas on window resize
}
