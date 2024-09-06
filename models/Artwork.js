const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define the Artwork schema
const ArtworkSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'User', // Assuming you have a User model
    required: true,
  },
  description: {
    type: String,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
  },
  category: {
    type: String,
    enum: ['Painting', 'animation', 'drawing', 'sculpture','Photography'], // Adjust based on categories you have
  },
  ratings: [
    {
      type: Number,
      min: 1,
      max: 5,
    },
  ],
  averageRating: {
    type: Number,
    default: 0,
  },
});

// Pre-save hook to calculate average rating
ArtworkSchema.pre('save', function (next) {
  if (this.ratings.length > 0) {
    this.averageRating =
      this.ratings.reduce((a, b) => a + b, 0) / this.ratings.length;
  } else {
    this.averageRating = 0;
  }
  next();
});

// Define and export the Artwork model
module.exports = mongoose.model('Artwork', ArtworkSchema);
