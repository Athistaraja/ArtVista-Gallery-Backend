// models/Artwork.js
const mongoose = require('mongoose');

const artworkSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true },
  artist: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  ratings: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        rating: Number
      }
    ],
  averageRating: { type: Number, default: 0 }

});
artworkSchema.methods.calculateAverageRating = function() {
  if (this.ratings.length > 0) {
    this.averageRating = this.ratings.reduce((acc, curr) => acc + curr.rating, 0) / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  return this.averageRating;
};

module.exports = mongoose.model('Artwork', artworkSchema);
