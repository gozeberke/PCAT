const express = require('express');
const ejs = require('ejs');
const path = require('path');
const app = express();
const Photo = require('./models/Photo');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
//const { assert } = require('console');
const fs = require('fs');
mongoose.connect('mongodb://localhost/pcat-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});
// Template Engine

app.set('view engine', 'ejs'); // templat olarak ejs kullanacağız

//MIDDLEWARE

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true })); // url deki datayı okumamızı sağlıyor
app.use(express.json()); //url deki data json formatına dönüştürmemizi sağlıyor
app.use(fileUpload());
app.use(methodOverride('_method',{
  methods:['POST','GET']
})) // post işlemini put işlemi gibi simüle etmek için

//ROUTES
app.get('/', async (req, res) => {
  const photos = await Photo.find({}).sort('-dateCreated');
  //res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render('index', {
    photos: photos,
  });
});
app.get('/photos/:id', async (req, res) => {
  const photo = await Photo.findById(req.params.id);
  res.render('photo', {
    photo,
  });
});
app.get('/about', (req, res) => {
  res.render('about');
});
app.get('/add', (req, res) => {
  //res.sendFile(path.resolve(__dirname,'temp/index.html'))
  res.render('add');
});

app.post('/photos', async (req, res) => {
  const uploadDir = 'public/uploads';
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  let uploadedImage = req.files.image;
  let uploadPath = __dirname + '/public/uploads/' + uploadedImage.name;
  uploadedImage.mv(uploadPath, async () => {
    await Photo.create({
      ...req.body,
      image: '/uploads/' + uploadedImage.name,
    });
    res.redirect('/');
  });
});
app.get('/photos/edit/:id',async(req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id})
  res.render('edit',{
    photo
  })
})
app.put('/photos/:id',async(req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id})
  photo.title=req.body.title
  photo.description=req.body.description
  photo.save()
  res.redirect(`/photos/${req.params.id}`)
})
app.delete('/photos/:id', async(req,res)=>{
  const photo=await Photo.findOne({_id:req.params.id})
  let deletedImage=__dirname+'/public'+photo.image
  fs.unlinkSync(deletedImage)
  await Photo.findByIdAndRemove(req.params.id)
  res.redirect("/")
})

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı. `);
});
