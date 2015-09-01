var mongoose = require('mongoose');
var Schema   = mongoose.Schema;

var Superhero = new Schema(
  {
    name: String,
    ability: String,
    nemesis: String
  }
);

mongoose.model('superheros', Superhero);

mongoose.connect('mongodb://localhost/node-superhero');
