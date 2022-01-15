const express = require('express');
const ejs=require('ejs')
const path =require('path')
const app = express();
const Photo=require("./models/Photo")
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
// Template Engine

app.set("view engine","ejs") // templat olarak ejs kullanacağız

/*
const myLogger=(req,res,next)=>{
    console.log("Middleware Log 1")
    next()
}
const myLogger2=(req,res,next)=>{
    console.log("Middleware Log 2")
    next()  // bir sonraki middleware ilerlemesi için next methodunu çağırmamız lazım
}
//Middleware

app.use(myLogger) // Middleware çalıştırmak için use fonk kullanılır
app.use(myLogger2)*/
app.use(express.static('public'))
app.use(express.urlencoded({extended:true})) // url deki datayı okumamızı sağlıyor
app.use(express.json()) //url deki data json formatına dönüştürmemizi sağlıyor

//ROUTES
app.get('/', async(req, res) => {
    const photos=await Photo.find({})
    //res.sendFile(path.resolve(__dirname,'temp/index.html'))
    res.render("index",{
        photos:photos
    })
});
app.get('/about', (req, res) => {
    res.render("about")
});
app.get('/add', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'temp/index.html'))
    res.render("add")
});

app.post('/photos', async(req, res) => {
    await Photo.create(req.body)
    res.redirect('/')
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı. `);
});
