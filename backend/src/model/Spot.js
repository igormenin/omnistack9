const mongoose = require('mongoose');
const localIpUrl = require('local-ip-url');
const ipLocal = localIpUrl();

const SpotSchema = new mongoose.Schema({
  thumbnail: String,
  company: String,
  price: Number,
  techs: [String],
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  toJSON: {
    virtuals: true,
  }
})

SpotSchema.virtual('thumbnail_url').get(function() {
  return `http://${ipLocal}:3333/files/${this.thumbnail}`
  // return `http://192.168.0.108:3333/files/${this.thumbnail}`
})

module.exports = mongoose.model('Spot', SpotSchema);
