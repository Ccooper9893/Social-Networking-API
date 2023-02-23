const mongoose = require('mongoose');
require('dotenv').config();
// Wrap Mongoose around local connection to MongoDB
mongoose.connect(process.env.DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//Once Mongoose@7 is released, this is false by default. True meaning only fields in schema can be saved to database
mongoose.set("strictQuery", true);

// Export connection
module.exports = mongoose.connection;