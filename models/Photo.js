const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//creat Schema
const PhotoSchema = new Schema({
  title: String,
  description: String,
  image: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Photo = mongoose.model('Photo', PhotoSchema); // Photo => photos collectionı oluşturur.

module.exports = Photo;
