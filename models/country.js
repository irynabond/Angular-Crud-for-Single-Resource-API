var mongoose = require('mongoose');

var countrySchema = new mongoose.Schema({
  name: String,
  description: {type: String},
  duration: {type: String}
});

module.exports = mongoose.model('Country', countrySchema);
