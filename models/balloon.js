var mongoose = require('mongoose');

var BalloonSchema = new mongoose.Schema({
  name: String,
  link: String,
  difficulty: String,
  image: String
});

module.exports = mongoose.model('Balloon', BalloonSchema);
