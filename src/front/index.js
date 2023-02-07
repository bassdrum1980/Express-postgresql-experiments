const form = document.getElementById('form');
form.onsubmit = async (event) => {
  event.preventDefault();
  const response = await fetch('http://localhost:3001/formdata', {
    method: 'POST',
    body: new FormData(form),
  });

  const result = await response.json();

  console.log(result);
};
