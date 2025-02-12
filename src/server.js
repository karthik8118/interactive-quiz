const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Serve static files from src directory
app.use(express.static('src'));

// Serve index.html for root path
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
  console.log(`Quiz app listening at http://localhost:${port}`);
});