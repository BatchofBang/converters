const inputFile = document.getElementById('input-file');
const newWidth = document.getElementById('new-width');
const newHeight = document.getElementById('new-height');
const outputFormat = document.getElementById('output-format');
const convertBtn = document.getElementById('convert-btn');
const outputImage = document.getElementById('output-image');

convertBtn.addEventListener('click', () => {
  const file = inputFile.files[0];
  if (!file) {
    alert('Please select an image file');
    return;
  }

  const reader = new FileReader();
  reader.onload = () => {
    const img = new Image();
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = newWidth.value || img.width;
      canvas.height = newHeight.value || img.height;

      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      const dataURL = canvas.toDataURL(`image/${outputFormat.value}`);
      outputImage.src = dataURL;
    };
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});
