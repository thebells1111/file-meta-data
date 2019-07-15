const express = require('express');
const cors = require('cors');

const multer = require('multer');
const upload = multer({ storage: multer.memoryStorage() })

const app = express();

app.use(cors());
app.use('/public', express.static(process.cwd() + '/public'));

app.get('/', function (req, res) {
     res.sendFile(process.cwd() + '/views/index.html');
  });

app.get('/hello', function(req, res){
  res.json({greetings: "Hello, API"});
});

/*app.post('/api/test', upload.single('myFile'), function(req, res, next){
  console.log(req);
  res.sendFile(process.cwd() + '/views/index.html');
})
*/

app.post('/api/filedata', upload.single('upfile'), (req, res) => {
    if (req.file) {
        const response = {}
        response.name = req.file.originalname;
        response.type = req.file.mimetype;
        response.size = req.file.size;
        res.json(response)
    } else {
        res.send('No File Upload')
    }   
});

app.listen(process.env.PORT || 3000, function () {
  console.log('Node.js listening ...');
});