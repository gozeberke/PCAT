const express = require('express');
const ejs=require('ejs')
const path =require('path')
const app = express();
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

//ROUTES
app.get('/', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'temp/index.html'))
    res.render("index")
});
app.get('/about', (req, res) => {
    res.render("about")
});
app.get('/add', (req, res) => {
    //res.sendFile(path.resolve(__dirname,'temp/index.html'))
    res.render("add")
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı. `);
});
