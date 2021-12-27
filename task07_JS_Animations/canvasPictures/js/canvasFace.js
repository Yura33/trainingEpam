function drawFace() {
  const canvas = document.getElementById('face'),
        ctx = canvas.getContext('2d'),
        colorHeadLines = 'rgb(38, 96, 108)',
        colorHatLines = 'rgb(35, 48, 69)',
        colorHead = 'rgb(145, 203, 215)',
        colorHat = 'rgb(58, 102, 147)',
        pi = Math.PI;
      
  function creatEllipse(x, y, radiusX, radiusY, fill = colorHead, PI = pi) {
    ctx.beginPath();
    ctx.ellipse(x, y, radiusX, radiusY, PI, 0, pi*2);
    ctx.fillStyle = fill;
    ctx.fill();
    ctx.stroke();
  }

  // face
  ctx.fillStyle = colorHead;
  ctx.strokeStyle = colorHeadLines;
  ctx.lineWidth = 2;

  creatEllipse(75, 136, 60, 52);

  creatEllipse(38, 116, 10, 7);
  creatEllipse(85, 116, 10, 7);
  creatEllipse(35, 116, 2, 5, colorHeadLines);
  creatEllipse(82, 116, 2, 5, colorHeadLines);

  ctx.beginPath();
  ctx.moveTo(61, 116);
  ctx.lineTo(48, 143);
  ctx.lineTo(61, 143);
  ctx.stroke();

  creatEllipse(61, 162, 23, 7, colorHead, pi*0.05);

  // hat
  ctx.strokeStyle = colorHatLines;
  
  creatEllipse(70, 87, 67, 12, colorHat);
  
  creatEllipse(75, 79, 34, 12, colorHat);
  
  ctx.fillRect(41, 13, 68, 68);
  
  ctx.beginPath();
  ctx.moveTo(41, 13);
  ctx.lineTo(41, 82);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(109, 13);
  ctx.lineTo(109, 82);
  ctx.stroke();
  
  creatEllipse(75, 14, 34, 12, colorHat);
}

drawFace();