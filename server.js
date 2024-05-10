const fs = require("fs");
const express = require("express");
var multer = require("multer");
const bodyParser = require('body-parser');
const app = express();
var uploads = multer({dest:__dirname+'/uploads'})

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.post('/uploadfile',uploads.single('image'),(req,res)=>{
    console.log(req.body)
    console.log(req.file)
    fs.rename(__dirname+'/uploads/'+req.file.filename,__dirname+'/uploads/'+req.file.originalname,(resp)=>{
        res.send('wait......')
    })
})

app.listen(3500,()=>{console.log('app running on 3500')})