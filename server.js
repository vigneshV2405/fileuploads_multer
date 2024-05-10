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
    let folder = __dirname+'/uploads/'+req.body.username
    function rename(){
        fs.rename(__dirname+'/uploads/'+req.file.filename,__dirname+'/uploads/'+req.body.username+'/'+req.file.filename,(resp)=>{
            res.send('uploaded......')
        })
    }
    if(fs.existsSync(folder)){
        rename()
    }
    else{
        fs.mkdirSync(__dirname+'/uploads/'+req.body.username)
        rename()
    }
})

app.listen(3500,()=>{console.log('app running on 3500')})