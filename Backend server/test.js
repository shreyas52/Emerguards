const mongoose = require('mongoose')

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/my_app', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Define schema for locations
const locationSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number,
  title: String
});

// Create model from the schema
const Location = mongoose.model('Location', locationSchema);

// Dummy data
const locations = [
  { latitude: 37.4220936, longitude: -122.083922, title: 'New York' },
  { latitude: 37.410936, longitude: -122.13922, title: 'Los Angeles' },
  { latitude: 37.4020936, longitude: -122.083922, title: 'New York' },
  { latitude: 37.410926, longitude: -122.13822, title: 'Los Angeles' },  { latitude: 37.4220936, longitude: -122.083922, title: 'New York' },
  { latitude: 37.410836, longitude: -122.13022, title: 'Los Angeles' },
  // Add more locations as needed
];

// Insert dummy data into the database
Location.insertMany(locations)
  .then(() => console.log('Data inserted'))
  .catch(err => console.log(err));
