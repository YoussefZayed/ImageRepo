const express = require('express');
const serveIndex = require('serve-index');
const path = require("path");
const fs = require("fs");
const multer = require("multer");
var cors = require('cors')

var app = express()
app.use(cors())

app.use((req, res, next) => {
  console.log('Request fufilled at Time: ', Date.now());
  next();
});

app.get('/pics', (req, res) => {
    database = require('./database');
    res.send(database);
  });

app.get('/pics/:search', (req, res) => {
    database = require('./database');
    let search = req.params.search;
    search = search.split(" ");
    result = []
    let pushed = false;
    database.forEach(img => {
        pushed = false;
        search.forEach(term => {
            if ((img['name'].toLowerCase().includes(term.toLowerCase()) || img['desc'].toLowerCase().includes(term.toLowerCase())) && pushed == false) {
                result.push(img);
                pushed = true;
            }
        });
    });
    console.log(result)
    res.send(result);
  });


// return imgs folder
app.use('/imgs', express.static('imgs'));
app.use('/imgs', serveIndex('imgs'));


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};

// upload to tmp file
const upload = multer({
  dest: path.join(__dirname, "/tmp")
});

// uploads img to tmp folder for future similar image search
app.post(
  "/upload",
  upload.single("png"),
  (req, res) => {
    const tempPath = req.file.path;
    const targetPath = path.join(__dirname, "./tmp/image.png");
    if (path.extname(req.file.originalname).toLowerCase() === ".png") {
      fs.rename(tempPath, targetPath, err => {
        if (err) return handleError(err, res);
        similarImages();
        res.status(200).send("Done");
        
      });
    } else {
      fs.unlink(tempPath, err => {
        if (err) return handleError(err, res);
        res
          .status(403)
          .contentType("text/plain")
          .end("Only .png files are allowed!");
      });
    }
  }
);





app.listen(3000, () => console.log('Image app is listening on port 3000.'));
