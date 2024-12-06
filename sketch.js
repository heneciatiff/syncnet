let cols = 40; // Number of columns
let rows = 40; // Number of rows
let gridSpacing = 20; // Spacing between grid points
let z = []; // Array to store z-values for distortion

function setup() {
  createCanvas(800, 800); // Canvas size
  noFill(); // No fill for the grid lines
  stroke(255); // White grid lines
  for (let x = 0; x < cols; x++) {
    z[x] = [];
    for (let y = 0; y < rows; y++) {
      z[x][y] = 0; // Initialize all z-values to 0
    }
  }
}

function draw() {
  background(0); // Black background
  translate(0, 0); // Center the grid

  // Draw the net
  for (let x = 0; x < cols - 1; x++) {
    for (let y = 0; y < rows - 1; y++) {
      // Calculate distance to mouse and adjust distortion
      let d = dist(mouseX , mouseY , x * gridSpacing, y * gridSpacing);
      let influence = map(d, 0, 150, 20, 0); // Influence decreases with distance
      influence = max(0, influence); // Prevent negative influence
      z[x][y] = sin(frameCount * 0.05 - d * 0.05) * influence;

      // Draw horizontal and vertical lines
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
