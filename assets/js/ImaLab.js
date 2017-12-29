var colors = [
  [125,154,214],
  [134,150,176],
  [255,255,255],
  [134,150,176],
  [220,233,250],
];

var step = 0;
//color table indices for:
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0, 1,2,3,4];

//transition speed
var gradientSpeed = 0.001;

function updateGradient() {

  if ($ === undefined) return;

  var c0_0 = colors[colorIndices[0]];
  var c0_1 = colors[colorIndices[1]];

  var istep = 1 - step;
  var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
  var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
  var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
  var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

  $('#menu').css(
    {
      background: color1
    }
  )

  step += gradientSpeed;
  if (step >= 1) {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];

    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor(
      1 + Math.random() * (colors.length - 1)
    )) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor(
      1 + Math.random() * (colors.length - 1)
    )) % colors.length;

  }
}

setInterval(updateGradient, 10);

