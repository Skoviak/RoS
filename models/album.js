const mongoose = require('mongoose');

const { Schema } = mongoose;

const Album = new Schema({
  title: String,
  release_year: Date,
  tony_rating: Number,
  tony_review: String,
  mandy_rating: Number,
  mandy_review: String,
  artist_id: String,
  genre_id: String,
});

module.exports = mongoose.model('Album', Album);
