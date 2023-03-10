// Add event listener to form submit
document.getElementById('image-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission
    if (validateForm()) {
      convertImage();
    }
  });
  
  // Validate form fields
  function validateForm() {
    var image = document.getElementById('image').value;
    var format = document.getElementById('format').value;
    if (image == '') {
      alert('Please select an image.');
      return false;
    }
    if (format == '') {
      alert('Please choose a format.');
      return false;
    }
    return true;
  }
  
  // Convert image to selected format
  function convertImage() {
    var image = document.getElementById('image').files[0];
    var format = document.getElementById('format').value;
    var formData = new FormData();
    formData.append('image', image);
    formData.append('format', format);
  
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'convert.php', true);
    xhr.onload = function() {
      if (this.status === 200) {
        var response = JSON.parse(this.response);
        if (response.success) {
          var downloadLink = document.createElement('a');
          downloadLink.setAttribute('href', response.file);
          downloadLink.setAttribute('download', 'converted.' + format);
          downloadLink.innerHTML = 'Download';
          var downloadArea = document.getElementById('download-area');
          downloadArea.innerHTML = '';
          downloadArea.appendChild(downloadLink);
        } else {
          alert('Conversion failed: ' + response.message);
        }
      } else {
        alert('Conversion failed. Please try again later.');
      }
    };
    xhr.send(formData);
  }
  