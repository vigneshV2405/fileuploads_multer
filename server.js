const fs = require("fs");
const express = require("express");
var multer = require("multer");
const bodyParser = require('body-parser');
const app = express();

app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
//var uploads = multer({dest:__dirname+'/uploads'})
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,__dirname+'/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const uploads = multer({storage:storage})

app.post('/uploadfile',uploads.single('image'),(req,res)=>{
    console.log(req.body)
    /* fs.rename(__dirname+'/uploads/'+req.file.filename,__dirname+'/uploads/'+req.file.originalname,(resp)=>{
        res.send('wait......')
    }) */
    res.send('uploaded')
})

app.listen(3500,()=>{console.log('app running on 3500')})