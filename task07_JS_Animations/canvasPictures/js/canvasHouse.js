function drawHouse() {
  const canvas = document.getElementById('house'),
        ctx = canvas.getContext('2d'),
        colorLines = 'rgb(0, 0, 0)',
        colorFill = 'rgb(151, 91, 91)',
        pi = Math.PI;

  ctx.fillStyle = colorFill;
  ctx.strokeStyle = colorLines;
  ctx.lineWidth = 6;

  ctx.beginPath();
  ctx.moveTo(2, 230);
  ctx.lineTo(207, 4);
  ctx.lineTo(413, 230);
  ctx.stroke();
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(2, 230);
  ctx.lineTo(2, 538);
  ctx.lineTo(413, 538);
  ctx.lineTo(413, 230);
  ctx.lineTo(2, 231);
  ctx.stroke();
  ctx.fill();
  
  ctx.lineWidth = 3;

  ctx.fillRect(289, 60, 45, 114);

  ctx.beginPath();
  ctx.moveTo(288, 60);
  ctx.lineTo(288, 174);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(335, 60);
  ctx.lineTo(335, 174);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(311, 59, 24, 4, pi, 0, pi*2);
  ctx.fill();
  ctx.stroke();

  ctx.fillStyle = colorLines;

  ctx.fillRect(32, 268, 71, 45);
  ctx.fillRect(32, 318, 71, 45);
  ctx.fillRect(108, 268, 71, 45);
  ctx.fillRect(108, 318, 71, 45);

  ctx.fillRect(232, 268, 71, 45);
  ctx.fillRect(308, 268, 71, 45);
  ctx.fillRect(232, 318, 71, 45);
  ctx.fillRect(308, 318, 71, 45);

  ctx.fillRect(232, 399, 71, 45);
  ctx.fillRect(308, 399, 71, 45);
  ctx.fillRect(232, 449, 71, 45);
  ctx.fillRect(308, 449, 71, 45);

  ctx.beginPath();
  ctx.moveTo(47, 430);
  ctx.lineTo(47, 538);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(162, 430);
  ctx.lineTo(162, 538);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(105, 401);
  ctx.lineTo(105, 538);
  ctx.stroke();

  ctx.beginPath();
  ctx.ellipse(104.5, 431, 57.5, 30, pi, 0, pi, false);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(88, 497, 6, 0, pi*2, true);
  ctx.stroke();

  ctx.beginPath();
  ctx.arc(121, 497, 6, 0, pi*2, true);
  ctx.stroke();
}

drawHouse();