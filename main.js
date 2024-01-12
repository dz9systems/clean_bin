const form = document.querySelector("#Form");
const qrCode = document.querySelector("#qr-code");

const generateSubmit = (e) => {
  e.preventDefault();
  clearQR();

  const url = document.querySelector("#formData").value;
  console.log(url);

  //form validation
  if (url === "") {
    alert("please enter a valid url");
  } else {
    generateQrCode(url);
  }
};

const generateQrCode = (url) => {
  const qr = new QRCode(document.getElementById("qr-code"), {
    text: url,
    width: 300,
    height: 300,
  });
};

const clearQR = () => {
  qrCode.innerHTML = "";
};

form.addEventListener("submit", generateSubmit);