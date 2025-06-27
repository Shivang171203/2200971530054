const exp = require('express');
const bodyParser = require('body-parser');
const rts = require('./rts/routesAll');
require('dotenv').config();

const app = exp();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', rts);

app.listen(PORT, () => {
  console.log(`URL Shortener running on port ${PORT}`);
}); 