const express = require('express');
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const methodOverride = require('method-override')
const ejs=require('ejs')
const photoController=require('./controllers/photo')
const pageController=require('./controllers/pageController')
const app = express();

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
app.get('/',photoController.getAllPhotos);
app.get('/photos/:id', photoController.getSinglePhoto);
app.post('/photos',photoController.createPhoto);
app.put('/photos/:id',photoController.updatePhoto)
app.delete('/photos/:id', photoController.deletePhoto)

app.get('/about',pageController.getAboutPage);
app.get('/add',pageController.getAddPage);
app.get('/photos/edit/:id',pageController.getEditPage)

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı. `);
});
