function drawBike() {
  const canvas = document.getElementById('bike'),
        ctx = canvas.getContext('2d'),
        colorLines = 'rgb(78, 137, 150)',
        colorFill = 'rgb(145, 203, 215)',
        pi = Math.PI;

  ctx.fillStyle = colorFill;
  ctx.strokeStyle = colorLines;
  ctx.lineWidth = 4;

  ctx.beginPath();
  ctx.arc(51, 135, 48, 0, pi*2);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.arc(235, 135, 48, 0, pi*2);
  ctx.stroke();
  ctx.fill();

  ctx.lineWidth = 2;

  ctx.beginPath();
  ctx.moveTo(51, 135);
  ctx.lineTo(105, 70);
  ctx.lineTo(224, 70);
  ctx.lineTo(131, 129);
  ctx.lineTo(51, 135);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(131, 129, 14, 0, pi*2);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(131, 129);
  ctx.lineTo(93, 47);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(72, 47);
  ctx.lineTo(113, 47);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(121, 120);
  ctx.lineTo(111, 110);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(141, 139);
  ctx.lineTo(150, 148);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(235, 135);
  ctx.lineTo(220, 35);
  ctx.lineTo(243, 5);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(220, 35);
  ctx.lineTo(180, 48);
  ctx.stroke();
}

drawBike();