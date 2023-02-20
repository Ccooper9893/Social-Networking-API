const express = require('express');
const db = require('./config/connection');

const PORT = process.env.PORT || 3001;

const app = express();

app.use(express.urlencoded({extended: true})); //Parses data from URL
app.use(express.json()); //Parses data from request body payload

db.once('open', () => {
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});