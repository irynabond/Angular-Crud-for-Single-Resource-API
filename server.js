var mongoose = require('mongoose');
var express = require('express');
var app = express();
var countryRouter = require(__dirname + '/routes/country_routes');

mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/country_stream_dev');

app.use(express.static(__dirname + '/build'));

app.use('/api', countryRouter);

app.listen(process.env.PORT || 3000, function() {
  console.log('server up on port 3000');
});
