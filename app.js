const express = require('express');
const app = express();
const path =require('path')
const myLogger=(req,re,next)=>{
    console.log("Middleware Log 1")
    next()
}
const myLogger2=(req,re,next)=>{
    console.log("Middleware Log 2")
    next()
}
//Middleware
app.use(express.static('public'))
app.use(myLogger)
app.use(myLogger2)
app.get('/', (req, res) => {
    res.sendFile(path.resolve(__dirname,'temp/index.html'))
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı. `);
});
