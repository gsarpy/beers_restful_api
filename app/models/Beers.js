// Connect to MongoDB Using Mongoose
let mongoose   = require('mongoose');
let Schema     = mongoose.Schema;
mongoose.connect('mongodb://localhost/beer_api');

// Setup DB Model

let BeerSchema = new Schema({
  name: String,
  brewery: String,
  type: String
});

module.exports = mongoose.model('Beer', BeerSchema);
