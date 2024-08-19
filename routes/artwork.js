// routes/artwork.js
const express = require('express');
const router = express.Router();
const Artwork = require('../models/Artwork');
const { auth, checkRole } = require('../middleware/auth');

// Create Artwork with Image URL (Artist Only)
// Add new artwork
router.post('/add', auth,checkRole, async (req, res) => {
  try {
    const { title, description, price, image,category } = req.body;
    const artistId = req.user.userId; // Assuming the user ID is stored in req.user

    // Validate artist role if necessary
    if (req.user.role !== 'artist') {
      return res.status(403).json({ message: 'Access denied' });
    }

    const newArtwork = new Artwork({
      title,
      description,
      price,
      image,
      category,
      artist: artistId // Set the artist field to the authenticated user's ID
    });

    await newArtwork.save();
    res.status(201).json({ message: 'Artwork added successfully', artwork: newArtwork });
  } catch (error) {
    console.error('Error adding artwork:', error.message);
    res.status(500).json({ message: 'Failed to add artwork', error: error.message });
  }
});



// // Read All Artwork
// router.get('/', async (req, res) => {
//     try {
//       const artworks = await Artwork.find();
//       res.json(artworks);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });

// // search
// router.get('/', async (req, res) => {
//     try {
//       const { search, category } = req.query;
//       let query = {};
  
//       if (search) {
//         query.title = { $regex: search, $options: 'i' }; // case-insensitive search
//       }
  
//       if (category) {
//         query.category = category;
//       }
  
//       const artworks = await Artwork.find(query);
//       res.json(artworks);
//     } catch (error) {
//       res.status(500).json({ error: 'Internal server error' });
//     }
//   });

// // Update Artwork (Artist Only)
// router.put('/:id', auth, checkRole('artist'), async (req, res) => {
//     try {
//         const artwork = await Artwork.findOne({ _id: req.params.id, artist: req.user.userId });
//         if (!artwork) {
//             return res.status(404).json({ message: 'Artwork not found' });
//         }
//         Object.assign(artwork, req.body);
//         await artwork.save();
//         res.json(artwork);
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

// // Delete Artwork (Artist Only)
// router.delete('/:id', auth, checkRole('artist'), async (req, res) => {
//     try {
//         const artwork = await Artwork.findOneAndDelete({ _id: req.params.id, artist: req.user.userId });
//         if (!artwork) {
//             return res.status(404).json({ message: 'Artwork not found' });
//         }
//         res.json({ message: 'Artwork deleted' });
//     } catch (error) {
//         res.status(500).json({ message: 'Server Error' });
//     }
// });

router.get('/', async (req, res) => {
  try {
    const artworks = await Artwork.find().populate('artist', ['username']);
    res.json(artworks);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

router.patch('/api/artwork/:id/rating', auth, async (req, res) => {
  const { id } = req.params;
  const { rating } = req.body;

  try {
    const updatedArtwork = await Artwork.findByIdAndUpdate(
      id,
      { $set: { rating: rating } }, // Only update the rating field
      { new: true, runValidators: true }
    );

    if (!updatedArtwork) {
      return res.status(404).json({ message: 'Artwork not found' });
    }

    res.json(updatedArtwork);
  } catch (error) {
    console.error('Error updating rating:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

// // Create new artwork (artists only)
// router.post('/add', auth,checkRole, async (req, res) => {
//   try {
//     const newArtwork = new Artwork({ ...req.body, userId: req.user.id });
//     await newArtwork.save();
//     res.status(201).json(newArtwork);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Update artwork (artists only)
router.put('/:id',auth, checkRole, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });

    if (artwork.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    Object.assign(artwork, req.body);
    await artwork.save();
    res.json(artwork);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete artwork (artists only)
router.delete('/:id', auth,checkRole, async (req, res) => {
  try {
    const artwork = await Artwork.findById(req.params.id);
    if (!artwork) return res.status(404).json({ message: 'Artwork not found' });

    if (artwork.userId.toString() !== req.user.id) return res.status(403).json({ message: 'Access denied' });

    await artwork.remove();
    res.json({ message: 'Artwork deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


module.exports = router;
