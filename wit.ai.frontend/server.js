const express = require('express');
const path = require('path');
const app = express();
const fs = require('fs');

const serveIndex = (req, res) =>{
    const index = fs.readFileSync('./build/index.html');
    res.setHeader("Content-Type", "text/html");
    res.writeHead(200);
    res.end(index);
  }


app.use(express.static(path.join(__dirname, 'build/')));
app.get('*', serveIndex) 



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});