const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Serve static files from the 'src' folder
app.use(express.static(path.join(__dirname, 'src')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'index.html'));
});

// Route for qr.html
app.get('/qr-code', (req, res) => {
  res.sendFile(path.join(__dirname, 'src', 'pages', 'qr.html'));
});



// 1060457876193-iv3aoirdcjuvbmplg8g3v7927ri21rlr.apps.googleusercontent.com

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
