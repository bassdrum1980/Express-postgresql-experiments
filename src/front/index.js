const canvas = document.getElementById('canvasElem');

const form = document.getElementById('form');
form.onsubmit = async (event) => {
  event.preventDefault();

  const imageBlob = await new Promise((resolve) =>
    canvas.toBlob(resolve, 'image/png')
  );

  const formData = new FormData(form);
  formData.append('image', imageBlob, 'image.png');

  if (formData.has('name') && formData.has('surname')) {
    const response = await fetch('http://localhost:3001/formdata', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    console.log(result);
  }
};

/* Drawing */
const position = { x: 0, y: 0 };
const ctx = canvas.getContext('2d');

function setPosition(clientX, clientY) {
  position.x = clientX;
  position.y = clientY;
}

canvas.onpointerdown = function ({ pointerId, clientX, clientY }) {
  setPosition(clientX, clientY);
  canvas.setPointerCapture(pointerId);

  canvas.onpointermove = function ({ clientX, clientY }) {
    ctx.moveTo(position.x, position.y);
    setPosition(clientX, clientY);
    ctx.lineTo(position.x, position.y);
    ctx.stroke();
  };
};
canvas.onpointercancel = canvas.onpointerup = function () {
  canvas.onpointermove = null;
};
