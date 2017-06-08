'use strict';
const app = require('./app');
const db = require('../db');
const PORT = process.env.PORT || 1337;

app.listen(PORT, () => {
  console.log('Example app listening on port 1337!');
});
