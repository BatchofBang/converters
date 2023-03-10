const input = document.getElementById('input-file');
const convertBtn = document.getElementById('convert-btn');
const outputImage = document.getElementById('output-image');

convertBtn.addEventListener('click', (event) => {
  event.preventDefault();
  const file = input.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(file);
  reader.onload = () => {
    outputImage.src = reader.result;
  };
});
