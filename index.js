const express = require('express');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = 3001;

const app = express();

app.use(express.urlencoded({extended: true})); //Parses data from URL
app.use(express.json()); //Parses data from request body payload
app.use(routes);

db.once('open', () => {
app.listen(PORT, () => {
    console.log(`API server running on port ${PORT}!`);
  });
});