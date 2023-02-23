const mongoose = require('mongoose');
require('dotenv').config();
// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  
});

// Export connection
module.exports = mongoose.connection;