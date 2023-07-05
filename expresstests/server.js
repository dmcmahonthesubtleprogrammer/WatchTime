const express = require("express");
const app = express();
const fs = require("fs");
const cors = require('cors');
const multer = require('multer');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const axios = require('axios');
const requireDir = require('require-dir');
const dir = requireDir('src/videos/');
const corsOptions = {
    origin: ['http://localhost:3509/']
  };
app.use(cors());
app.listen(5000, () => {
    console.log('Server started on port 5000');
  });
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Zebraking123!?0',
    database: 'watchtime'
  });
  app.use(bodyParser.json());
  app.get('/getvideofiles', (req, res) => {
    const fileStream = fs.createReadStream('src/videos');
    fileStream.pipe(res);
    //console.log(fileStream);
    //fs.readdirSync(dirPath).forEach((file) => {

    //});
    /*const dirPath = path.join(__dirname, 'src/videos');
    const files = [];
    fs.readdirSync(dirPath).forEach((file) => {
      files.push((path.join(dirPath, file)));
    });
    res.send(files);*/
    //console.log(dir);
  });
  app.get('/api/uservideos:start/:uid', (req, res) => {
    const query = `SELECT * FROM videos WHERE uid = '${req.params.uid}' LIMIT ${req.params.start},10`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/api/videos:start', (req, res) => {
    const query = `SELECT * FROM videos LIMIT ${req.params.start},5`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/deletevideo:id', (req, res) => {
    const query = `DELETE FROM videos WHERE id = ${req.params.id}`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/changeuseravatar:uid/:filename', (req, res) => {
    const query = `UPDATE users SET avatarfilename = '${req.params.filename.replace(/'/g, "\\'").replace(/"/g, '\\"')}' WHERE uid LIKE '%${req.params.uid}%'`;
    
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
        console.error(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/changepassword:uid/:hashedpassword', (req, res) => {
    const query = `UPDATE users SET passwordsalt = '${req.params.hashedpassword.replace(/'/g, "\\'").replace(/"/g, '\\"')}' WHERE uid LIKE '%${req.params.uid}%'`;
    
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
        console.error(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/changevideodetails:videoid/:title/:description', (req, res) => {
    let query = `UPDATE videos SET name = "${req.params.title.replace(/'/g, "\\'").replace(/"/g, '\\"')}", description = "${req.params.description.replace(/'/g, "\\'").replace(/"/g, '\\"')}" WHERE id = ${req.params.videoid}`;
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
        console.error(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/api/currentuser:uid', (req, res) => {
    const query = `SELECT * FROM users WHERE uid LIKE '%${req.params.uid}%'`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  app.delete('/delete/file:image', (req, res) => {
    fs.unlink(__dirname + '/src/images/' + req.params.image, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting file');
      } else {
        res.send('File deleted successfully');
      }
    });
  });
  app.delete('/delete/videofile:video', (req, res) => {
    fs.unlink(__dirname + '/src/videos/' + req.params.video, (error) => {
      if (error) {
        console.error(error);
        res.status(500).send('Error deleting file');
      } else {
        res.send('File deleted successfully');
      }
    });
  });
  app.get('/api/videocomments:videoid', (req, res) => {
    const query = `SELECT * FROM comments WHERE videoid = ${req.params.videoid} ORDER BY dateposted DESC`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  app.get('/api/getcomment:commentid', (req, res) => {
    const query = `SELECT * FROM comments WHERE id = ${req.params.commentid}`;
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.json(results);
      }
    });
  });
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '/src/videos/'));
    },
    filename: (req, file, cb) => {
      const extension = path.extname(file.originalname);
      const filename = file.originalname;//${Date.now()}${extension}`;
      cb(null, filename);
    }
  });
  const upload = multer({ storage: storage, limits: { fileSize: 990000000000 }
});
const imageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '/src/images/'));
  },
  filename: (req, file, cb) => {
    const extension = path.extname(file.originalname);
    const filename = file.originalname;//${Date.now()}${extension}`;
    cb(null, filename);
  }
});
  const imageUpload = multer({ storage: imageStorage, limits: { fileSize: 990000000000 }
});
  app.post('/upload', upload.single('video'), (req, res) => {
    const file = req.file;

    if (!file) {
        res.status(400).send('No file uploaded');
        return;
      }

    const filePath = path.join(__dirname, '/src/videos/', file.filename);
    res.send(`File uploaded successfully: ${filePath}`);
  });

  app.post('/imageUpload', imageUpload.single('image'), (req, res) => {
    const file = req.file;

    if (!file) {
        res.status(400).send('No file uploaded');
        return;
      }

    const filePath = path.join(__dirname, '/src/images/', file.filename);
    res.send(`File uploaded successfully: ${filePath}`);
  });

  function getContentType(filepath) {
    const extension = path.extname(filepath);
    switch (extension) {
      case '.mp4':
        return 'video/mp4';
      case '.webm':
        return 'video/webm';
      case '.ogg':
        return 'video/ogg';
      default:
        return 'application/octet-stream';
    }
  }

  app.get('/videos/:filename', (req, res) => {
    const videoPath = 'src/videos/' + req.params.filename;
  const videoSize = fs.statSync(videoPath).size;
  const range = req.headers.range;

  if (range) {
    const parts = range.replace(/bytes=/, '').split('-');
    const start = parseInt(parts[0], 10);
    const end = parts[1] ? parseInt(parts[1], 10) : videoSize - 1;
    const chunksize = (end - start) + 1;
    const file = fs.createReadStream(videoPath, {start, end});
    const head = {
      'Content-Range': `bytes ${start}-${end}/${videoSize}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunksize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(206, head);
    file.pipe(res);
  } else {
    const head = {
      'Content-Length': videoSize,
      'Content-Type': 'video/mp4',
    };
    res.writeHead(200, head);
    fs.createReadStream(videoPath).pipe(res);
  }
  });
  app.get('/images/:filename', (req, res) => {
    const imageName = req.params.filename;
    const imagePath = '/src/images/' + imageName;
    res.sendFile(__dirname + imagePath);
  });
/*
  app.use(bodyParser.json());
  app.get('/videos', (req, res) => {
    const query = 'SELECT * FROM videos LIMIT 3';
    // execute the MySQL query
    pool.query(query, (error, results, fields) => {
      if (error) {
        res.status(500).send(error);
      } else {
        res.send(results);
      }
    });
  });

  app.get('/videos/:filename', (req, res) => {
    const fileName = req.params.filename;
    const filePath = path.join(__dirname, 'public/videos', fileName);

    if(!fs.existsSync(filePath)) {
        res.status(404).send('File not found');
        return;
    }

    const contentType = getContentType(filePath);
    res.setHeader('Content-Type', contentType);

    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);
  });

  app.listen(5000, () => {
    console.log('Server started on port 5000');
  });

  function getContentType(filepath) {
    const extension = path.extname(filepath);
    switch (extension) {
      case '.mp4':
        return 'video/mp4';
      case '.webm':
        return 'video/webm';
      case '.ogg':
        return 'video/ogg';
      default:
        return 'application/octet-stream';
    }
  }

  const upload = multer({
    storage: storage,
    limits: { fileSize: 99000000000 } // set the maximum file size to 100MB
  });

  app.post('/upload-video', upload.single('video'), (req, res) => {
    const file = req.file;
    console.log(file);
    if (!file) {
        res.status(400).send('No file uploaded');
        return;
    }
    const filePath = path.join(__dirname, 'public/videos', file.filename);
    res.send(`File uploaded successfully: ${filePath}`);
  });*/


