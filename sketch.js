var width = 800;
var height = 800;
var foregroundColor;
var backgroundColor;
  
function setup() {
  createCanvas(800, 800);
  colorMode(HSB, 255);
  foregroundColor = randomColor();
  backgroundColor = [40, 0, 220];

  // var col = randomColor();
  // secondsColor = col.concat([255]);
  // minutesColor = col.concat([215]);
  // hoursColor = col.concat([175]);
  // daysColor = col.concat([135]);
  // monthsColor = col.concat([95]);

}

function draw() {
  background(backgroundColor);
  
  const x = width/2;
  const y = height/2;
  const dim = Math.min(width, height) - 20;

  // const now = Astronomy.Seasons(2022).sep_equinox.date;
  const now = new Date();

  drawEquinoxes(
    now.getFullYear(), x, y, dim/2, 
    [foregroundColor[0], foregroundColor[1], foregroundColor[2], 100], 
    backgroundColor
  );

  const time = new Time(x, y, dim/2, foregroundColor);
  time.update(now);
  time.show();
}

function drawEquinoxes(year, cx, cy, maxLen, foregroundColor, backgroundColor, iconSize = 20) {
  const drawEquinox = function(date, callback) {
    const time = new Time(cx, cy, maxLen, foregroundColor);
    time.update(date);
    // time.show();
    const pos = time.endPos();
    callback(pos.x, pos.y, foregroundColor, backgroundColor, iconSize);
  }

  const seasons = Astronomy.Seasons(year);
  drawEquinox(seasons.mar_equinox.date, drawSpringEquinox);
  drawEquinox(seasons.jun_solstice.date, drawSummerSolstice);
  drawEquinox(seasons.sep_equinox.date, drawAutumEquinox);
  drawEquinox(seasons.dec_solstice.date, drawWinterSolstice);
}

function randomColor() {
  return [int(random(0,255)), 125, 125];
}

function drawSpringEquinox(x, y, foregroundColor, backgroundColor, size = 20, strokeSize = 3) {
  push();
  noStroke();
  fill(foregroundColor);
  arc(x, y, size, size, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size-strokeSize, size-strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size-strokeSize, size-strokeSize, 0, 1*Math.PI);
  fill(backgroundColor);
  arc(x, y, size/2+strokeSize, size/2+strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size/2+strokeSize, size/2+strokeSize, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size/2, size/2, 0, 2*Math.PI);
  pop();
}

function drawAutumEquinox(x, y, foregroundColor, backgroundColor, size = 20, strokeSize = 3) {
  push();
  noStroke();
  fill(foregroundColor);
  arc(x, y, size, size, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size-strokeSize, size-strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size-strokeSize, size-strokeSize, 1*Math.PI, 0);
  fill(backgroundColor);
  arc(x, y, size/2+strokeSize, size/2+strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size/2+strokeSize, size/2+strokeSize, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size/2, size/2, 0, 2*Math.PI);
  pop();
}

function drawWinterSolstice(x, y, foregroundColor, backgroundColor, size = 20, strokeSize = 3) {
  push();
  noStroke();
  fill(foregroundColor);
  arc(x, y, size, size, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size/2+strokeSize, size/2+strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size/2, size/2, 0, 2*Math.PI);
  pop();
}

function drawSummerSolstice(x, y, foregroundColor, backgroundColor, size = 20, strokeSize = 3) {
  push();
  noStroke();
  fill(foregroundColor);
  arc(x, y, size, size, 0, 2*Math.PI);
  fill(backgroundColor);
  arc(x, y, size-strokeSize, size-strokeSize, 0, 2*Math.PI);
  fill(foregroundColor);
  arc(x, y, size/2, size/2, 0, 2*Math.PI);
  pop();
}